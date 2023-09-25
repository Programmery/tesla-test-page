const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, './static'),
    filename: '[name].[contenthash].bundle.js',
  },

  target: ['web', 'es5', 'browserslist'],

  optimization: {
    emitOnErrors: false,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          mangle: true,
          safari10: true,
          toplevel: true,
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        exclude: /node-modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [['jpegtran', {progressive: true}], ['optipng', {optimizationLevel: 5}], 'imagemin-svgo'],
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|gif|jpg|webp)/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config({path: path.resolve(process.cwd(), '.env.prod')}).parsed),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
  },
});
