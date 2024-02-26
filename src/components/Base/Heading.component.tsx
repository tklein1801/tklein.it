import React from 'react';
import {Typography, type TypographyProps} from '@mui/material';

export type THeadingProps = {
  size: 'large' | 'medium' | 'small';
} & TypographyProps;

export const Heading: React.FC<THeadingProps> = ({size, children, ...props}) => {
  return (
    <Typography
      id={typeof children === 'string' ? children.replace(/\s/g, '-').toLowerCase() : undefined}
      variant={size === 'large' ? 'h3' : size === 'medium' ? 'h4' : 'h5'}
      fontWeight="bolder"
      color="primary.main"
      sx={{mb: 1}}
      {...props}>
      {children}
    </Typography>
  );
};
