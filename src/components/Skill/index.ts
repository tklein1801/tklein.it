export * from './Skill.component';
export * from './SkillContainer.component';

import type { Skill } from './Skill.component';
import { faQuestion, faCross } from '@fortawesome/free-solid-svg-icons';
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

export const SKILLS: Skill[] = [
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

export const FRAMEWORKS: Skill[] = [
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
