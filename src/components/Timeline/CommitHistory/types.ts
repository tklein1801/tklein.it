export type TContributionDay = {
  contributionCount: number;
  weekday: number;
  date: string;
};

export type TContributionWeek = {
  contributionDays: TContributionDay[];
};

export type TContributionCalendar = {
  contributionCalendar: {
    totalContributions: number;
    weeks: TContributionWeek[];
  };
};

export type TWeekProps = {
  week: TContributionWeek;
  highestContribution: number;
};
