// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  // async headers() {
  //   return [
  //     {
  //       // Append the "Service-Worker-Allowed" header
  //       // to each response, overriding the default worker's scope.
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Service-Worker-Allowed',
  //           value: '/',
  //         },
  //       ],
  //     },
  //   ];
  // },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@svgr/webpack',
            options: { babel: false },
          },
        ],
      },
    );
    return config;
  },
  experimental: {
    // See https://github.com/vercel/next.js/issues/42641#issuecomment-1320713368
    outputFileTracingIgnores: ['**swc/core**'],
    appDir: true,
    transpilePackages: ['@dothis/share'],
  },
};
export default config;
