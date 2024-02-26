import React from 'react';
import {Box} from '@mui/material';
import {TimelineEvent} from './TimelineEvent.component';
import type {TTimelineEvent} from './types';

export type TTimelineProps = {
  events: TTimelineEvent[];
};

export const Timeline: React.FC<TTimelineProps> = ({events}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        margin: '0 auto',
        ':after': {
          content: "''",
          position: 'absolute',
          width: '4px',
          backgroundColor: 'primary.main',
          top: 0,
          bottom: 0,
          left: {xs: '10px', md: '50%'},
          marginLeft: '-2px',
          borderRadius: '8px',
        },
      }}>
      {events.map(event => (
        <TimelineEvent key={event.year} {...event} />
      ))}
    </Box>
  );
};
