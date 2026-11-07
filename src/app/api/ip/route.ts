import {isIP} from 'node:net';

export function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
  const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  };

  if (!ip || !isIP(ip)) {
    return new Response('IP address unavailable\n', {status: 503, headers});
  }

  const browser = req.headers.get('accept')?.includes('text/html');
  return new Response(`${browser ? 'Hello ' : ''}${ip}\n`, {headers});
}

export const POST = GET;
