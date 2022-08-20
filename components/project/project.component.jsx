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
          projects.map((project, index) => <Project key={index} data={project} />)
        ) : (
          <NoResults text="No projects found" />
        )}
      </div>
    </section>
  );
};

export const Project = ({ data }) => {
  const { owner, name, description, url, primaryLanguage, stargazerCount, forkCount } = data;

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

      <p className={style.projectDescription}>{description || 'No description'}</p>

      <div className={style.projectInfoContainer}>
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
