export class AchievementService {
  static async get() {
    const apiKey = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    if (!apiKey) throw new Error("Environment-variable 'GITHUB_PERSONAL_ACCESS_TOKEN' not set");

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
          Authorization: 'token ' + apiKey,
        },
        // TODO: Use new query which only selects requiested data
        body: '{"query":"{\\n  viewer {\\n    login\\n    createdAt\\n    issues {\\n      totalCount\\n    }\\n    company\\n    bio\\n    followers {\\n      totalCount\\n    }\\n    repositories {\\n      totalCount\\n    }\\n    pinnedItems(first: 6, types: REPOSITORY) {\\n      edges {\\n        node {\\n          ... on Repository {\\n            id\\n owner {\\n login\\n }\\n            name\\n            description\\n            url\\n            primaryLanguage {\\n              name\\n              color\\n            }\\n            stargazerCount\\n            forkCount\\n          }\\n        }\\n      }\\n    }\\n  }\\n}","variables":{}}',
      });
      const json = await response.json();
      const data = json.data.viewer;
      return [
        // {
        //   title: data.repositories.totalCount,
        //   subtitle: 'Total Projects',
        // },
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
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
