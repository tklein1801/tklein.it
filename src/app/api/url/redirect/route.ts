import url from 'url';
import { NextResponse, type NextRequest } from 'next/server';

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

export async function GET(req: NextRequest, { params }: any) {
  const shortUrl = url.parse(req.url, true).query;
  if (!shortUrl || !shortUrl.url || Array.isArray(shortUrl.url)) {
    return NextResponse.json({ status: 404, message: 'Nothing found' }, { status: 404 });
  }

  const result = await resolveShortUrl(shortUrl.url as string);
  if (!result) {
    return NextResponse.json({ status: 404, message: 'Nothing found' }, { status: 404 });
  }

  return NextResponse.redirect(result.longUrl);
}

async function resolveShortUrl(slug: string) {
  let shortUrl = null;
  try {
    const response = await fetch(`https://backend.tklein.it/v2/short_url?sid=${slug}`);
    const json: ApiResponse<ShortUrl> = await response.json();
    console.log(json);
    if (json.data) {
      shortUrl = json.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return shortUrl;
  }
}
