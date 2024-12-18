const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);



module.exports = {
  core: {
    builder: 'webpack5',
  },
  features: { storyStoreV7: true,  babelModeV7: true, },
  stories: [
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  staticDir: ['../public'],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: (config) => {
    config.module.rules = config.module.rules ?? [];
    config.resolve.plugins = config.resolve.plugins ?? [];

    config.resolve.plugins.push(new TsconfigPathsPlugin());
    
    // Fix issue between Chakra UI and storybook
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('node_modules/@emotion/react'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };

    // Babel config
    config.module.rules.push({
      test: /\.([j|t]sx?)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: ['next/babel'],
      },
    });

    // Fix Framer Motion v5 issue
    // https://github.com/framer/motion/issues/1307#issuecomment-966827629
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/,
    });

    return config;
  },
}