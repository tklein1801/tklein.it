import React from 'react';
import style from './Skill.module.css';

export type Skill = {
  label: string;
};

export type SkillProps = Skill;

export const Skill: React.FC<SkillProps> = ({ label }) => {
  return <li className={style.skill}>{label}</li>;
};
