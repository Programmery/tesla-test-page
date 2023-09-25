/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    watchFiles: ['./src/*.html'],
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    // publicPath: path.resolve(__dirname, './dist'),
    // chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node-modules/,
        use: {loader: 'ts-loader', options: {transpileOnly: true}},
      },
      {
        test: /\.(s)?css$/,
        exclude: /node-modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {loader: 'postcss-loader'},
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|gif|jpg|webp)/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(
        dotenv.config({path: path.resolve(process.cwd(), '.env.dev')}).parsed,
      ),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
