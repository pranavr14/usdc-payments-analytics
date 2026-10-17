# payflow/analytics

A full-stack product analytics portfolio project for evaluating USDC payments against traditional card rails.

## What it demonstrates

- Product analytics dashboard with volume, adoption, fee, settlement, and merchant metrics
- Backend API for metrics, transactions, and a guarded AI-support experience
- Simulated transaction dataset with explicit disclosure
- Product experiment brief and user-facing data story
- Responsible AI pattern: source label, human-review indicator, uncertainty disclosure, and safe fallback

## Run locally

Requires Node.js 18+.

```bash
npm start
```

Open http://localhost:3000.

For development with automatic restart:

```bash
npm run dev
```

## API

- `GET /api/metrics` — dashboard KPIs
- `GET /api/transactions?limit=50` — simulated ledger rows
- `POST /api/assistant` — `{ "question": "How much could we save on fees?" }`

## Portfolio case-study framing

The product hypothesis is that businesses will adopt USDC when they can see a clear advantage in cost and settlement speed. The next recommended experiment is a guided wallet-onboarding flow. Success metrics: wallet activation, first-payment conversion, completion time, support escalation rate, and payment success rate.

All transaction data is simulated for research and portfolio demonstration; it is not financial advice or a production payment processor.
