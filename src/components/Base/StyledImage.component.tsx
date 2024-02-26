'use client';

import {styled} from '@mui/material';
import Image from 'next/image';

export const StyledImage = styled(Image)(({theme}) => ({
  borderRadius: theme.shape.borderRadius + 'px',
}));
