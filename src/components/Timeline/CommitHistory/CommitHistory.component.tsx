import React from 'react';
import type { ContributionCalendar, ContributionWeek } from './CommitHistory.type';
import { getWindowDimensions } from '@/utils';
import { Week, WeekLabels } from './Week.component';
import style from './CommitHistory.module.css';
import { CommitHistoryService } from './CommitHistory.service';

// export type CommitTimelineProps = {
//   contributions: ContributionCalendar;
// };

export type CommitTimelineProps = {};

export const CommitHistory: React.FC<CommitTimelineProps> = async () => {
  const contributions = await CommitHistoryService.getCommits();
  // const [mobileView, setMobileView] = React.useState(false);

  // const highestContribution: number = React.useMemo(() => {
  //   return contributions.contributionCalendar.weeks
  //     .map((week) => week.contributionDays.map((day) => day.contributionCount))
  //     .flat(1)
  //     .reduce((a, b) => Math.max(a, b));
  // }, [contributions]);

  const highestContribution = contributions.contributionCalendar.weeks
    .map((week) => week.contributionDays.map((day) => day.contributionCount))
    .flat(1)
    .reduce((a, b) => Math.max(a, b));

  // const displayedWeeks: ContributionWeek[] = React.useMemo(() => {
  //   const { weeks } = contributions.contributionCalendar;
  //   return weeks;
  //   // return mobileView ? weeks.slice(weeks.length / 2, weeks.length) : weeks;
  // }, [contributions.contributionCalendar]);

  const displayedWeeks = () => {
    const { weeks } = contributions.contributionCalendar;
    return weeks;
  };

  // const handleWindowResize = () => {
  //   setMobileView(getWindowDimensions(window).breakpoint === 'xs');
  // };

  // React.useEffect(() => {
  //   handleWindowResize();

  //   window.addEventListener('resize', () => {
  //     handleWindowResize();
  //   });

  //   return () => {
  //     window.removeEventListener('resize', () => {
  //       handleWindowResize();
  //     });
  //   };
  // }, []);

  return (
    <div className={style.container}>
      <div
        className={style.grid}
        style={{
          gridTemplateColumns: `${false ? '' : '2fr'} repeat(${displayedWeeks().length}, 1fr)`,
        }}
      >
        <WeekLabels labels={['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']} />
        {displayedWeeks().map((week, idx) => (
          <Week key={'week-' + idx} week={week} highestContribution={highestContribution} />
        ))}
      </div>
    </div>
  );
};
