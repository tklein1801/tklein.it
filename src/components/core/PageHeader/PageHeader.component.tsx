import React from 'react';
import { Link } from '../Typography';
import style from './PageHeader.module.css';

const PageHeaderLinks = [
  { label: 'About me', ref: '#about-me' },
  { label: 'Commits', ref: '#commits' },
  { label: 'Experience', ref: '#my-experience' },
  { label: 'Projects', ref: '#projects' },
];

export const PageHeader = () => {
  // const [padding, setPadding] = React.useState(4);

  // const handleScroll = () => {
  //   setPadding(window.scrollY > 0 ? 2.5 : 4);
  // };

  // React.useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // });

  return (
    <section className={style.header} /*onScroll={handleScroll}*/>
      <nav
      // style={{
      //   paddingTop: `${padding}em`,
      //   paddingBottom: `${padding}em`,
      // }}
      >
        {PageHeaderLinks.map(({ label, ref }) => (
          <Link key={label} href={ref}>
            {label}
          </Link>
        ))}
      </nav>
    </section>
  );
};
