import React from 'react';
import type { ContributionWeek } from './CommitHistory.type';
import { Day } from './Day.component';
import style from './CommitHistory.module.css';

export interface WeekProps {
  week: ContributionWeek;
  highestContribution: number;
}

export const Week: React.FC<WeekProps> = ({ week, highestContribution }) => {
  const { contributionDays } = week;
  return (
    <div className={style.week}>
      {contributionDays.map((day) => (
        <Day key={day.date} day={day} highestContribution={highestContribution} />
      ))}
    </div>
  );
};

export const WeekLabels: React.FC<{ labels: string[] }> = ({ labels }) => {
  return (
    <div className={style.weekLabels}>
      {labels.map((label) => (
        <div key={label} className={style.weekLabel}>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
};
