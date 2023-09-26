import React from 'react';
import { Project } from './Project.component';
import style from './Project.module.css';
import { Heading, Section } from '../core';
import { ProjectService } from './Project.service';

export type ProjectWrapperProps = {};

export const ProjectWrapper: React.FC<ProjectWrapperProps> = async () => {
  const projects = await ProjectService.getProjects();
  return (
    <Section id="projects">
      <Heading>Projects</Heading>
      <div className={style.projectGrid}>
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </Section>
  );
};
