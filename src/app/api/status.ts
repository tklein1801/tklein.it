import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function createShortUrl(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).end();
}
