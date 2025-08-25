const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Proxy middleware for Puter API
app.use('/api/puter', createProxyMiddleware({
  target: 'https://api.puter.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/puter': '', // Remove /api/puter from the path
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add necessary headers
    proxyReq.setHeader('Origin', 'https://puter.com');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Add CORS headers to the response
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

app.listen(PORT, () => {
  console.log(`CORS proxy server running on http://localhost:${PORT}`);
  console.log('Use http://localhost:3001/api/puter/* to proxy requests to https://api.puter.com/*');
});
