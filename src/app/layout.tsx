import '@/style/globals.css';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { DefaultLayout } from '@/components';
// import { JetBrains_Mono } from 'next/font/google';

export const metadata = {
  title: 'Thorben Klein',
  description: 'Some information about me and my projects',
};

// const jbMono = JetBrains_Mono({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body /*className={jbMono.className}*/>
        <DefaultLayout>{children}</DefaultLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
