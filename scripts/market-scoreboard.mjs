// Daily market scoreboard: can small sellers earn real money from AI agents yet?
// Reads the public x402-list.com directory feed (no key, no account), writes MARKET.md,
// and appends one line per day to data/market-history.jsonl. Plain Node 20+, no dependencies.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'

const ROOT = new URL('..', import.meta.url)
const FEED = 'https://x402-list.com/api/v1/services'
const UA = 'the-penniless-agent market scoreboard (https://github.com/Echolonius/the-penniless-agent)'
const GOAL = 20 // the experiment's original target: $20 a month

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getPage(page, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      const r = await fetch(`${FEED}?page=${page}&per_page=100`, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: AbortSignal.timeout(30000) })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return await r.json()
    } catch (e) {
      if (i === tries) throw new Error(`page ${page}: ${e.message}`)
      await sleep(2000 * i)
    }
  }
}

// Fetch every page politely. Any failure stops the run without touching the published files.
const first = await getPage(1)
let services = [...(first.data || [])]
const pages = first.meta?.total_pages || 1
for (let p = 2; p <= pages; p++) {
  await sleep(1000)
  services = services.concat((await getPage(p)).data || [])
}
if (services.length < 100) throw new Error(`only ${services.length} services returned; refusing to publish a partial scoreboard`)

const t = (s) => s.assessment?.traction || {}
const vol = (s) => Number(t(s).volume_usd_30d) || 0
const buyers = (s) => Number(t(s).unique_buyers_30d) || 0
const sorted = services.map(vol).sort((a, b) => a - b)
const pct = (p) => sorted[Math.floor(p * (sorted.length - 1))]
const count = (f) => services.filter(f).length

const total = sorted.reduce((a, b) => a + b, 0)
const concentrated = services.filter((s) => t(s).concentrated_volume)
const concVol = concentrated.reduce((a, s) => a + vol(s), 0)
const top = [...services].sort((a, b) => vol(b) - vol(a))[0]

const snap = {
  date: new Date().toISOString().slice(0, 10),
  services: services.length,
  online: count((s) => s.status === 'online'),
  with_sales: count((s) => vol(s) > 0),
  earned_goal: count((s) => vol(s) >= GOAL),
  earned_100: count((s) => vol(s) >= 100),
  earned_1000: count((s) => vol(s) >= 1000),
  median: pct(0.5),
  p75: pct(0.75),
  p90: pct(0.9),
  total_30d: total,
  total_without_single_buyer: total - concVol,
  ten_plus_buyers: count((s) => buyers(s) >= 10),
}

// History: one entry per day, replaced if the job reruns the same day.
const histUrl = new URL('data/market-history.jsonl', ROOT)
mkdirSync(new URL('data/', ROOT), { recursive: true })
let history = existsSync(histUrl) ? readFileSync(histUrl, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []
history = history.filter((h) => h.date !== snap.date).concat(snap)
writeFileSync(histUrl, history.map((h) => JSON.stringify(h)).join('\n') + '\n')

const money = (x) => (x < 1 ? `$${x.toFixed(2)}` : `$${Math.round(x).toLocaleString('en-US')}`)
const share = (n, d) => `${((100 * n) / d).toFixed(1)}%`

const byCat = {}
for (const s of services) {
  const c = s.category || 'Other'
  byCat[c] ||= { n: 0, sales: 0, vol: 0, goal: 0 }
  byCat[c].n++
  if (vol(s) > 0) byCat[c].sales++
  if (vol(s) >= GOAL) byCat[c].goal++
  byCat[c].vol += vol(s)
}
const catRows = Object.entries(byCat)
  .sort((a, b) => b[1].vol - a[1].vol)
  .map(([c, v]) => `| ${c} | ${v.n} | ${share(v.sales, v.n)} | ${v.goal} | ${money(v.vol)} |`)
  .join('\n')

const leaders = services
  .filter((s) => vol(s) > 0 && !t(s).concentrated_volume)
  .sort((a, b) => vol(b) - vol(a))
  .slice(0, 8)
  .map((s) => `| ${s.name.replace(/\|/g, '/')} | ${s.category || 'Other'} | ${money(vol(s))} | ${buyers(s).toLocaleString('en-US')} |`)
  .join('\n')

const trend = history
  .slice(-10)
  .reverse()
  .map((h) => `| ${h.date} | ${h.services.toLocaleString('en-US')} | ${h.earned_goal} (${share(h.earned_goal, h.services)}) | ${money(h.median)} | ${money(h.total_without_single_buyer)} |`)
  .join('\n')

const md = `# Market scoreboard: can small sellers earn from AI agents yet?

*Updated ${snap.date} from the public [x402-list.com](https://x402-list.com/) directory. It refreshes itself once a day.*

**The question this tracks:** if you sell something useful to AI agents, paid per use straight to a wallet with no accounts, can you make **$${GOAL} a month**?

## This month

- **${snap.earned_goal} of ${snap.services.toLocaleString('en-US')} sellers (${share(snap.earned_goal, snap.services)}) made $${GOAL} or more** in the last 30 days.
- The typical seller made **${money(snap.median)}**. The top quarter made ${money(snap.p75)} or more, and the top tenth ${money(snap.p90)} or more.
- ${snap.with_sales.toLocaleString('en-US')} sellers (${share(snap.with_sales, snap.services)}) made at least one sale. ${snap.ten_plus_buyers.toLocaleString('en-US')} had 10 or more different buyers.
- All listed sellers together took in **${money(snap.total_30d)}**. Of that, ${money(concVol)} (${share(concVol, total)}) went to ${concentrated.length} sellers that are paid almost entirely by one buyer. The biggest single seller, ${top.name.replace(/\|/g, '/')}, took ${share(vol(top), total)}. Without the single-buyer sellers, the market is **${money(snap.total_without_single_buyer)}** a month.
- **This experiment's own earnings: $0.00** ([why](THREE-MONTHS-LATER.md)).

## What sells

| Category | Sellers | Made a sale | Made $${GOAL}+ | Paid in 30 days |
|---|---|---|---|---|
${catRows}

**Top sellers with many buyers** (sellers paid mostly by one buyer are left out):

| Service | Category | Paid in 30 days | Buyers |
|---|---|---|---|
${leaders}

The pattern as of October 2026: the sellers that earn control something scarce that agents need, like AI models, computing power, web data or payments. Simple utilities that anyone can copy mostly earn pennies.

## Over time

| Date | Sellers listed | Made $${GOAL}+ | Typical seller | Market without single-buyer sellers |
|---|---|---|---|---|
${trend}

## How to read this

- These are the directory's own measurements: a **conservative floor**. They count only USDC payments through the facilitators it tracks, not every dollar agents spend.
- Some payments on these networks are fake or test activity. Single-buyer sellers are reported separately for that reason.
- Raw data is in [data/market-history.jsonl](data/market-history.jsonl). The script that builds this page is [scripts/market-scoreboard.mjs](scripts/market-scoreboard.mjs).
`
writeFileSync(new URL('MARKET.md', ROOT), md)
console.log(`scoreboard written: ${snap.earned_goal}/${snap.services} sellers at $${GOAL}+, median ${money(snap.median)}`)
