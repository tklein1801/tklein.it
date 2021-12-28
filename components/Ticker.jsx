import { useEffect } from 'react';

export const Item = ({ symbol, currency, price, change_percent }) => {
  const calcChange = (price, change_in_percent) => {
    const diff = (price * (Math.abs(change_in_percent) / 100)).toFixed(2);
    return change_in_percent > 0 ? diff : -Math.abs(diff);
  };

  return (
    <div className="stock">
      <p className="name-currency">
        {symbol}/{currency}
      </p>
      <div>
        <p className="current-price">{price.toFixed(2)}</p>
      </div>
      <p className="change negative">
        {calcChange(price, change_percent)} ({change_percent.toFixed(2)}%)
      </p>
    </div>
  );
};

const StockContainer = ({ crypto }) => {
  const CURRENCY = 'EUR';

  useEffect(() => {
    const tickerContainer = document.querySelector('.ticker-container');
    const stockElements = tickerContainer.querySelectorAll('.stock');
    if (tickerContainer && stockElements.length > 0) {
      stockElements.forEach((element) => {
        //
        element.animate(
          [
            { transform: `translateX(0px)` },
            {
              transform: `translateX(-${tickerContainer.scrollWidth}px)`,
            },
          ],
          { duration: 60 * 1000, iterations: Infinity }
        );
      });
    }
  }, []);

  return (
    <div className="ticker-container">
      {crypto.data.map((item) => (
        <Item
          symbol={item.symbol}
          currency={CURRENCY}
          price={item.quote[CURRENCY].price}
          change_percent={item.quote[CURRENCY].percent_change_24h}
        />
      ))}
    </div>
  );
};

export default StockContainer;
