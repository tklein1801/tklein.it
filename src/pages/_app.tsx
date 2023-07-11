import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

import React from 'react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from '@/components/Layout.component';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </React.Fragment>
  );
}
