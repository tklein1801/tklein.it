import React from 'react';
import {Paper, type PaperProps} from '@mui/material';

export type TStyledPaperProps = React.PropsWithChildren<PaperProps>;

export const StyledPaper: React.FC<TStyledPaperProps> = props => (
  <Paper
    elevation={2}
    {...props}
    sx={{
      boxShadow: 'none',
      border: 'none',
      ...props.sx,
    }}>
    {props.children}
  </Paper>
);
