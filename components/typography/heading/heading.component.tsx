import * as React from 'react';
import styles from './heading.module.css';

export const Heading: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = (props) => {
  return (
    <h1 {...props} className={styles.heading}>
      {props.children}
    </h1>
  );
};

export const Subheading: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = (props) => {
  return (
    <h3 {...props} className={styles.subheading}>
      {props.children}
    </h3>
  );
};
