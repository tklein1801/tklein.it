import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeFork, faStar } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../card/card.component';
import { Heading } from '../typography/heading/heading.component';
import styles from './project.module.css';
import card from '../card/card.module.css';

export interface Project {
  id: string;
  owner: { login: string };
  name: string;
  description: string;
  url: string;
  primaryLanguage: { name: string; color: string };
  stargazerCount: number;
  forkCount: number;
}

export type ProjectContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { projects: Project[] };

export function getProjects(): Promise<Project[]> {
  return (
    fetch('https://api.github.com/graphql', {
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
      // @ts-expect-error
      .then((json) => json.data.viewer.pinnedItems.edges.map((node) => ({ ...node.node })))
      .catch((error) => console.error(error))
  );
}

export const ProjectContainer: React.FC<ProjectContainerProps> = (props) => {
  return (
    <section {...props}>
      <Heading>My projects</Heading>

      <div className={styles.projectGrid}>
        {typeof props.projects === 'object' &&
          props.projects.map((project) => <Project key={project.id} {...project} />)}
      </div>
    </section>
  );
};

export const Project: React.FC<Project> = ({
  owner,
  url,
  description,
  name,
  primaryLanguage,
  stargazerCount,
  forkCount,
}) => {
  return (
    <Card>
      <p className={card.cardTitle}>
        <a href={`https://github.com/${owner.login}`} className="repo-link">
          @{owner.login}
        </a>
        /
        <a href={url} className="repo-link">
          {name}
        </a>
      </p>

      <p className={styles.projectDescription}>{description || 'No description'}</p>

      <div className={styles.projectInfoContainer}>
        <div>
          <span
            style={{
              borderRadius: '8px',
              padding: '.2rem .5rem',
              fontSize: '.8rem',
              backgroundColor: primaryLanguage.color,
              color: primaryLanguage.color === '#f1e05a' ? 'black' : 'white',
            }}
          >
            {primaryLanguage.name}
          </span>
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faStar} />
            <span className={styles.label}>{stargazerCount}</span>
          </p>
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faCodeFork} />
            <span className={styles.label}>{forkCount}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
