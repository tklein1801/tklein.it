import type { StockApiResponse } from './Stock.type';

export class StockService {
  static async fetchCrypo(): Promise<StockApiResponse> {
    const apiKey = process.env.COINMARKETCAP;
    if (!apiKey) throw new Error("Environment-variable 'COINMARKETCAP' not set");

    return fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=EUR', {
      cache: 'no-store',
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
}
