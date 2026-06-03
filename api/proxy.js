import axios from 'axios';

const API_URL = process.env.API_URL || 'https://captain.sapimu.au/dramaboxv4';
const TOKEN = process.env.AUTH_TOKEN;

export default async function handler(req, res) {
  const pathArray = req.query.path || [];
  const path = '/' + pathArray.join('/');

  const query = { ...req.query };
  delete query.path;

  const allowed = [
    '/languages',
    '/home',
    '/rank',
    '/recommend/book',
    '/theater',
    '/search',
    '/drama',
    '/play',
    '/proxy-sub'
  ];

  const isAllowed = allowed.some(p => path === p || path.startsWith(p + '/'));

  if (!isAllowed) {
    return res.status(403).json({
      error: 'Forbidden',
      path,
      allowed
    });
  }

  if (!TOKEN) {
    return res.status(500).json({
      error: 'AUTH_TOKEN not configured'
    });
  }

  try {
    const url = `${API_URL}${path}`;

    const response = await axios({
      method: req.method,
      url,
      params: query,
      data: req.body,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(err.response?.status || 500).json({
      error: 'API request failed',
      calledUrl: `${API_URL}${path}`,
      status: err.response?.status,
      apiResponse: err.response?.data,
      message: err.message
    });
  }
}