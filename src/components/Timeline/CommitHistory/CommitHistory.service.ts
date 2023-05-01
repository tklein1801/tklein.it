import type { ContributionCalendar } from './CommitHistory.type';

export class CommitHistoryService {
  static async getCommits(): Promise<ContributionCalendar> {
    const apiKey = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    if (!apiKey) throw new Error("Environment-variable 'GITHUB_PERSONAL_ACCESS_TOKEN' not set");

    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
        Authorization: 'token ' + apiKey,
      },
      body: '{"query":"{\\n  viewer {\\n    login\\n    contributionsCollection {\\n      contributionCalendar {\\n        totalContributions\\n        weeks {\\n          contributionDays {\\n            contributionCount\\n            weekday\\n            date\\n          }\\n        }\\n      }\\n    }\\n  }\\n}","variables":{}}',
    })
      .then((response) => response.json())
      .then((json) => json.data.viewer.contributionsCollection)
      .catch((error) => console.error(error));
  }

  static determineBackgroundColor(
    commits: number,
    highestContribution: number
  ): React.CSSProperties['backgroundColor'] {
    return `rgb(2, 212, 99, ${((commits * 100) / highestContribution / 100).toFixed(2)})`;
  }
}
