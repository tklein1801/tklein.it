import React from 'react';
import {TickerWrapper} from './TickerWrapper.component';
import {TickerContent} from './TickerContent.component';
import {StockItem} from './StockItem.component';
import {StocksService} from './Stock.service';
import {Divider, Skeleton} from '@mui/material';
import {withSuspense} from '@/hooks';

export const StockWrapper: React.FC = async () => {
  const data = await StocksService.fetchCrypo();

  if (!data.length) return null;
  return (
    <React.Fragment>
      <TickerWrapper>
        <TickerContent animationTime={data.length * 2}>
          {[...data, ...data].map((stock, index) => (
            <StockItem {...stock} key={index} />
          ))}
        </TickerContent>
      </TickerWrapper>
      <Divider />
    </React.Fragment>
  );
};

const Loader = () => {
  return (
    <React.Fragment>
      <TickerWrapper>
        <Skeleton variant="rounded" width="100%" height="2.3rem" />
      </TickerWrapper>
      <Divider />
    </React.Fragment>
  );
};

export const SuspendedStockWrapper = withSuspense(StockWrapper, Loader);
