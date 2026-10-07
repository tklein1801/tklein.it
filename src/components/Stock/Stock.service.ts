import type {TStock, TStockApiResponse} from './types';

const CACHE_TTL_MS = 5 * 60 * 1000;
const ERROR_COOLDOWN_MS = 60 * 1000;
const REQUEST_TIMEOUT_MS = 10 * 1000;
const MAX_STALE_MS = 60 * 60 * 1000;
const CACHE_KEY = '__tkleinStockCache';

type StockCacheState = {
  data: TStock[] | null;
  fetchedAt: number | null;
  nextAttemptAt: number;
  inFlight: Promise<TStock[]> | null;
};

type GlobalWithStockCache = typeof globalThis & {
  [CACHE_KEY]?: StockCacheState;
};

class StockFetchError extends Error {
  constructor(
    message: string,
    readonly retryAfterMs?: number,
  ) {
    super(message);
    this.name = 'StockFetchError';
  }
}

function getCacheState(): StockCacheState {
  const globalCache = globalThis as GlobalWithStockCache;
  globalCache[CACHE_KEY] ??= {
    data: null,
    fetchedAt: null,
    nextAttemptAt: 0,
    inFlight: null,
  };
  return globalCache[CACHE_KEY];
}

function getRetryAfterMs(value: string | null, now: number): number | undefined {
  if (!value) return undefined;

  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;

  const retryAt = Date.parse(value);
  return Number.isNaN(retryAt) ? undefined : Math.max(0, retryAt - now);
}

export class StocksService {
  static async fetchCrypo(): Promise<TStock[]> {
    const cache = getCacheState();
    const now = Date.now();

    if (cache.inFlight) return cache.inFlight;

    if (cache.nextAttemptAt > now) return this.getAvailableData(cache, now);

    if (cache.fetchedAt !== null && now - cache.fetchedAt < CACHE_TTL_MS) {
      return cache.data ?? [];
    }

    const request = this.refresh(cache);
    cache.inFlight = request;

    try {
      return await request;
    } finally {
      if (cache.inFlight === request) cache.inFlight = null;
    }
  }

  private static async refresh(cache: StockCacheState): Promise<TStock[]> {
    const apiKey = process.env.COINMARKETCAP;
    if (!apiKey) {
      cache.nextAttemptAt = Number.POSITIVE_INFINITY;
      console.error("API key for 'COINMARKETCAP' is not set");
      return this.getAvailableData(cache, Date.now());
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=EUR',
        {
          cache: 'no-store',
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
          },
          signal: controller.signal,
        },
      );
      const retryAfterMs = getRetryAfterMs(response.headers.get('retry-after'), Date.now());

      let json: TStockApiResponse;
      try {
        json = (await response.json()) as TStockApiResponse;
      } catch {
        throw new StockFetchError(`CoinMarketCap returned invalid JSON (HTTP ${response.status})`, retryAfterMs);
      }

      const apiError = json.status?.error_code !== 0;
      if (!response.ok || apiError || !Array.isArray(json.data) || json.data.length === 0) {
        const errorMessage = json.status?.error_message ?? `HTTP ${response.status}`;
        throw new StockFetchError(
          `CoinMarketCap request failed: ${errorMessage}`,
          retryAfterMs,
        );
      }

      cache.data = json.data;
      cache.fetchedAt = Date.now();
      cache.nextAttemptAt = cache.fetchedAt + CACHE_TTL_MS;
      return cache.data;
    } catch (error) {
      const message = controller.signal.aborted
        ? `CoinMarketCap request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds`
        : error instanceof Error
          ? error.message
          : String(error);
      const retryAfterMs = error instanceof StockFetchError ? error.retryAfterMs : undefined;
      cache.nextAttemptAt = Date.now() + Math.max(ERROR_COOLDOWN_MS, retryAfterMs ?? 0);
      console.error(message);
      return this.getAvailableData(cache, Date.now());
    } finally {
      clearTimeout(timeout);
    }
  }

  private static getAvailableData(cache: StockCacheState, now: number): TStock[] {
    if (cache.data === null || cache.fetchedAt === null || now - cache.fetchedAt > MAX_STALE_MS) return [];
    return cache.data;
  }
}
