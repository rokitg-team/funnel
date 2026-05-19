import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';
import { flagDefinitions } from '@/flags';

export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flagDefinitions));
