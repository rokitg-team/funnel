import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Biome owns linting now (see biome.json). Skip Next's built-in ESLint
  // pass during `next build` so it stops asking us to install eslint.
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'avatar.vercel.sh' }],
  },
  async redirects() {
    return [
      {
        source: '/refs',
        destination: '/sponsors',
        permanent: true,
      },
      {
        source: '/substack',
        destination: '/newsletter',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
