import style from './project.module.css';
import card from '../card/card.module.css';

import { Card } from '../card/card.component';
import { NoResults } from '../NoResults';

export const ProjectContainer = ({ projects }) => {
  return (
    <section>
      <h1 id="my-projects">My projects</h1>

      <div className={style.projectGrid}>
        {projects.length > 0 ? (
          projects.map((project) => <Project data={project} />)
        ) : (
          <NoResults text="No projects found" />
        )}
      </div>
    </section>
  );
};

export const Project = ({ data }) => {
  const { owner, name, description, primaryLanguage, stargazerCount, forkCount } = data;
  const owner_url = 'https://github.com/' + owner.login;
  const repo_url = owner_url + '/' + name;

  return (
    <Card>
      <p className={card.cardTitle}>
        {/* <a href={owner_url} className="repo-link">
          @{owner.login}
        </a>
        / */}
        <a href={repo_url} className="repo-link">
          {name}
        </a>
      </p>

      <p className={style.projectDescription}>{description || 'No description'}</p>

      <div className={style.projectInfoContainer}>
        <div>
          <p>{primaryLanguage.name}</p>
        </div>
        <div>
          <p>
            <i className="far fa-star"></i>
            <span className={style.label}>{stargazerCount}</span>
          </p>
        </div>
        <div>
          <p>
            <i className="fas fa-code-branch"></i>
            <span className={style.label}>{forkCount}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
