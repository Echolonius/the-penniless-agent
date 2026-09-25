// Nano key management (no signup, deterministic)
import { Keypair } from 'nano-keypair';

export class NanoKeypair {
  private _keypair: Keypair;

  constructor(seed?: string) {
    this._keypair = seed ? Keypair.fromSeed(seed) : Keypair.generate();
  }

  get account(): string {
    return this._keypair.accountId;
  }

  async sign(message: string): Promise<string> {
    return this._keypair.sign(message);
  }
}
