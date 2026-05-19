import { createPublicClient, getAddress, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

const ENS_NAME = 'rokitg.eth';
const ENS_ADDRESS = '0xc7BcB2EeE9BbFbf875499960746Bc52B2E1A75C6';
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL ?? 'https://eth.llamarpc.com';
const ENS_TIMEOUT_MS = 2500;

export type EnsVerification = {
  ensName: string;
  address: string;
  resolvedAddress: string | null;
  primaryName: string | null;
  verified: boolean;
};

const client = createPublicClient({
  chain: mainnet,
  transport: http(ETHEREUM_RPC_URL),
});

export async function getRokitEnsVerification(): Promise<EnsVerification> {
  const address = getAddress(ENS_ADDRESS);
  const fallback: EnsVerification = {
    ensName: ENS_NAME,
    address,
    resolvedAddress: null,
    primaryName: null,
    verified: false,
  };

  try {
    const name = normalize(ENS_NAME);
    const [resolvedAddress, primaryName] = await Promise.race([
      Promise.all([client.getEnsAddress({ name }), client.getEnsName({ address })]),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('ENS verification timed out')), ENS_TIMEOUT_MS),
      ),
    ]);

    const normalizedResolved = resolvedAddress ? getAddress(resolvedAddress) : null;
    const verified =
      normalizedResolved === address &&
      Boolean(primaryName) &&
      primaryName?.toLowerCase() === ENS_NAME.toLowerCase();

    return {
      ensName: ENS_NAME,
      address,
      resolvedAddress: normalizedResolved,
      primaryName,
      verified,
    };
  } catch {
    return fallback;
  }
}
