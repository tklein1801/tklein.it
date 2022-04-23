import style from './card.module.css';

export const Card = ({ children }) => {
  return <div className={style.card}>{children}</div>;
};
