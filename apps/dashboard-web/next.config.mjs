// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

import nextPWA from 'next-pwa'

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko", 
  },
  experimental: {
    appDir: true,
    transpilePackages: ['@dothis/share'],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    // runtimeCaching,
  },
  compiler:{
    emotion: true,
  }
};
export default config
