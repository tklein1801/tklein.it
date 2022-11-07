import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faQuestion, faCross } from '@fortawesome/free-solid-svg-icons';
import {
  faSquareJs,
  faPhp,
  faHtml5,
  faCss3,
  faSass,
  faJava,
  faDocker,
  faReact,
  faDiscord,
  faBootstrap,
  faGoogle,
  faNode,
} from '@fortawesome/free-brands-svg-icons';
import { Subheading } from '../Typography/Heading/Heading.component';
import styles from './skills.module.css';

export type Skill = {
  icon: IconDefinition;
  label: string;
};

export type SkillProps = Skill;

const SKILLS: Skill[] = [
  {
    icon: faQuestion,
    label: 'TypeScript',
  },
  {
    icon: faSquareJs,
    label: 'JavaScript',
  },
  {
    icon: faPhp,
    label: 'PHP',
  },
  {
    icon: faHtml5,
    label: 'HTML',
  },
  {
    icon: faCss3,
    label: 'CSS',
  },
  {
    icon: faSass,
    label: 'SASS',
  },
  {
    icon: faQuestion,
    label: 'SQL',
  },
  {
    icon: faJava,
    label: 'Java',
  },
  {
    icon: faDocker,
    label: 'Docker',
  },
];

const FRAMEWORKS: Skill[] = [
  {
    icon: faReact,
    label: 'ReactJS',
  },
  {
    icon: faReact,
    label: 'React Native',
  },
  {
    icon: faNode,
    label: 'NodeJS',
  },
  {
    icon: faDiscord,
    label: 'DiscordJS',
  },
  {
    icon: faBootstrap,
    label: 'Bootstrap 4',
  },
  {
    icon: faGoogle,
    label: 'Firebase',
  },
  {
    icon: faQuestion,
    label: 'Supabase',
  },
  {
    icon: faQuestion,
    label: 'Material UI',
  },
  {
    icon: faCross,
    label: 'jQuery',
  },
];

export const SkillContainer = () => {
  return (
    <div className={styles.skillsContainer}>
      <div>
        <Subheading>Skills I own...</Subheading>
        <ul className={styles.container}>
          {SKILLS.map((skill) => (
            <Skill key={skill.label} {...skill} />
          ))}
        </ul>
      </div>
      <div>
        <Subheading>Frameworks & Libraries</Subheading>
        <ul className={styles.container}>
          {FRAMEWORKS.map((framework) => (
            <Skill key={framework.label} {...framework} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Skill: React.FC<SkillProps> = ({ icon, label }) => {
  return (
    <li className={styles.skill}>
      <FontAwesomeIcon icon={icon} />
      <p>{label}</p>
    </li>
  );
};
