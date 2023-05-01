import React from 'react';
import { CommitHistoryService } from './CommitHistory.service';
import style from './CommitHistory.module.css';
import { format } from 'date-fns';
import type { ContributionDay } from './CommitHistory.type';

export type DayProps = {
  day: ContributionDay;
  highestContribution: number;
};

export const Day: React.FC<DayProps> = ({ day, highestContribution }) => {
  return (
    <div
      className={style.day}
      data-text={`${format(new Date(day.date), 'dd.MM')}: ${day.contributionCount} commits`}
      style={{
        backgroundColor: CommitHistoryService.determineBackgroundColor(day.contributionCount, highestContribution),
      }}
    ></div>
  );
};
