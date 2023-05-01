import React from 'react';
import style from './Card.module.css';

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle: React.FC<CardTitleProps> = (props) => {
  return (
    <h4 {...props} className={style.title}>
      {props.children}
    </h4>
  );
};
