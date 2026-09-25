# USDC ↔ Nano (XNO) Bridging

## Overview
Use [nanswap.com](https://nanswap.com) to convert between USDC and Nano (XNO) for seamless dual-rail operations.

## Conversion Flow
1. **USDC → XNO**: Deposit USDC to nanswap.com, receive XNO.
2. **XNO → USDC**: Send XNO to nanswap.com, withdraw USDC.

## Agent Integration
```typescript
// Example: Convert USDC bounty to XNO for P2P payments
const usdcAmount = 100n; // 100 USDC
const xnoAmount = await convertUSDCtoXNO(usdcAmount); // Hypothetical bridge call
await agent.settle(xnoAmount, 'nano_destination', 'nano');
```

## Notes
- Nano transactions are **instant and feeless**.
- Use `nano-keypair.js` for deterministic key generation (no signup).
- Monitor [agent-conversations](https://github.com/PANDeveloper001/agent-conversations) for research.
