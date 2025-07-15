// server.js
require('dotenv').config(); // Load environment variables from .env file
const http = require('http');
const url = require('url');
const sendThankYouEmail = require('./email.js'); // Your serverless function

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Handle the specific API endpoint
  if (req.method === 'POST' && parsedUrl.pathname === '/api/send-thank-you-email') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        req.body = JSON.parse(body); // Attach parsed body to req object
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
        return;
      }
      // Call your serverless function
      await sendThankYouEmail(req, res);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

const PORT = process.env.PORT || 3001; // Use a different port than your React app
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});