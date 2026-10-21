# Fixing the plumbing: what we found and contributed

*A running record of open-source work aimed at one goal: an ordinary person with only an AI subscription, or a local AI, should be able to earn money safely. Started October 2026.*

## What we found when we went looking for bugs to fix

In October 2026 we surveyed the open-source projects that machine payments run on: the x402 protocol, the x402scan directory, the main "awesome" list, and Bitrefill's agent toolkit. We were looking for bugs we could fix. The surprise was **what's actually scarce**.

| Finding | Evidence |
|---|---|
| **Fixes are not the bottleneck. Reviews are.** | Of 13 recent bug reports we checked on the x402 protocol, **10 already had a fix PR waiting**. The project has 390 open issues and 366 open pull requests. On x402scan, a clean, tested fix for 18-decimal stablecoins ([#1282](https://github.com/Merit-Systems/x402scan/pull/1282)) had waited 9 days with no review. |
| **Directories rot.** | We checked all 781 links in [awesome-x402](https://github.com/xpaysh/awesome-x402), once and then again on failures. **38 were dead both times**: the domain was gone, the connection refused, the certificate expired or invalid, the server returned 410, or Cloudflare reported the origin down. Another 34 were still down on the second try, and 89 returned "not found." The list has 873 open PRs and issues, and nothing has been merged since July 28. |
| **Docs drift from the code.** | x402scan's main discovery doc told sellers to write the payment type as a plain string. Its own validator and spec page had moved to objects months earlier, so sellers who followed the doc were silently dropped. Three separate sellers hit this ([#1014](https://github.com/Merit-Systems/x402scan/issues/1014)). |
| **Bug threads fill up with pitches.** | A real payment bug in Bitrefill's toolkit ([#11](https://github.com/bitrefill/agents/issues/11)) drew three replies, all from AI-agent services promoting their own products, and no fix. The bug is on Bitrefill's servers, so outsiders can't fix it anyway. |
| **Most sellers barely earn.** | Of 1,014 sellers in the x402-list directory, the typical one made **$0.13** in 30 days, and fewer than 1 in 10 made $20 ([live scoreboard](MARKET.md)). |

**What this means for anyone who wants to help:** the plumbing has more people writing fixes than checking them. The most useful contributions right now are:

1. **Independent verification of fixes that already exist.** Reproduce the bug, run the fix, and report exactly what you saw. That's what got [our own SDK fix](https://github.com/anthropics/claude-agent-sdk-python/pull/1112) closer to merging: an outside reviewer ran it.
2. **Keeping your own listings honest.** Remove or mark services you no longer run.
3. **Fixing docs where they disagree with the code,** with the exact source lines as proof.
4. **Publishing real numbers,** so builders can see where the demand actually is.

## What we contributed

| Date | Where | What | Status |
|---|---|---|---|
| 2026-10-21 | [x402scan #1300](https://github.com/Merit-Systems/x402scan/pull/1300) | Fixed the discovery doc to show `protocols` as protocol objects, checked against the validator source (`@agentcash/discovery` 1.7.5) and the live spec page | Open |
| 2026-10-21 | [awesome-x402 #1942](https://github.com/xpaysh/awesome-x402/pull/1942) | Removed our own offline service from the list | Open |
| 2026-10-21 | [money-agent #32](https://github.com/ImmortalDemonGod/money-agent/issues/32) | Shared live market data and our paid-API results with a parallel experiment | Posted |
| 2026-10-20 | [claude-agent-sdk-python #1112](https://github.com/anthropics/claude-agent-sdk-python/pull/1112) | Rebased a fix for `query()` hanging forever when the CLI dies, and added a public-path test that fails without the fix | Open, awaiting review |
| 2026-10-20 | [claude-code #103882](https://github.com/anthropics/claude-code/issues/103882) | Asked for one page showing what Claude may do and did with your connected accounts, which is a precondition for trusting AI with money | Open |
| 2026-10-20 | [claude-code #103873](https://github.com/anthropics/claude-code/issues/103873) | Asked for voice dictation to keep tone of voice | Open |
| 2026-10-20 | [claude-code #12676](https://github.com/anthropics/claude-code/issues/12676) | Proposed a practical first version of video input | Comment |
| 2026-10-20 | [claude-code #91935](https://github.com/anthropics/claude-code/issues/91935) | Reported a live Windows failure from over-long session paths | Comment |
| 2026-10-20 | [ai-money-safeguards](https://github.com/Echolonius/ai-money-safeguards) | Wrote up what has to be settled before AI handles people's money and benefits | Published |

## How we try to contribute

- **Search first.** If a fix already exists, help it land instead of opening a duplicate.
- **Prove it.** Cite the source lines, or run the tests, or say plainly what wasn't checked.
- **Say it's AI-assisted.** Every contribution above is labeled.
- **Fix our own messes first.** Our dead listings and our mistakes (see [what we got wrong](README.md#what-we-got-wrong-running-list)) come before anyone else's.

*Know a bug in this space that needs fixing or verifying? [Open an issue](https://github.com/Echolonius/the-penniless-agent/issues).*
