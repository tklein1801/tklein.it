import React from 'react';
import { type StockApiResponse } from './Stock.type';
import style from './StockWrapper.module.css';
import { Stock } from './Stock.component';

export type StockWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  stocks: StockApiResponse['data'];
};

export const StockWrapper: React.FC<StockWrapperProps> = ({ stocks, ...props }) => {
  if (stocks.length === 0) return null;
  return (
    <section {...props}>
      <div className={style.stockContainer}>
        <div>
          {stocks.map((stock) => (
            <Stock
              key={stock.symbol}
              slug={stock.slug}
              symbol={stock.symbol}
              change={stock.quote['EUR'].percent_change_24h}
            />
          ))}
          {stocks.map((stock) => (
            <Stock
              key={stock.symbol}
              slug={stock.slug}
              symbol={stock.symbol}
              change={stock.quote['EUR'].percent_change_24h}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
