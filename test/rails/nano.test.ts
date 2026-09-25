// Nano rail unit tests
import { NanoRail } from '../../src/rails/nano';
import { NanoKeypair } from '../../src/auth/nano-keypair';
import { MockNetwork } from '../mocks/network';

describe('NanoRail', () => {
  let rail: NanoRail;
  let network: MockNetwork;

  beforeEach(() => {
    network = new MockNetwork();
    const keypair = new NanoKeypair();
    rail = new NanoRail(network, keypair);
  });

  it('should reject zero/negative amounts', async () => {
    await expect(rail.settle(0n, 'nano_1abc')).rejects.toThrow('Invalid Nano amount');
  });

  it('should broadcast valid transactions', async () => {
    await rail.settle(1000000000000000000000n, 'nano_1abc');
    expect(network.broadcastNano).toHaveBeenCalled();
  });
});
