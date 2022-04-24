import style from './stock.module.css';

export const StockContainer = ({ crypto }) => {
  return (
    <div className={style.stockContainer}>
      <div className={style.tickerContainer}>
        {crypto.data.map((item, index) => {
          return (
            <Stock key={index} symbol={item.symbol} change={item.quote['EUR'].percent_change_24h} />
          );
        })}
        {crypto.data.map((item, index) => {
          return (
            <Stock key={index} symbol={item.symbol} change={item.quote['EUR'].percent_change_24h} />
          );
        })}
      </div>
    </div>
  );
};

const Stock = ({ symbol, change }) => {
  return (
    <div className={style.stock}>
      <div className={style.stockInner}>
        <p>{symbol}</p>
        <p className={`${style.change} ${change > 0 ? style.positive : style.negative}`}>
          <span className={style.iconContainer}>
            {change > 0 ? (
              <i className="fas fa-caret-up"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}
          </span>
          {Math.abs(change).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
