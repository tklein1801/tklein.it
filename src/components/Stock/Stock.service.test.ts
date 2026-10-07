/** @jest-environment node */

import {StocksService} from './Stock.service';
import type {TStock, TStockApiResponse} from './types';

const CACHE_KEY = '__tkleinStockCache';
const stock = {id: 1, name: 'Bitcoin', symbol: 'BTC'} as TStock;

function apiResponse(data: TStock[] = [stock], errorCode = 0, errorMessage: string | null = null) {
  return {
    status: {error_code: errorCode, error_message: errorMessage},
    data,
  } as TStockApiResponse;
}

function response(body: unknown, status = 200, headers = new Headers()): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

describe('StocksService', () => {
  const originalApiKey = process.env.COINMARKETCAP;
  let fetchMock: jest.SpiedFunction<typeof fetch>;
  let consoleErrorMock: jest.SpiedFunction<typeof console.error>;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-07T14:00:00.000Z'));
    process.env.COINMARKETCAP = 'test-api-key';
    delete (globalThis as typeof globalThis & {[CACHE_KEY]?: unknown})[CACHE_KEY];
    fetchMock = jest.spyOn(global, 'fetch');
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    fetchMock.mockRestore();
    consoleErrorMock.mockRestore();
    jest.useRealTimers();
    if (originalApiKey === undefined) delete process.env.COINMARKETCAP;
    else process.env.COINMARKETCAP = originalApiKey;
  });

  it('does not retry or log repeatedly when the API key is missing', async () => {
    delete process.env.COINMARKETCAP;

    const results = await Promise.all(Array.from({length: 20}, () => StocksService.fetchCrypo()));
    expect(results).toEqual(Array.from({length: 20}, () => []));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(24 * 60 * 60 * 1000);
    await StocksService.fetchCrypo();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
  });

  it('shares one request across parallel calls and reuses the result for five minutes', async () => {
    fetchMock.mockResolvedValue(response(apiResponse()));

    const results = await Promise.all(Array.from({length: 20}, () => StocksService.fetchCrypo()));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(results).toEqual(Array.from({length: 20}, () => [stock]));
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({cache: 'no-store'}));

    await jest.advanceTimersByTimeAsync(5 * 60 * 1000 - 1);
    await StocksService.fetchCrypo();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(1);
    fetchMock.mockResolvedValue(response(apiResponse([{...stock, name: 'Updated Bitcoin'} as TStock])));
    await StocksService.fetchCrypo();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('honors Retry-After and serves the last successful data during the cooldown', async () => {
    fetchMock.mockResolvedValueOnce(response(apiResponse()));
    await StocksService.fetchCrypo();

    await jest.advanceTimersByTimeAsync(5 * 60 * 1000);
    const headers = new Headers({'Retry-After': '120'});
    fetchMock.mockResolvedValueOnce(response(apiResponse([], 1008, 'Rate limit reached'), 429, headers));
    await expect(StocksService.fetchCrypo()).resolves.toEqual([stock]);
    await expect(StocksService.fetchCrypo()).resolves.toEqual([stock]);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    await jest.advanceTimersByTimeAsync(120 * 1000 - 1);
    await StocksService.fetchCrypo();
    expect(fetchMock).toHaveBeenCalledTimes(2);

    await jest.advanceTimersByTimeAsync(1);
    fetchMock.mockResolvedValueOnce(response(apiResponse()));
    await StocksService.fetchCrypo();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('aborts a request after ten seconds and does not retry during the error cooldown', async () => {
    fetchMock.mockImplementation((_input, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
      }),
    );

    const pending = StocksService.fetchCrypo();
    await jest.advanceTimersByTimeAsync(10 * 1000);
    await expect(pending).resolves.toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await StocksService.fetchCrypo();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('keeps successful data for at most one hour and ignores invalid responses', async () => {
    fetchMock.mockResolvedValueOnce(response(apiResponse()));
    await StocksService.fetchCrypo();

    await jest.advanceTimersByTimeAsync(5 * 60 * 1000);
    fetchMock.mockResolvedValueOnce(response(apiResponse([], 1008, 'Rate limit reached'), 429));
    await expect(StocksService.fetchCrypo()).resolves.toEqual([stock]);

    await jest.advanceTimersByTimeAsync(55 * 60 * 1000 + 1);
    fetchMock.mockResolvedValueOnce(response(apiResponse([], 1008, 'Rate limit reached'), 429));
    await expect(StocksService.fetchCrypo()).resolves.toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
