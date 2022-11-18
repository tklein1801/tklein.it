import * as React from 'react';
import style from './card.module.css';

export const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={style.card}>{children}</div>;
};
