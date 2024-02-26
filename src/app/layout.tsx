import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import {ThemeProvider} from '@/provider/Theme.provider';
import Head from 'next/head';
import {DefaultLayout} from '@components/Layout';
import {fontClassName} from '@/style/theme/font';

export const metadata: Metadata = {
  title: 'Thorben Klein',
  description: 'Some information about me and my projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#02d463" />
        <meta property="og:image" content="/me.jpeg" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/jpg" sizes="500x500" href="/me.jpeg" />
      </Head>
      <body className={fontClassName}>
        <ThemeProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && (
          <Script
            async
            src="https://analytics.tools.tklein.it/script.js"
            data-website-id="faab5301-fe86-4362-8bb5-e51313e9b0f0"
          />
        )}
      </body>
    </html>
  );
}
