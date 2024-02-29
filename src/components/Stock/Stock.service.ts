import type {TStock, TStockApiResponse} from './types';

export class StocksService {
  static async fetchCrypo(): Promise<TStock[]> {
    try {
      const apiKey = process.env.COINMARKETCAP;
      if (!apiKey) throw new Error("API key for 'COINMARKETCAP' is not set");
      const response = await fetch(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=EUR',
        {
          cache: 'no-store',
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
          },
        },
      );
      const json = (await response.json()) as TStockApiResponse;
      if (response.status < 200 && response.status >= 300) {
        throw new Error(JSON.stringify(json));
      }

      return json.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
