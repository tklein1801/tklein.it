import React from 'react';
import styles from './Link.module.css';

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: React.FC<LinkProps> = (props) => {
  return (
    <a {...props} className={styles.link}>
      {props.children}
    </a>
  );
};
