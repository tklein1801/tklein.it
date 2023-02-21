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
  return commits > 0
    ? `rgb(2, 212, 99, ${((commits * 100) / highestContribution / 100).toFixed(2)})`
    : 'rgba(255, 255, 255, 0.4)';
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
  const highestContribution = React.useMemo(() => {
    return contributions.contributionCalendar.weeks
      .map((week) => week.contributionDays.map((day) => day.contributionCount))
      .flat(1)
      .reduce((a, b) => Math.max(a, b));
  }, [contributions]);
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {contributions.contributionCalendar.weeks.map((week, idx) => (
          <Week key={'week-' + idx} week={week} highestContribution={highestContribution} />
        ))}
      </div>
    </div>
  );
};
