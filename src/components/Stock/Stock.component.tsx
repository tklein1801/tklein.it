import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import style from './Stock.module.css';

export type StockProps = { symbol: string; slug: string; change: number };

export const Stock: React.FC<StockProps> = ({ symbol, slug, change }) => {
  return (
    <div className={style.stock}>
      <div>
        <a href={'https://www.coinbase.com/de/price/' + slug} target="_blank" rel="noreferrer">
          {symbol}
        </a>
        <p className={`${style.change} ${change > 0 ? style.positive : style.negative}`}>
          <span className={style.iconContainer}>
            {change > 0 ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
          </span>
          {Math.abs(change).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
