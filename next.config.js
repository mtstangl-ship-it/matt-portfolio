/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Disk cache + concurrent tooling touching `.next` caused ENOENT pack/manifest flakes locally. */
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      { source: "/thinking", destination: "/case-studies", permanent: true },
      { source: "/work", destination: "/signal-story", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.logo.dev",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
