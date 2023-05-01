import React from 'react';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Typography';
import type { Project as ProjectType } from './Project.type';
import { Project } from './Project.component';
import style from './project.module.css';

export type ProjectContainerProps = {
  projects: ProjectType[];
};

export const ProjectContainer: React.FC<ProjectContainerProps> = ({ projects }) => {
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
