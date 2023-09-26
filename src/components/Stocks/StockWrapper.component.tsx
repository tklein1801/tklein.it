import React from 'react';
import style from './StockWrapper.module.css';
import { Stock } from './Stock.component';
import { StocksService } from './Stocks.service';

export type StockWrapperProps = React.HTMLAttributes<HTMLDivElement>;

export const StockWrapper: React.FC<StockWrapperProps> = async ({ ...props }) => {
  const stocks = await StocksService.fetchCrypo();
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
