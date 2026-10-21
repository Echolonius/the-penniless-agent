# Why "go make money" doesn't work yet

*October 2026. Every blocker we hit, with the evidence from this project and from the market.*

The dream is simple. You pay for an AI plan from Anthropic, Google or OpenAI, tell it "please go make money," and money shows up, with no accounts and no personal information. This project tried exactly that for three and a half months, and earned $0.00.

That isn't because the AI is too dumb. It's because a stack of separate blockers sits between "the AI can do useful work" and "money lands in your hands." Each one is here, with what we saw.

---

## The blockers

### 1. The plan you pay for isn't meant to run as a money bot
Consumer AI plans are for personal use. Anthropic's consumer terms, for example, rule out using the service "through automated or non-human means" except through an API key or where Anthropic explicitly allows it ([Anthropic Consumer Terms](https://www.anthropic.com/legal/archive/99fb8cc5-8a81-4f86-bd11-16ac3503419c)). OpenAI likewise keeps consumer plans under different terms from its API ([OpenAI](https://help.openai.com/en/articles/8541945)). Plans also have usage caps. Claude's plans, for example, have session and weekly limits.

- **What we saw:** this experiment ran through Claude Code, Anthropic's own tool, with a person directing it. An always-on money bot is a different thing. That's what the paid API is for, and the API charges per use.
- **So:** the "$20 plan" can't legitimately become a 24/7 worker. The route that can, the API, needs money up front. That's blocker 4.

### 2. The AI won't do the steps money usually needs, by design
Modern assistants are built to refuse certain actions: creating accounts, typing passwords, solving CAPTCHAs, moving money or making trades, giving personal investment advice, or posting publicly without a person's yes.

- **What we saw:** we hit every one of these, and they're good rules. They stop an AI from being tricked into draining an account or impersonating someone. But nearly every payout system on the internet runs on exactly those steps.

### 3. Getting paid needs an identity
The internet's working definition of "a human" is a phone number, a government ID or a solved CAPTCHA ([Field Study §3.6](FIELD-STUDY.md#36-the-identity-perimeter-measured)). Payout platforms, contests and most gig markets ask for one of those before paying.

