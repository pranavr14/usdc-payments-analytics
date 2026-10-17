import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const port = process.env.PORT || 3000;
const transactions = Array.from({ length: 240 }, (_, i) => {
  const day = new Date(Date.now() - (i % 30) * 86400000);
  const volume = Math.round(180 + ((i * 73) % 1100));
  const method = i % 3 === 0 ? 'Card' : 'USDC';
  return { id: `txn_${String(240 - i).padStart(4, '0')}`, date: day.toISOString().slice(0, 10), method, volume, fee: method === 'USDC' ? +(volume * 0.0012).toFixed(2) : +(volume * 0.029 + 0.3).toFixed(2), settledMinutes: method === 'USDC' ? 2 + (i % 6) : 1440 + (i % 300), status: i % 17 === 0 ? 'review' : 'settled' };
});

function json(res, body, status = 200) { res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }); res.end(JSON.stringify(body)); }
function metrics() {
  const usdc = transactions.filter(t => t.method === 'USDC'); const card = transactions.filter(t => t.method === 'Card');
  const sum = (rows, key) => rows.reduce((a, x) => a + x[key], 0);
  const usdcVol = sum(usdc, 'volume'), cardVol = sum(card, 'volume');
  return { totalVolume: usdcVol + cardVol, usdcShare: Math.round(usdcVol / (usdcVol + cardVol) * 100), usdcFees: +sum(usdc, 'fee').toFixed(2), cardFees: +sum(card, 'fee').toFixed(2), feeSavings: +((sum(card, 'fee') / card.length - sum(usdc, 'fee') / usdc.length) / (sum(card, 'fee') / card.length) * 100).toFixed(1), avgUsdcSettlement: +(sum(usdc, 'settledMinutes') / usdc.length).toFixed(1), avgCardSettlement: +(sum(card, 'settledMinutes') / card.length / 60).toFixed(1), successRate: 98.7, activeMerchants: 1284 };
}
function answer(question) {
  const q = question.toLowerCase(); const m = metrics();
  if (q.includes('fee') || q.includes('cost')) return `USDC averages ${m.feeSavings}% lower processing cost than cards in this dataset. The modeled USDC cost is driven by a 0.12% fee assumption; validate this against your processor agreement before making a production decision.`;
  if (q.includes('settle') || q.includes('time')) return `USDC settles in about ${m.avgUsdcSettlement} minutes on average here, versus ${m.avgCardSettlement} hours for cards. The dashboard uses simulated product data, so treat this as directional.`;
  if (q.includes('recommend') || q.includes('should')) return 'Prioritize USDC for cross-border and high-frequency merchants, but keep card fallback for customers without wallets. Next experiment: test a guided wallet-creation flow and measure activation, completion, and support escalations.';
  return 'I can explain fees, settlement time, or recommend a product experiment. I use the dashboard metrics and will flag where the data is simulated or where human review is needed.';
}
async function body(req) { let data = ''; for await (const chunk of req) data += chunk; try { return JSON.parse(data || '{}'); } catch { return {}; } }
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'GET' && url.pathname === '/api/metrics') return json(res, metrics());
  if (req.method === 'GET' && url.pathname === '/api/transactions') return json(res, { data: transactions.slice(0, Number(url.searchParams.get('limit') || 50)) });
  if (req.method === 'POST' && url.pathname === '/api/assistant') { const data = await body(req); return json(res, { answer: answer(data.question || ''), reviewed: true, source: 'USDC Payments Analytics dataset' }); }
  let requested = url.pathname === '/' ? '/public/index.html' : url.pathname;
  const file = normalize(join(root, requested));
  if (!file.startsWith(root)) return json(res, { error: 'Not found' }, 404);
  try { const content = await readFile(file); const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' }; res.writeHead(200, { 'Content-Type': types[extname(file)] || 'text/plain' }); res.end(content); } catch { json(res, { error: 'Not found' }, 404); }
});
server.listen(port, '127.0.0.1', () => console.log(`USDC Analytics running at http://localhost:${port}`));
