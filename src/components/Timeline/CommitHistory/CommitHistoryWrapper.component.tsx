import React from 'react';
import {CommitHistoryService} from './CommitHistory.service';
import {Grid, type GridProps, Box} from '@mui/material';
import {CommitBox} from './CommitBox.component';

export type TCommitHistoryWrapper = {
  gridProps?: GridProps;
};

export const CommitHistoryWrapper: React.FC<TCommitHistoryWrapper> = async ({gridProps}) => {
  try {
    const data = await CommitHistoryService.getCommits();
    if (!data) return null;
    const {
      contributionCalendar: {totalContributions, weeks},
    } = data;

    return (
      <Grid container columns={weeks.length} spacing={0.2} direction={'row'} {...gridProps} sx={{...gridProps?.sx}}>
        {weeks.map((week, index) => {
          return week.contributionDays.map((day, index) => {
            return (
              <Grid item xs={1} key={index}>
                <CommitBox
                  key={day.date}
                  day={new Date(day.date)}
                  commits={day.contributionCount}
                  highestContribution={totalContributions}
                />
              </Grid>
            );
          });
        })}
      </Grid>
    );
  } catch {
    return null;
  }
};
