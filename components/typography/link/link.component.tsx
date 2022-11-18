import * as React from "react";
import styles from "./link.module.css";

export const Link: React.FC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props) => {
  return <a {...props} className={styles.link}>{props.children}</a>;
}