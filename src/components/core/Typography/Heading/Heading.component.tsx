import * as React from 'react';
import styles from './Heading.module.css';

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <h1 {...props} className={styles.heading}>
      {props.children}
    </h1>
  );
};
