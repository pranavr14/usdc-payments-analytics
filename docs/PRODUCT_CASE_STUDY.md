# Payflow/Analytics — Product Case Study

## 1. Product overview

Payflow/Analytics is a portfolio product prototype that helps merchants compare USDC and traditional card payment rails using cost, settlement speed, adoption, and payment-success metrics.

The project is intentionally built around a product question:

> How might we help a merchant decide when USDC is worth offering without forcing every customer to understand crypto infrastructure?

## 2. Target users

- Small and mid-sized online merchants evaluating payment costs
- Product managers responsible for checkout and payment conversion
- Operations teams monitoring settlement and support issues

## 3. Product hypothesis

Merchants are more likely to test USDC when the product makes three tradeoffs visible: processing cost, settlement time, and customer adoption friction. A guided wallet-onboarding experience may improve activation more effectively than simply advertising lower fees.

## 4. Current MVP

- KPI dashboard for volume, USDC share, fee savings, settlement time, and active merchants
- Simulated payment ledger for USDC and card transactions
- REST endpoints for metrics, transactions, and assistant questions
- AI analytics assistant with simulated-data disclosure and human-review indicator
- Product insight card recommending a guided wallet-onboarding experiment

## 5. Validation plan — complete before claiming results

Interview at least five potential users. Record only anonymized notes.

Questions:

1. What payment costs or settlement delays create the most operational pain?
2. What would make you hesitant to offer USDC?
3. What would you need to understand before connecting a wallet?
4. Which matters more: lower fees, faster settlement, or customer familiarity?
5. Where would you expect payment support to help you?

Summarize findings in this table:

| Participant | User type | Key pain point | Current workaround | Product implication |
|---|---|---|---|---|
| P1 | To be completed | To be completed | To be completed | To be completed |
| P2 | To be completed | To be completed | To be completed | To be completed |
| P3 | To be completed | To be completed | To be completed | To be completed |
| P4 | To be completed | To be completed | To be completed | To be completed |
| P5 | To be completed | To be completed | To be completed | To be completed |

## 6. Proposed experiment

**Goal:** Improve first-time wallet activation without reducing payment trust.

- **Control:** “Connect wallet” with standard help text
- **Variant:** Guided setup explaining wallet purpose, network selection, fees, and recovery expectations
- **Primary metric:** Wallet activation rate
- **Secondary metrics:** Setup completion rate, time to first payment, payment success rate, support escalation rate
- **Guardrails:** No collection of private keys; clear fees; visible fallback to card payment; human review for ambiguous support answers

## 7. Responsible AI design

- Uses a bounded analytics dataset rather than unrestricted financial advice
- Discloses that the portfolio dataset is simulated
- Gives directional recommendations instead of telling users what to buy or invest in
- Includes human-review language for high-risk or uncertain questions
- Can be extended with source citations, confidence thresholds, and audit logs

## 8. What I would build next

1. Validate the problem with five user interviews.
2. Replace the in-memory dataset with a small relational database.
3. Run a usability test on the two onboarding variants.
4. Add authentication, input validation, rate limiting, and structured error handling.
5. Connect a read-only blockchain data provider using testnet or public transaction data.

## 9. Limitations

This is a portfolio prototype. Transaction data, merchant counts, fee comparisons, and experiment lift are simulated and must not be presented as production or Coinbase data.
