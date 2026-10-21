# The market data feed

Every day, a GitHub Actions job reads the public [x402-list.com](https://x402-list.com/) directory, works out a few plain numbers about whether small sellers earn from AI agents, and saves one line to [`data/market-history.jsonl`](data/market-history.jsonl). The same numbers feed [MARKET.md](MARKET.md).

No key and no account are needed to read it.

```bash
# today's line
curl -s https://raw.githubusercontent.com/Echolonius/the-penniless-agent/main/data/market-history.jsonl | tail -n 1

# the whole history
curl -s https://raw.githubusercontent.com/Echolonius/the-penniless-agent/main/data/market-history.jsonl
```

## Fields

Each line is one day. All money is in US dollars over the **last 30 days**, as measured by the directory.

| Field | Meaning |
|---|---|
| `date` | Day the snapshot was taken (UTC) |
| `services` | Sellers listed in the directory |
| `online` | Sellers answering when the directory last checked |
| `with_sales` | Sellers with at least one paid call |
| `earned_goal` | Sellers that took in **$20 or more**, the experiment's original target |
| `earned_100`, `earned_1000` | Sellers that took in $100+ and $1,000+ |
| `median`, `p75`, `p90` | What the typical seller made, and the top 25% and top 10% cut-offs |
| `total_30d` | All listed sellers combined |
| `total_without_single_buyer` | The same total without sellers the directory flags as paid almost entirely by one buyer |
| `ten_plus_buyers` | Sellers with 10 or more different buyers |

## How it's measured, and the limits

- These are the directory's own measurements: a **conservative floor**. They count only USDC payments through the payment processors it tracks, not every dollar agents spend.
- Some activity on these networks is fake or test traffic. That's why single-buyer sellers are counted separately.
- If the directory is down or returns a partial list, the job skips that day instead of saving bad numbers.
- The code is short and readable: [`scripts/market-scoreboard.mjs`](scripts/market-scoreboard.mjs).

## Using it

Please credit **x402-list.com** as the source of the underlying measurements, and link this repository for the daily series. To cite the report itself, use [CITATION.cff](CITATION.cff). On GitHub, the repo page's "Cite this repository" button generates the citation for you.
