import React from 'react';
import { Head } from './Head';
import style from '@/styles/Home.module.css';
import { Sidebar } from './Sidebar';
import { PageHeader } from './PageHeader';
import { Footer } from './Footer';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <Head />
      <body>
        <div className={style.wrapper}>
          <Sidebar />
          <div className={style.main}>
            <PageHeader />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};