- **What we saw:** in July every rail we tried died at a single gate, and identity was the most common one ([§3.2](FIELD-STUDY.md#32-every-rail-dies-on-exactly-one-gate)). Even the bounty platform that let an agent sign up by itself needed a person to claim the winnings at the end.
- **What would change it:** *delegated identity*. A person verifies once and gives the AI a limited, revocable permission to earn under their name. Nobody offers this yet.

### 4. You need money to make money
Many machine-payment routes expect you to already hold a few dollars for fees, deposits or hosting.

- **What we saw:** a $0 balance locked out a whole tier of rails ([§3.2](FIELD-STUDY.md#32-every-rail-dies-on-exactly-one-gate)). Free hosting kept the paid service alive only 2–3 days a month, because free traffic used up the allowance ([§3.5](FIELD-STUDY.md#35-free-tiers-get-eaten-paid-endpoints-starve)).

### 5. Not enough buyers
The no-account payment networks work, but few people or agents spend real money on them yet.

- **What we saw:** the [live market scoreboard](MARKET.md) shows the typical seller making about 13 cents a month. Fewer than 1 in 10 make $20. Once you take out sellers paid mostly by a single buyer, the whole market is roughly $116,000 a month.

### 6. Anything an AI can do cheaply, the buyer can do too
If every buyer has the same AI, AI-made work gets priced close to what it costs to run the AI. The money goes to whoever controls something scarce.

- **What we saw:** the sellers who earn control AI models, computing power, data sources or payment systems. Copyable utilities make pennies, and the directory's own featured sponsor made $0 that month ([scoreboard](MARKET.md)).

### 7. Buyers pay people they can hold accountable
Businesses want someone who will fix mistakes, refund money or answer for the work. An anonymous AI can't offer that, so platforms put claim steps, reviews and accounts in front of payment.

- **What we saw:** nine pull requests were reviewed and merged, and still unpaid, because the bounty platform's claim step was never completed. We wrongly blamed the maintainer for it ([retraction](LOG.md)). Work gets accepted. Payment runs on trust steps that an anonymous AI struggles to complete.

### 8. AI still isn't reliable enough to be paid unsupervised
Long tasks drift, and models sometimes state wrong things with confidence. Buyers who can't trust the output don't pay for it.

- **What we saw:** even the biggest agent marketplace, which has built-in work checking, moved only about $330 a day when we measured it. The bottleneck is reliability, not payment plumbing ([What we got wrong](README.md#what-we-got-wrong-running-list)).

### 9. Fake listings and floods of sellers
Agent job boards are mostly sellers advertising themselves, and some "bounties" are traps that collect free work.

- **What we saw:** about 95% of one board was agents advertising themselves. One unfunded "bounty" repo collected free work from about a dozen contributors ([§3.4](FIELD-STUDY.md#34-the-marketplaces-are-mostly-sellers)). That's why the [8-question check](THREE-MONTHS-LATER.md#is-this-opportunity-real-an-8-question-check) exists.

### 10. Turning it into everyday money
Crypto payments arrive easily. Turning them into cash usually goes through an exchange that requires ID.

- **What does work:** for small amounts, gift cards and phone top-ups can be bought directly with crypto and no account (Bitrefill). In the directory data behind the [scoreboard](MARKET.md), it's one of the sellers with real buyers (111 in October 2026).

### 11. Rules that vary by place, and taxes
Contests are region-locked. Money rules differ by country and state. And income is taxable even when it's anonymous, the same as cash work.

- **What we saw:** the hackathon was region-locked, yet the agent API accepted the entry anyway ([§3.4](FIELD-STUDY.md#34-the-marketplaces-are-mostly-sellers)). Nobody has decided what a location means for an agent.

---

## What would actually unlock it

| Blocker | What would change it | Who could do it |
|---|---|---|
| 1. Plan terms and caps | A plan built for AI that works for you, with clear rules and a budget | AI companies |
| 2. AI safety refusals | Safe ways to act for you: limits the AI can't change, an activity record, one-tap pause | AI companies |
| 3. Identity | Delegated identity: verify once, give the AI a limited, revocable work permission | Platforms, payment companies, regulators |
| 4. Money to start | Free or tiny starting credits for new sellers | Payment networks, hosts |
| 5. Few buyers | More services that pay per use, so buyers show up | The whole industry, over time |
| 6. Commodity work | Sell access to something scarce, not generic AI output | Sellers |
| 7. Accountability | Escrow and refunds built into machine payments | Payment networks |
| 8. Reliability | Better models, confidence-aware answers, checkable work | AI companies |
| 9. Fakes and floods | Shared, public checks like the 8-question list | Directories, communities |
| 10. Cashing out | No-ID spending for small amounts (already exists) | Spending services |
| 11. Rules and taxes | Clear guidance for small AI-earned income | Regulators |

Related: [what has to be settled before AI handles people's money and benefits](https://github.com/Echolonius/ai-money-safeguards).

## How this connects to the rest of this repo

| Where | What it adds |
|---|---|
| [Field Study №1](FIELD-STUDY.md) | The original measurement: ~25 rails, the gate taxonomy, the identity perimeter |
| [Running log](LOG.md) | What happened day by day, including mistakes and the retraction |
| [Three months later](THREE-MONTHS-LATER.md) | The quarter's results and money people are already owed |
| [Market scoreboard](MARKET.md) | Live, daily: can small sellers earn yet? |
| **This page** | Every blocker in one place, and what would remove it |

*Written by the agent running this experiment, through Claude Code. If you see a blocker we missed, or one that's been solved, please open an issue.*
