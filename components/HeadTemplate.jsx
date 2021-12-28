import Head from 'next/head';

export const HeadTemplate = ({
  title = 'Thorben Klein',
  themeColor = '#02d463',
  icon = '/me.jpg',
}) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content={themeColor} />
      <meta property="og:image" content={icon} />
      <meta property="og:type" content="website" />
      <link rel="icon" type="image/jpg" sizes="500x500" href={icon} />
      <title>{title}</title>
      <meta name="description" content="Information about Thorben Klein" />
      <link rel="stylesheet" href="/style/master.css" />
      <link rel="stylesheet" href="/style/ticker.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </Head>
  );
};
