import {Box, Stack, Typography} from '@mui/material';
import Link from 'next/link';
import {type TStock} from './types';
import {ArrowDropDownRounded, ArrowDropUpRounded} from '@mui/icons-material';

export const StockItem: React.FC<TStock> = ({symbol, slug, quote}) => {
  const currency = 'EUR';
  const change24h = quote[currency].percent_change_24h;
  const isPositive = change24h > 0;
  return (
    <Box sx={{display: 'inline-block', mr: 4}}>
      <Stack
        component={Link}
        href={`https://www.coinbase.com/de/price/${slug}`}
        data-umami-event="click-crypto-link"
        data-umami-event-crypto={symbol}
        target="_blank"
        sx={{
          flexDirection: 'row',
          color: 'unset',
          textDecoration: 'none',
          transition: 'color 0.3s',
          ':hover': {color: isPositive ? 'success.main' : 'error.main'},
        }}>
        <Typography>{symbol}</Typography>{' '}
        {isPositive ? <ArrowDropUpRounded color="success" /> : <ArrowDropDownRounded color="error" />}{' '}
        <Typography sx={{color: isPositive ? 'success.main' : 'error.main'}}>{change24h.toFixed(3)}%</Typography>
      </Stack>
    </Box>
  );
};
