// Dual-rail agent core (USDC + Nano)
import { Rail } from '../rails/rail';
import { USDC } from '../rails/usdc';
import { NanoRail } from '../rails/nano';
import { NanoKeypair } from '../auth/nano-keypair';

export class Agent {
  private usdcRail: USDC;
  private nanoRail: NanoRail;

  constructor(usdcRail: USDC, nanoKeypair: NanoKeypair) {
    this.usdcRail = usdcRail;
    this.nanoRail = new NanoRail(usdcRail.network, nanoKeypair);
  }

  async settle(amount: bigint, destination: string, rail: 'usdc' | 'nano'): Promise<void> {
    if (rail === 'usdc') {
      await this.usdcRail.settle(amount, destination);
    } else if (rail === 'nano') {
      await this.nanoRail.settle(amount, destination);
    } else {
      throw new Error('Invalid rail');
    }
  }
}
