import express from 'express'
import axios from 'axios'
import { config } from 'dotenv'

config()

const app = express()

app.use(express.json())

const API_URL = process.env.API_URL || 'https://captain.sapimu.au/dramaboxv4'
const TOKEN = process.env.AUTH_TOKEN

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
]

app.use('/api', async (req, res, next) => {
  const path = req.path

  const isAllowed = ALLOWED_PATHS.some(p => {
    if (p.endsWith('/')) {
      return path.startsWith(p)
    }

    return path === p || path.startsWith(p + '/')
  })

  if (!isAllowed) {
    return res.status(403).json({
      error: 'Forbidden',
      path
    })
  }

  if (!TOKEN) {
    return res.status(500).json({
      error: 'AUTH_TOKEN not configured'
    })
  }

  try {
    const url = `${API_URL}${path}`

    const config = {
      params: req.query,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'User-Agent': 'DramaBox-Proxy/1.0',
        'Content-Type': 'application/json'
      }
    }

    let response

    if (req.method === 'GET') {
      response = await axios.get(url, config)
    } else if (req.method === 'POST') {
      response = await axios.post(url, req.body, config)
    } else {
      return res.status(405).json({
        error: 'Method not allowed'
      })
    }

    return res.json(response.data)
  } catch (err) {
    return res.status(err.response?.status || 500).json({
      error: 'API request failed',
      status: err.response?.status,
      apiResponse: err.response?.data,
      message: err.message
    })
  }
})

app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})