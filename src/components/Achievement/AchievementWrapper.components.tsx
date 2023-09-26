import React from 'react';
import style from './Achievement.module.css';
import { AchievementService } from './Achievement.service';
import { Achievement } from './Achievement.component';

export type AchievementWrapperProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const AchievementWrapper: React.FC<AchievementWrapperProps> = async (props) => {
  const achievements = await AchievementService.get();
  return (
    <div className={style.container} {...props}>
      {achievements.map(({ title, subtitle }) => (
        <Achievement key={subtitle.split(' ').join('-')} title={title} subtitle={subtitle} />
      ))}
    </div>
  );
};
