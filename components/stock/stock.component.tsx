import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './stock.module.css';

export interface StockApiResponse {
  status: {
    timestamp: string | Date;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
    total_count: number;
  };
  data: Stock[];
}

export interface Stock {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string | Date;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform: [Object];
  cmc_rank: number;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  tvl_ratio: number;
  last_updated: string | Date;
  quote: Record<string, Quote>;
}

export interface Quote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string | Date;
}

export function fetchStockData(): Promise<StockApiResponse> {
  return fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=EUR',
    {
      cache: 'no-store',
      headers: {
        'X-CMC_PRO_API_KEY': '77fed786-e2d3-4706-86b8-8b99886aa0e7',
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function Stock({ symbol, change }: { symbol: string; change: number }) {
  return (
    <div className={styles.stock}>
      <div className={styles.stockInner}>
        <p>{symbol}</p>
        <p className={`${styles.change} ${change > 0 ? styles.positive : styles.negative}`}>
          <span className={styles.iconContainer}>
            {change > 0 ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </span>
          {Math.abs(change).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export type StockWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { stocks: StockApiResponse };

export default function StockWrapper(props: StockWrapperProps) {
  const { stocks } = props;
  return (
    <section {...props}>
      <div className={styles.stockContainer}>
        <div className={styles.items}>
          {stocks.data.map((item) => (
            <Stock
              key={item.symbol}
              symbol={item.symbol}
              change={item.quote['EUR'].percent_change_24h}
            />
          ))}
          {stocks.data.map((item) => (
            <Stock
              key={item.symbol}
              symbol={item.symbol}
              change={item.quote['EUR'].percent_change_24h}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
