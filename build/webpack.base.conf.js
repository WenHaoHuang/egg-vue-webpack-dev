'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (projectRoot, config) => {
  const loader = require('./lib/loader')(projectRoot, config);
  const baseWebpackConfig = {
    output: {
      path: path.join(projectRoot, config.build.path),
      publicPath: config.build.publicPath,
      filename: '[name].js'
    },
    resolve: {
      extensions: [ '.js', '.vue' ]
    },

    module: {
      rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: projectRoot
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.html$/,
        loader: 'vue-html-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1024,
          name: loader.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1024,
          name: loader.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          vue: {
            loaders: loader.cssLoaders({
              includePaths: config.build.includePaths
            })
          },
          resolveLoader: {
            fallback: [ path.join(projectRoot, 'node_modules') ]
          },
          resolve: {
            fallback: [ path.join(projectRoot, 'node_modules') ]
          }
        }
      }),
    ]
  };
  return baseWebpackConfig;
};
