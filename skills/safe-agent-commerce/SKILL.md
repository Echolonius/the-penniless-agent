---
name: safe-agent-commerce
description: Field-tested safety rules for AI agents that earn, hold, or spend real money (crypto bounties, x402 services, agent marketplaces, wallets). Use whenever an agent is about to work for a promised payment, join an earning platform, move funds, or evaluate a marketplace's claims — BEFORE committing work or money.
---

# Safe Agent Commerce

Rules distilled from operating a real autonomous earning agent with a real wallet on a $0 budget.
Every rule below exists because skipping it cost (or nearly cost) real work or real money.
The through-line: **verify settlement reality before committing anything — your labor is capital too.**

## 1. Payment evidence before work — always

Never start work against a promised bounty/reward without evidence that this source **has actually paid someone**:

- Bounty platforms/bots: look for the bot's *funding confirmation* on the specific issue (e.g. an escrow
  or "reward created" comment), not just a dollar amount in the title.
- Repos/issue boards: check for **merged PRs with confirmed payouts** in the history. A board created
  and abandoned the same day, with many hopeful submissions and zero merges, is a free-work harvester —
  agents are its primary prey (observed in the wild: a dozen contributors, several disclosed AI agents,
  all unpaid).
- Own-token rewards ("earn 5 XYZ-coin") are not payment evidence; assume worthless until proven liquid.

## 2. Audit marketplaces on-chain, not by their marketing

Any marketplace claiming traction settles somewhere public. Before joining or building for one:

- Find its settlement contract; read raw stablecoin flows with `eth_getLogs` (chunk block ranges to
  respect RPC limits; filter token Transfer topics on the contract as sender/recipient).
- Compute: jobs/day, total volume, **distinct buyers**, and payout recipients. Watch for the same
  addresses appearing as both buyer and payee (self-dealing test loops inflating "activity").
- Compare measured volume against the platform's announced numbers. An incentive-program press release
  is not flow; observed transfers are.
- Decide with a numeric bar set in advance (e.g. "join only if >N distinct organic buyers/day").

## 3. Wallet discipline

- **Receive-only by default.** The earning wallet's key signs *messages* (auth) freely, but never signs
  token approvals, spends, or contract interactions without an explicit, understood, pre-agreed purpose.
- Services must hold **zero secrets**: pay-gated APIs can run keyless (facilitator-verified payments in,
  public-RPC balance reads out). If a host is compromised and there is nothing to steal, it isn't a treasury risk.
- Never put a private key, mnemonic, or `.env` in a repo — scan before every push, not after.

## 4. Fee-and-threshold arithmetic before moving money

- Compute the full toll (on-ramp minimums, network fees, spread) **before** moving any amount. Moving
  sub-dollar sums through fee-bearing rails destroys them; refuse politely, even when the owner offers.
- Think in **unlock thresholds**, not balances: many rails have a fixed entry cost (an identity
  registration, gas, storage rent). Sequence: earn on zero-capital rails first; spend capital only to
  cross a named threshold with a named payoff.
- "Multiply a tiny amount safely and fast" does not exist. Anything promising it is gambling or a scam;
  say so plainly.

## 5. Identity: keys and reputation over accounts

- Prefer cryptographic identity (wallet signatures / SIWX, EIP-4361) and existing platform identity
  (e.g. an authenticated GitHub) over creating new accounts. New-account signups are consent decisions
  that belong to the human.
- KYC walls are common at *payout* time even when signup is open — check the payout requirements
  **before** working, not after winning.
- Reputation compounds: transparent, quality contributions under a stable identity are an asset no
  capital requirement gates. Disclose agent identity in outreach and PRs; deception debt always comes due.

## 6. Outreach ethics (agents are judged as their principals)

- Contribute where you have standing (a bug you personally hit, a fix you validated). Never mass-post,
  never pile onto claimed issues, never post a second promotional comment where one is pending.
- One well-evidenced upstream issue/PR beats ten cold pitches — and unlike spam, it appreciates.

## 7. Verify your own outputs like a counterparty would

- After any outward artifact (PR, deployment, listing): re-fetch it from the public side and check it
  renders/validates/passes CI. "It ran without error" is not "it is correct."
- Diff-check every changed line against intent; count output frames/bytes/records rather than trusting
  container metadata or tool exit codes.
- Keep an append-only record of every outward artifact (URL + state) the moment it's created; owners get
  confused emails about things you forgot you touched.
