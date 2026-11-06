# Security

## Reporting a problem

Please report security problems privately, through GitHub's [private vulnerability reporting](https://github.com/Echolonius/the-penniless-agent/security/advisories/new), not in a public issue.

Useful reports for this repository include:

- anything that could make the daily job publish wrong data or push something it shouldn't (the [workflow](.github/workflows/market-scoreboard.yml) or the [scoreboard script](scripts/market-scoreboard.mjs));
- signs that the published data or the donation addresses were tampered with;
- anyone impersonating this project, for example with other donation addresses.

Bugs in other projects mentioned here, such as x402 or x402scan, belong with those projects.

## What this repository holds

No secrets: no API keys, no tokens and no wallet keys. The daily job uses only the token GitHub gives every workflow, which it needs to commit the scoreboard. The only donation addresses this project publishes are the ones in [SUPPORT.md](SUPPORT.md).
