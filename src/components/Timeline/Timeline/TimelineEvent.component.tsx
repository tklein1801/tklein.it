'use client';

import React from 'react';
import {Box, Typography} from '@mui/material';
import type {TTimelineEvent} from './types';

export type TTimelineEventProps = TTimelineEvent;

export const TimelineEvent: React.FC<TTimelineEventProps> = ({left, year, headline, description}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        boxSizing: 'border-box',
        width: {xs: '100%', md: '50%'},
        py: '.5rem',
        paddingLeft: {xs: '49px', md: left ? '0px' : '41px'},
        paddingRight: {xs: '0px', md: left ? '41px' : '0px'},
        // Place circle on the main line
        ':after': {
          content: "''",
          position: 'absolute',
          width: '16px',
          top: '24px',
          height: '16px',
          // original
          // [left ? 'right' : 'left']: '-8px',
          // response
          right: {xs: 0, md: left ? '-8px' : 'unset'},
          left: {xs: '2px', md: left ? 'unset' : '-8px'},
          backgroundColor: theme => theme.palette.primary.main,
          borderRadius: '50%',
          zIndex: 1,
        },
        left: left ? '0%' : {xs: 0, md: '50%'},
        // Arrow
        '::before': left
          ? {
              content: "''",
              height: '0',
              position: 'absolute',
              top: '22px',
              width: '0',
              zIndex: '1',
              right: '31px',
              left: {xs: '39px', md: 'unset'},
              border: theme => `medium solid ${theme.palette.primary.main}`,
              borderWidth: {xs: '10px 10px 10px 0', md: '10px 0 10px 10px'},
              borderColor: theme => ({
                xs: `transparent ${theme.palette.primary.main} transparent transparent`,
                md: `transparent ${theme.palette.primary.main}`,
              }),
            }
          : {
              content: "''",
              height: '0',
              position: 'absolute',
              top: '22px',
              width: '0',
              zIndex: '1',
              left: {xs: '39px', md: '31px'},
              border: theme => `medium solid ${theme.palette.primary.main}`,
              borderWidth: '10px 10px 10px 0',
              borderColor: theme => ({
                xs: `transparent ${theme.palette.primary.main} transparent transparent`,
                md: `transparent ${theme.palette.primary.main}`,
              }),
            },
      }}>
      <Box
        sx={{
          transition: 'all .2s',
          position: 'relative',
          padding: '.75rem 1rem',
          backgroundColor: 'background.paper',
          border: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: theme => theme.shape.borderRadius + 'px',
          ':hover > .event-headline': {
            color: 'primary.main',
          },
        }}>
        <Typography variant="subtitle2">{year}</Typography>
        <Typography
          className="event-headline"
          variant="subtitle1"
          sx={{
            transition: 'color .2s',
          }}>
          {headline}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
};
