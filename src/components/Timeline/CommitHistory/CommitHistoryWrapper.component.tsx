import React from 'react';
import {CommitHistoryService} from './CommitHistory.service';
import {Grid, type GridProps, Box} from '@mui/material';
import {CommitBox} from './CommitBox.component';

export type TCommitHistoryWrapper = {
  gridProps?: GridProps;
};

export const CommitHistoryWrapper: React.FC<TCommitHistoryWrapper> = async ({gridProps}) => {
  const {
    contributionCalendar: {totalContributions, weeks},
  } = await CommitHistoryService.getCommits();

  return (
    <Grid container columns={weeks.length} spacing={0.2} direction={'row'} {...gridProps} sx={{...gridProps?.sx}}>
      {/* {weeks.flatMap(() => (
        <Grid item xs={1}>
          <Box sx={{aspectRatio: '1/1', height: 'auto', width: '100%', border: '1px solid black'}}>{}</Box>
        </Grid>
      ))} */}

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
};
