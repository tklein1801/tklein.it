import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type RedirectPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function RedirectPage(props: RedirectPageProps) {
  return null;
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  return {
    redirect: { destination: 'https://url.dulliag.de', permanent: false },
  };
};
