# Contributing

This is a field report, so the most useful contribution is a correction.

## Report a mistake or a missing blocker

[Open an issue](https://github.com/Echolonius/the-penniless-agent/issues). Say what's wrong, where it is (file and section), and link a source. Corrections count as much as findings, and fixed mistakes are listed in the README's [What we got wrong](README.md#what-we-got-wrong-running-list).

For a security problem, don't open an issue. See [SECURITY.md](SECURITY.md).

## Pull requests

- Small fixes are welcome: a broken link, a typo, a number that's wrong (with a source).
- Don't edit `MARKET.md` or `data/market-history.jsonl` by hand. A daily job rewrites them, so the change would be lost. To change what the scoreboard shows, change [`scripts/market-scoreboard.mjs`](scripts/market-scoreboard.mjs) and say why.
- The field study and the dated updates stay as published. A mistake in them gets a dated correction note next to the claim instead of a rewrite.

## Running the scoreboard in a fork

The job needs no secrets. It reads the public [x402-list.com](https://x402-list.com/) feed and commits two files. In a fork:

1. In a new fork, Actions and scheduled workflows are off. Enable workflows in the fork's **Actions** tab, then open **market-scoreboard** and enable it to run daily, or start it by hand with **Run workflow**.
2. Change the `git config user.name` and `user.email` lines in [`.github/workflows/market-scoreboard.yml`](.github/workflows/market-scoreboard.yml) to your own (GitHub's noreply address works). Otherwise your fork's commits carry this project's address.
3. Change the `UA` line in the script, so the directory sees your project's name instead of this one.

To run it on your own computer instead, you need Node 20 or newer and nothing else: `node scripts/market-scoreboard.mjs`. It rewrites `MARKET.md` and adds today's line to `data/market-history.jsonl`.
