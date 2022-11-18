import * as React from 'react';
import styles from './achievement.module.css';

export type AchievementContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  React.PropsWithChildren;

export type AchievementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
  subtitle: string;
};

export interface AchievementApiResponse {
  projects: number;
  issues: number;
  followers: number;
  experience: number;
}

export function getAchievements() {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      Authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    },
    // TODO: Use new query which only selects requiested data
    body: '{"query":"{\\n  viewer {\\n    login\\n    createdAt\\n    issues {\\n      totalCount\\n    }\\n    company\\n    bio\\n    followers {\\n      totalCount\\n    }\\n    repositories {\\n      totalCount\\n    }\\n    pinnedItems(first: 6, types: REPOSITORY) {\\n      edges {\\n        node {\\n          ... on Repository {\\n            id\\n owner {\\n login\\n }\\n            name\\n            description\\n            url\\n            primaryLanguage {\\n              name\\n              color\\n            }\\n            stargazerCount\\n            forkCount\\n          }\\n        }\\n      }\\n    }\\n  }\\n}","variables":{}}',
  })
    .then((response) => response.json())
    .then((json) => {
      const data = json.data.viewer;
      return [
        {
          title: data.repositories.totalCount,
          subtitle: 'Total Projects',
        },
        {
          title: data.issues.totalCount,
          subtitle: 'Issues Resolved',
        },
        {
          title: data.followers.totalCount,
          subtitle: 'GitHub Follower',
        },
        {
          // @ts-expect-error
          title: new Date(Date.now() - new Date(data.createdAt)).getUTCFullYear() - 1971,
          subtitle: 'Years Experience',
        },
      ];
    })
    .catch((error) => console.error(error));
}

export const AchievementContainer: React.FC<AchievementContainerProps> = (props) => {
  return (
    <div className={styles.container} {...props}>
      {props.children}
    </div>
  );
};

export const Achievement: React.FC<AchievementProps> = (props) => {
  const { title, subtitle } = props;
  return (
    <div className={styles.achievement} {...props}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};
