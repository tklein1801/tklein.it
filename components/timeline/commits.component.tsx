import React from 'react';
import { format } from 'date-fns';
import styles from './commits.module.css';

interface ContributionDay {
  contributionCount: number;
  weekday: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
}

export interface WeekProps {
  week: ContributionWeek;
  highestContribution: number;
}

export interface DayProps {
  day: ContributionDay;
  highestContribution: number;
}

export interface CommitTimelineProps {
  contributions: ContributionCalendar;
}

export function getCommits(): Promise<ContributionCalendar> {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      Authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    },
    body: '{"query":"{\\n  viewer {\\n    login\\n    contributionsCollection {\\n      contributionCalendar {\\n        totalContributions\\n        weeks {\\n          contributionDays {\\n            contributionCount\\n            weekday\\n            date\\n          }\\n        }\\n      }\\n    }\\n  }\\n}","variables":{}}',
  })
    .then((response) => response.json())
    .then((json) => json.data.viewer.contributionsCollection)
    .catch((error) => console.error(error));
}

function determineBackgroundColor(
  commits: number,
  highestContribution: number
): React.CSSProperties['backgroundColor'] {
  return `rgb(2, 212, 99, ${((commits * 100) / highestContribution / 100).toFixed(2)})`;
}

export const Week: React.FC<WeekProps> = ({ week, highestContribution }) => {
  const { contributionDays } = week;
  return (
    <div className={styles.week}>
      {contributionDays.map((day) => (
        <Day key={day.date} day={day} highestContribution={highestContribution} />
      ))}
    </div>
  );
};

export const Day: React.FC<DayProps> = ({ day, highestContribution }) => {
  return (
    <div
      className={styles.day}
      data-text={`${format(new Date(day.date), 'dd.MM')}: ${day.contributionCount} commits`}
      style={{
        backgroundColor: determineBackgroundColor(day.contributionCount, highestContribution),
      }}
    ></div>
  );
};

export const CommitsTimeline: React.FC<CommitTimelineProps> = ({ contributions }) => {
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
  }, [mobileView]);

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
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${displayedWeeks.length}, 1fr)`,
        }}
      >
        {displayedWeeks.map((week, idx) => (
          <Week key={'week-' + idx} week={week} highestContribution={highestContribution} />
        ))}
      </div>
    </div>
  );
};

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type DeviceSize = 'small' | 'medium' | 'wide';

export function getBreakpoint(width: number): Breakpoint {
  if (width >= 1536) {
    return 'xl';
  } else if (width >= 1200) {
    return 'lg';
  } else if (width >= 900) {
    return 'md';
  } else if (width >= 600) {
    return 'sm';
  } else {
    return 'xs';
  }
}

export function getWindowDimensions(window: Window) {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
    breakpoint: getBreakpoint(width),
  };
}
