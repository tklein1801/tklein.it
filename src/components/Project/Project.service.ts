import type {TProject} from './types';

export class ProjectService {
  static async getProjects(): Promise<TProject[]> {
    try {
      const apiKey = process.env.GH_PAT;
      if (!apiKey) throw new Error("Environment-variable 'GH_PAT' not set");
      const query =
        '{"query":"{\\n  viewer {\\n    login\\n    createdAt\\n    issues {\\n      totalCount\\n    }\\n    company\\n    bio\\n    followers {\\n      totalCount\\n    }\\n    repositories {\\n      totalCount\\n    }\\n    pinnedItems(first: 6, types: REPOSITORY) {\\n      edges {\\n        node {\\n          ... on Repository {\\n            id\\n owner {\\n login\\n }\\n            name\\n            description\\n            url\\n            primaryLanguage {\\n              name\\n              color\\n            }\\n            stargazerCount\\n            usesCustomOpenGraphImage\\n            openGraphImageUrl\\n            forkCount\\n          }\\n        }\\n      }\\n    }\\n  }\\n}","variables":{}}';
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
          Authorization: 'token ' + apiKey,
        },
        body: query,
        next: {revalidate: 3600},
      });
      const json = await response.json();
      // @ts-ignore
      return json.data.viewer.pinnedItems.edges.map(node => ({...node.node}));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
