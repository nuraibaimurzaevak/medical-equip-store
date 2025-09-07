const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        util: require.resolve('util/'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        url: require.resolve('url/'),
        crypto: require.resolve('crypto-browserify'),
        process: require.resolve('process/browser.js'), // 👈 Указан с .js
      };

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser.js', // 👈 Указан с .js
          Buffer: ['buffer', 'Buffer'],
        }),
      ];

      if (!webpackConfig.resolve.extensions.includes('.mjs')) {
        webpackConfig.resolve.extensions.push('.mjs');
      }

      return webpackConfig;
    },
  },
};
