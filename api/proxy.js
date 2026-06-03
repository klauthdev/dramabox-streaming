import axios from 'axios';

const API_URL = process.env.API_URL || 'https://captain.sapimu.au/dramaboxv4';
const TOKEN = process.env.AUTH_TOKEN;

const ALLOWED_PATHS = [
  '/languages',
  '/home',
  '/rank',
  '/recommend/book',
  '/theater',
  '/search',
  '/drama/',
  '/play',
  '/proxy-sub'
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!TOKEN) {
    return res.status(500).json({
      error: 'AUTH_TOKEN not configured'
    });
  }

  try {
    let path = req.url.replace(/^\/api/, '');
    const [pathname, queryString] = path.split('?');

    const isAllowed = ALLOWED_PATHS.some(p => {
      if (p.endsWith('/')) {
        return pathname.startsWith(p);
      }

      return pathname === p || pathname.startsWith(p + '/');
    });

    if (!isAllowed) {
      return res.status(403).json({
        error: 'Forbidden endpoint',
        pathname
      });
    }

    const url = `${API_URL}${pathname}${queryString ? `?${queryString}` : ''}`;

    const config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'User-Agent': 'DramaBox-Proxy/1.0',
        'Content-Type': 'application/json'
      }
    };

    let response;

    if (req.method === 'GET') {
      response = await axios.get(url, config);
    } else if (req.method === 'POST') {
      response = await axios.post(url, req.body, config);
    } else {
      return res.status(405).json({
        error: 'Method not allowed'
      });
    }

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(err.response?.status || 500).json({
      error: 'API request failed',
      status: err.response?.status,
      apiResponse: err.response?.data,
      message: err.message
    });
  }
}