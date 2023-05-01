import type { Project } from './Project.type';

export class ProjectService {
  static getProjects(): Promise<Project[]> {
    const apiKey = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    if (!apiKey) throw new Error("Environment-variable 'GITHUB_PERSONAL_ACCESS_TOKEN' not set");

    return (
      fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
          Authorization: 'token ' + apiKey,
        },
        // TODO: Use new query which only selects requiested data
        body: '{"query":"{\\n  viewer {\\n    login\\n    createdAt\\n    issues {\\n      totalCount\\n    }\\n    company\\n    bio\\n    followers {\\n      totalCount\\n    }\\n    repositories {\\n      totalCount\\n    }\\n    pinnedItems(first: 6, types: REPOSITORY) {\\n      edges {\\n        node {\\n          ... on Repository {\\n            id\\n owner {\\n login\\n }\\n            name\\n            description\\n            url\\n            primaryLanguage {\\n              name\\n              color\\n            }\\n            stargazerCount\\n            usesCustomOpenGraphImage\\n            openGraphImageUrl\\n            forkCount\\n          }\\n        }\\n      }\\n    }\\n  }\\n}","variables":{}}',
      })
        .then((response) => response.json())
        // @ts-expect-error
        .then((json) => json.data.viewer.pinnedItems.edges.map((node) => ({ ...node.node })))
        .catch((error) => console.error(error))
    );
  }
}
