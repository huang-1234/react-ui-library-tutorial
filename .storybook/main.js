const path = require('path');

module.exports = {
  stories: ['../components/**/*.stories.(tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config, { configType }) => {
    // typescript支持
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    });
    config.resolve.extensions.push('.ts', '.tsx');
    // less支持
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../components'),
    });
    // alias支持
    config.resolve.alias = {
      ...config.resolve.alias,
      'happy-ui/lib': path.resolve(__dirname, '../components'),
      'happy-ui/esm': path.resolve(__dirname, '../components'),
      'happy-ui': path.resolve(__dirname, '../components'),
    };
    return config;
  },
};
