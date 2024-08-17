'use client';

import {Typography, styled} from '@mui/material';
import {config} from '@/config';

const StyledFooter = styled('footer')(({theme}) => ({
  width: '100%',
  marginTop: 'auto',
}));

export const Author = styled('strong')(({theme}) => ({
  color: theme.palette.primary.main,
}));

export const Footer = () => {
  return (
    <StyledFooter>
      <svg aria-hidden="true" width="100%" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="a" width="30" height="8" patternUnits="userSpaceOnUse">
          <g clipPath="url(#clip0_2426_11367)">
            <path
              d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
              stroke="rgba(255,255,255,.1)"
              strokeLinecap="square"></path>
          </g>
        </pattern>
        <rect width="100%" height="100%" fill="url(#a)"></rect>
      </svg>
      <Typography sx={{textAlign: 'center', py: 2}}>
        Made by <Author>@{config.username}</Author>
      </Typography>
    </StyledFooter>
  );
};