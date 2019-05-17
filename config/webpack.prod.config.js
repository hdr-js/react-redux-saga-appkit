/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge');
// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
// Configs
const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
  return merge([
    {
      optimization: {
        minimizer: [new UglifyJsPlugin()],
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: './statistics.html' })
      ],
      // output: {
      //   filename: '[name].[chunkhash].bundle.js',
      //   chunkFilename: '[name].[chunkhash].chunk.bundle.js',
      //   path: path.resolve(__dirname, '..', 'build'),
      //   publicPath: '/',
      // },
    },
  ]);
}

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
}