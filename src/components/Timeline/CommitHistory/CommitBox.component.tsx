'use client';

import React from 'react';
import {Box, Tooltip, alpha} from '@mui/material';
import {format} from 'date-fns';

export type TCommitBoxProps = {
  day: Date;
  commits: number;
  highestContribution: number;
};

export const CommitBox: React.FC<TCommitBoxProps> = ({day, commits, highestContribution}) => {
  return (
    <Tooltip placement="top" title={`${format(day, 'dd.MM.yyyy')}: ${commits} commits`}>
      <Box
        sx={{
          width: 'auto',
          height: 'auto',
          aspectRatio: '1/1',
          border: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: theme => alpha(theme.palette.primary.main, (commits * 100) / highestContribution).toString(),
          borderRadius: theme => theme.shape.borderRadius / 2 + 'px',
        }}
      />
    </Tooltip>
  );
};
