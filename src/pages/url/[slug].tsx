import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type RedirectPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function RedirectPage({ redirect, url, slug }: RedirectPageProps) {
  return null;
}

export type ApiResponse<T = null> = {
  status: number;
  code: string;
  message: string;
  data: T;
};

export type ShortUrl = {
  id: number;
  active: boolean;
  shortId: string;
  longUrl: string;
  createdAt: number;
};

export const getServerSideProps: GetServerSideProps<{
  redirect: boolean;
  url: ShortUrl | null;
  slug: string | null;
}> = async (context) => {
  const params = context.params;
  const slug = params ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : null;
  let shortUrl = null;
  try {
    const response: ApiResponse<ShortUrl> = await fetch(
      `https://kleithor-spring-boot-backend.herokuapp.com/v2/short_url?sid=${slug}`
    ).then((response) => response.json());
    console.log(response);
    if (response.data) {
      shortUrl = response.data;
    }
  } catch (error) {
    console.error(error);
  }

  if (shortUrl != null) {
    return {
      redirect: {
        permanent: false,
        destination: shortUrl.longUrl,
      },
    };
  }

  if (shortUrl == null) {
    return {
      notFound: true,
    };
  }

  return { props: { redirect: false, url: null, slug: slug || null } };
};
