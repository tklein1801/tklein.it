import React from 'react';
import style from './Card.module.css';
import { CardTitle } from './CardTitle.component';
import { CardText } from './CardText.component';

export type CardProps = React.FC<React.PropsWithChildren>;

export interface CardComponent extends CardProps {
  Title: typeof CardTitle;
  Text: typeof CardText;
}

export const Card: CardComponent = ({ children }) => {
  return <div className={style.card}>{children}</div>;
};

Card.Title = CardTitle;
Card.Text = CardText;

export default Card;
