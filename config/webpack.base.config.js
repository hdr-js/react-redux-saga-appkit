/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([
      {
        entry: ['@babel/polyfill', path.resolve(__dirname, '../src')],
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              test: /\.(woff(2)?|ttf|eot|otf|jpe?g|png|gif|svg)$/i,
              loader: 'file-loader'
            },
            {
              test: /\.(scss|css)$/,
              use: [
                PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'sass-loader'
              ]
            }
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './src/index.html'
          }),
          new webpack.DefinePlugin({ 
            'process.env.VERSION': JSON.stringify(env.VERSION),
            'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
          }),
          new webpack.DefinePlugin({
            API_URL: JSON.stringify('http://127.0.0.1'),
            CAPTCHA_KEY: JSON.stringify('6Lf5kXsUAAAAAB2QLEAh966SjtatmFA2VUyy-nAm'),
          }),
        ],
    }
  ])
};
