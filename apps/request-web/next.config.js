const withPlugins = require('next-compose-plugins');
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

// const runtimeCaching = require('next-pwa/cache');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development',
  // runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

/** @type {import('next').NextConfig} */
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@dothis/share'],
  experimental: {
    // See https://github.com/vercel/next.js/issues/42641#issuecomment-1320713368
    outputFileTracingIgnores: ['**swc/core**'],
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },

  eslint: {
    dirs: ['src'],
  },
  compiler: {
    emotion: true,
  },
};

// module.exports = withPlugins([withPWA ,withBundleAnalyzer], nextConfig);
module.exports = withPlugins([withPWA], nextConfig);
