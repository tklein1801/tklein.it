import {NextResponse} from 'next/server';

export function GET(req: Request) {
  const userAgent = req.headers.get('user-agent');
  if (!userAgent) return NextResponse.redirect('/');

  if (!userAgent.includes('curl')) {
    return NextResponse.redirect('/');
  }
  const ip = req.headers.get('x-forwarded-for');
  const userIp = ip?.split(',')[0].trim();
  return new Response(userIp, {headers: {'Content-Type': 'text/plain'}});
}
