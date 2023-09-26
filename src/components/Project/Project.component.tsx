import React from 'react';
import { StarIcon, GitForkIcon } from 'lucide-react';
import type { Project as ProjectType } from './Project.type';
import style from './Project.module.css';
import { Card } from '../core';

export const Project: React.FC<ProjectType & { showImage?: boolean }> = ({
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
          <p style={{ display: 'flex', alignContent: 'center' }}>
            <StarIcon />
            <span className={style.label}>{stargazerCount}</span>
          </p>
        </div>
        <div>
          <p style={{ display: 'flex', alignContent: 'center' }}>
            <GitForkIcon />
            <span className={style.label}>{forkCount}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
