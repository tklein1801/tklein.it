import React from 'react';
import style from './Card.module.css';

export type CardTextProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardText: React.FC<CardTextProps> = (props) => {
  return (
    <p {...props} className={style.text}>
      {props.children}
    </p>
  );
};
