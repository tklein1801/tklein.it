'use client';
import React from 'react';
import type { ContributionCalendar, ContributionWeek } from './CommitHistory.type';
import { getWindowDimensions } from '@/utils';
import { Week, WeekLabels } from './Week.component';
import style from './CommitHistory.module.css';

export type CommitTimelineProps = {
  contributions: ContributionCalendar;
};

export const CommitHistory: React.FC<CommitTimelineProps> = ({ contributions }) => {
  const [mobileView, setMobileView] = React.useState(false);

  const highestContribution = React.useMemo(() => {
    return contributions.contributionCalendar.weeks
      .map((week) => week.contributionDays.map((day) => day.contributionCount))
      .flat(1)
      .reduce((a, b) => Math.max(a, b));
  }, [contributions]);

  const displayedWeeks: ContributionWeek[] = React.useMemo(() => {
    const { weeks } = contributions.contributionCalendar;
    return mobileView ? weeks.slice(weeks.length / 2, weeks.length) : weeks;
  }, [mobileView, contributions.contributionCalendar]);

  const handleWindowResize = () => {
    setMobileView(getWindowDimensions(window).breakpoint === 'xs');
  };

  React.useEffect(() => {
    handleWindowResize();

    window.addEventListener('resize', () => {
      handleWindowResize();
    });

    return () => {
      window.removeEventListener('resize', () => {
        handleWindowResize();
      });
    };
  }, []);

  return (
    <div className={style.container}>
      <div
        className={style.grid}
        style={{
          gridTemplateColumns: `${mobileView ? '' : '2fr'} repeat(${displayedWeeks.length}, 1fr)`,
        }}
      >
        <WeekLabels labels={['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']} />
        {displayedWeeks.map((week, idx) => (
          <Week key={'week-' + idx} week={week} highestContribution={highestContribution} />
        ))}
      </div>
    </div>
  );
};
