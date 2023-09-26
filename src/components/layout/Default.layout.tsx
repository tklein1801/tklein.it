import React from 'react';
import style from '@/style/Home.module.css';
import { Footer, PageHeader, Sidebar } from '../core';

export type DefaultLayoutProps = React.PropsWithChildren;

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <main className={style.wrapper}>
      <Sidebar />
      <div className={style.main}>
        <PageHeader />
        {children}
        <Footer />
      </div>
    </main>
  );
};
