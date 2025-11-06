const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log('Request for:', req.url);
  
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body style="background: green; color: white; text-align: center; padding: 50px;">
          <h1>🎉 Simple Server is Working!</h1>
          <p>This proves your network and browser are working</p>
          <p>Time: ${new Date().toLocaleTimeString()}</p>
        </body>
      </html>
    `);
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Simple server running at http://localhost:${PORT}/`);
  console.log('Try going to: http://localhost:5000');
});