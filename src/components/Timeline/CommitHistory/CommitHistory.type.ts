export type ContributionDay = {
  contributionCount: number;
  weekday: number;
  date: string;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionCalendar = {
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
};

export type WeekProps = {
  week: ContributionWeek;
  highestContribution: number;
};
