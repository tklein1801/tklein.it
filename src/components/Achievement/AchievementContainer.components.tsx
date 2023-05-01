import React from 'react';
import style from './achievement.module.css';

export type AchievementContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  React.PropsWithChildren;

export const AchievementContainer: React.FC<AchievementContainerProps> = (props) => {
  return (
    <div className={style.container} {...props}>
      {props.children}
    </div>
  );
};
