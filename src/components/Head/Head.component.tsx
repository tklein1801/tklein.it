import NextHead from 'next/head';
import React from 'react';

export const Head = () => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#02d463" />
      <meta property="og:image" content="/me.jpeg" />
      <meta property="og:type" content="website" />
      <link rel="icon" type="image/jpg" sizes="500x500" href="/me.jpeg" />
      <title>Thorben Klein</title>
      <meta name="description" content="Information about Thorben Klein" />
    </NextHead>
  );
};
