import {Box, Skeleton} from '@mui/material';
import {withSuspense} from '@/hooks';
import {StocksService} from './Stock.service';
import {Stock} from './Stock.component';
import style from './StockWrapper.module.css';

export const StockWrapper = async () => {
  const cryptos = await StocksService.fetchCrypo();
  return (
    <Box sx={{py: 2, backgroundColor: 'background.paper'}}>
      <Box sx={{overflow: 'hidden'}}>
        <div className={style.stockContainer}>
          {cryptos.map(crypto => (
            <Stock
              key={crypto.symbol + '-1'}
              symbol={crypto.symbol}
              change={crypto.quote['EUR'].percent_change_24h}
              price={crypto.quote['EUR'].price}
              currency="EUR"
            />
          ))}
          {cryptos.map(crypto => (
            <Stock
              key={crypto.symbol + '-2'}
              symbol={crypto.symbol}
              change={crypto.quote['EUR'].percent_change_24h}
              price={crypto.quote['EUR'].price}
              currency="EUR"
            />
          ))}
        </div>
      </Box>
    </Box>
  );
};

const Loader = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', columnGap: '1rem', p: 2, backgroundColor: 'background.paper'}}>
      <Skeleton variant="rounded" width="100%" height="2.3rem" />
    </Box>
  );
};

export const SuspendedStockWrapper = withSuspense(StockWrapper, Loader);
