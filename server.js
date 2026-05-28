const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

function sendFile(res, filePath, statusCode = 200) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendNotFound(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(statusCode, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=3600'
    });
    res.end(data);
  });
}

function sendNotFound(res) {
  const notFoundPath = path.join(PUBLIC_DIR, '404.html');
  if (fs.existsSync(notFoundPath)) {
    sendFile(res, notFoundPath, 404);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
}

function getSafeFilePath(urlPath) {
  let pathname = decodeURIComponent(urlPath.split('?')[0]);

  if (pathname === '/') pathname = '/index.html';
  if (pathname.endsWith('/')) pathname += 'index.html';

  // Clean URLs for local preview.
  const cleanRoutes = new Set(['/about', '/experience', '/skills', '/contact']);
  if (cleanRoutes.has(pathname)) pathname = '/index.html';
  if (pathname === '/resume') pathname = '/assets/gabriela-menocal-resume.pdf';

  const requestedPath = path.normalize(path.join(PUBLIC_DIR, pathname));
  const publicRoot = path.normalize(PUBLIC_DIR + path.sep);

  if (!requestedPath.startsWith(publicRoot) && requestedPath !== path.normalize(PUBLIC_DIR)) {
    return null;
  }

  return requestedPath;
}

const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  const filePath = getSafeFilePath(req.url);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    sendNotFound(res);
    return;
  }

  sendFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Gabriela's professional website is running at http://localhost:${PORT}`);
  console.log('Press Ctrl + C to stop the server.');
});
