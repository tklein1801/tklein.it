import type { TStock, StockApiResponse } from './Stocks.type';

export class StocksService {
  static async fetchCrypo(): Promise<TStock[]> {
    const apiKey = process.env.COINMARKETCAP;
    if (!apiKey) throw new Error("Environment-variable 'COINMARKETCAP' not set");

    try {
      const response = await fetch(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=EUR',
        {
          cache: 'no-store',
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
          },
        }
      );
      const json = (await response.json()) as StockApiResponse;
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
