import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import style from './Skill.module.css';

export type Skill = {
  icon: IconDefinition;
  label: string;
};

export type SkillProps = Skill;

export const Skill: React.FC<SkillProps> = ({ icon, label }) => {
  return (
    <li className={style.skill}>
      <FontAwesomeIcon icon={icon} />
      <p>{label}</p>
    </li>
  );
};
