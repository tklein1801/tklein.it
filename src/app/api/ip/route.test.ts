/** @jest-environment node */
import {GET, POST} from './route';

describe.each([['GET', GET], ['POST', POST]] as const)('%s /api/ip', (method, handler) => {
  it('returns the IP for curl', async () => {
    const response = handler(new Request('http://localhost/api/ip', {
      method,
      headers: {'x-forwarded-for': '192.0.2.1, 192.0.2.2', 'user-agent': 'curl/8'},
    }));

    expect(await response.text()).toBe('192.0.2.1\n');
    expect(response.headers.get('content-type')).toBe('text/plain; charset=utf-8');
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('greets browsers with their IPv6 address', async () => {
    const response = handler(new Request('http://localhost/api/ip', {
      method,
      headers: {'x-forwarded-for': '2001:db8::1', accept: 'text/html'},
    }));

    expect(await response.text()).toBe('Hello 2001:db8::1\n');
  });

  it.each([undefined, 'not-an-ip'])('rejects unavailable or invalid IP %s', async (ip) => {
    const response = handler(new Request('http://localhost/api/ip', {
      method,
      headers: ip ? {'x-forwarded-for': ip} : {},
    }));

    expect(response.status).toBe(503);
    expect(await response.text()).toBe('IP address unavailable\n');
  });
});
