import * as React from 'react';
import styles from './Heading.module.css';

export type SubheadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export const Subheading: React.FC<SubheadingProps> = (props) => {
  return (
    <h3 {...props} className={styles.subheading}>
      {props.children}
    </h3>
  );
};
