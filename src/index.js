import { createServer } from 'node:http';

const PORT = process.env.DSH_PORT || 3080;
const HOST = process.env.DSH_HOST || '127.0.0.1';
const MODEL = process.env.DEEPSEEK_DEFAULT_MODEL || 'deepseek-ai/deepseek-v4.1-flash';

const server = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', model: MODEL, timestamp: new Date().toISOString() }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`DeepSeek Harness 2.0 Online | Active Model: ${MODEL}\n`);
});

server.listen(PORT, HOST, () => {
  console.log(`[INFO] DeepSeek Harness running on http://${HOST}:${PORT}`);
});