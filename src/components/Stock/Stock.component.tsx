'use client';

import React from 'react';
import {Box, Link, Typography} from '@mui/material';

export type TStockProps = {
  symbol: string;
  change: number;
  price: number;
  currency?: string;
};

export const Stock: React.FC<TStockProps> = ({symbol, change, price, currency = 'EUR'}) => {
  const color = change > 0 ? 'primary.main' : 'error.main';
  return (
    <Box
      component={Link}
      href={'https://www.coinbase.com/de/price/' + symbol}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textDecoration: 'none',
        boxSizing: 'border-box',
        minWidth: '10rem',
        maxWidth: '10rem',
        px: 2,
        py: 1,
        transition: 'borderColor .2s',
        border: `2px solid transparent`,
        borderRadius: theme => theme.shape.borderRadius + 'px',
        ':hover': {
          cursor: 'default',
          borderColor: color,
        },
      }}>
      <Typography color={color} sx={{mr: 2}}>
        {symbol}
      </Typography>
      <Typography color={color}>{price.toLocaleString('de-DE', {currency: currency, style: 'currency'})}</Typography>
    </Box>
  );
};
