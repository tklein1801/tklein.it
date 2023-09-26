import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeFork, faStar } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@/components/Card';
import type { Project as ProjectType } from './Project.type';
import style from './Project.module.css';

export const Project: React.FC<ProjectType> = ({
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
      {/* <img className={style.projectImage} src={openGraphImageUrl} alt="Project Image" /> */}
      <Card.Title>
        <a href={`https://github.com/${owner.login}`} className="repo-link">
          @{owner.login}
        </a>
        /
        <a href={url} className="repo-link">
          {name}
        </a>
      </Card.Title>
      <Card.Text>{description || 'No description'}</Card.Text>

      <div className={style.projectInfoContainer}>
        <div>
          <span
            style={{
              borderRadius: '5px',
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
            <span className={style.label}>{stargazerCount}</span>
          </p>
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faCodeFork} />
            <span className={style.label}>{forkCount}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
