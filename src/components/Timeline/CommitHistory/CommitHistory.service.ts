import type {TContributionCalendar} from './types';

export class CommitHistoryService {
  static async getCommits(): Promise<TContributionCalendar> {
    const apiKey = process.env.GH_PAT;
    if (!apiKey) throw new Error("Environment-variable 'GH_PAT' not set");

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
      .then(response => response.json())
      .then(json => json.data.viewer.contributionsCollection)
      .catch(error => console.error(error));
  }
}
