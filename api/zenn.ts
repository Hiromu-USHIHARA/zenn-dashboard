import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.query;
  if (!username || typeof username !== 'string') {
    res.status(400).json({ error: 'username is required' });
    return;
  }
  const apiUrl = `https://zenn.dev/api/articles?username=${username}`;
  try {
    const apiRes = await fetch(apiUrl);
    if (!apiRes.ok) {
      res.status(apiRes.status).json({ error: 'Failed to fetch from Zenn API' });
      return;
    }
    const data = await apiRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 