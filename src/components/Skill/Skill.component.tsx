import React from 'react';
import style from './Skill.module.css';

export type Skill = {
  icon: React.Component;
  label: string;
};

export type SkillProps = Skill;

export const Skill: React.FC<SkillProps> = ({ label }) => {
  return <li className={style.skill}>{label}</li>;
};
