import React from 'react';
import style from './Section.module.css';

export type SectionProps = React.HTMLAttributes<HTMLElement>;

export const Section: React.FC<SectionProps> = (props) => {
  return (
    <section {...props} className={style.section}>
      {props.children}
    </section>
  );
};
