import {Box} from '@mui/material';

export const TickerWrapper: React.FC<React.PropsWithChildren> = ({children}) => (
  <Box
    sx={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      p: 2,
    }}>
    {children}
  </Box>
);
