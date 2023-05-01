import React from 'react';
import type { StockApiResponse } from './Stock.type';
import style from './StockWrapper.module.css';
import { Stock } from './Stock.component';

export type StockWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  stocks: StockApiResponse;
};

export const StockWrapper: React.FC<StockWrapperProps> = (props) => {
  const {
    stocks: { data },
  } = props;
  return (
    <section {...props}>
      <div className={style.stockContainer}>
        <div>
          {data.map((item) => (
            <Stock key={item.symbol} symbol={item.symbol} change={item.quote['EUR'].percent_change_24h} />
          ))}
          {data.map((item) => (
            <Stock key={item.symbol} symbol={item.symbol} change={item.quote['EUR'].percent_change_24h} />
          ))}
        </div>
      </div>
    </section>
  );
};
