// Nano (XNO) settlement rail
import { Rail } from './rail';
import { NanoKeypair } from '../auth/nano-keypair';
import { Network } from '../network/network';

interface NanoTransaction {
  account: string;
  amount: string; // Raw XNO amount (no decimals)
  destination: string;
  signature: string;
}

export class NanoRail implements Rail {
  private network: Network;
  private keypair: NanoKeypair;

  constructor(network: Network, keypair: NanoKeypair) {
    this.network = network;
    this.keypair = keypair;
  }

  async settle(amount: bigint, destination: string): Promise<void> {
    if (amount <= 0n) throw new Error('Invalid Nano amount');
    const tx = await this._buildTransaction(amount, destination);
    await this.network.broadcastNano(tx);
  }

  private async _buildTransaction(amount: bigint, destination: string): Promise<NanoTransaction> {
    const rawAmount = amount.toString(); // Nano has no decimals
    const message = `${this.keypair.account}:${destination}:${rawAmount}`;
    const signature = await this.keypair.sign(message);
    return {
      account: this.keypair.account,
      amount: rawAmount,
      destination,
      signature,
    };
  }
}
