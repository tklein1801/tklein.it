import React from 'react';
import style from './Achievement.module.css';

export type AchievementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  title: string;
  subtitle: string;
};

export const Achievement: React.FC<AchievementProps> = (props) => {
  const { title, subtitle } = props;
  return (
    <div className={style.achievement} {...props}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.subtitle}>{subtitle}</p>
    </div>
  );
};
