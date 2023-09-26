export * from './Skill.component';
export * from './SkillWrapper.component';

import type { Skill } from './Skill.component';
import { ContainerIcon, HelpCircleIcon } from 'lucide-react';

export const SKILLS: Skill[] = [
  {
    icon: HelpCircleIcon,
    label: 'TypeScript',
  },
  {
    icon: HelpCircleIcon,
    label: 'JavaScript',
  },
  {
    icon: HelpCircleIcon,
    label: 'PHP',
  },
  {
    icon: HelpCircleIcon,
    label: 'HTML',
  },
  {
    icon: HelpCircleIcon,
    label: 'CSS',
  },
  {
    icon: HelpCircleIcon,
    label: 'SASS',
  },
  {
    icon: HelpCircleIcon,
    label: 'SQL',
  },
  {
    icon: HelpCircleIcon,
    label: 'Java',
  },
  {
    icon: ContainerIcon,
    label: 'Docker',
  },
];

export const FRAMEWORKS: Skill[] = [
  {
    icon: HelpCircleIcon,
    label: 'ReactJS',
  },
  {
    icon: HelpCircleIcon,
    label: 'React Native',
  },
  {
    icon: HelpCircleIcon,
    label: 'NodeJS',
  },
  {
    icon: HelpCircleIcon,
    label: 'DiscordJS',
  },
  {
    icon: HelpCircleIcon,
    label: 'Bootstrap 4',
  },
  {
    icon: HelpCircleIcon,
    label: 'Firebase',
  },
  {
    icon: HelpCircleIcon,
    label: 'Supabase',
  },
  {
    icon: HelpCircleIcon,
    label: 'Material UI',
  },
  {
    icon: HelpCircleIcon,
    label: 'jQuery',
  },
];
