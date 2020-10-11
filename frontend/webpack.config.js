/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');

const { isProduction, addIfProd, addIfDev } = require('./env');

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'inline-cheap-module-source-map',
  entry: [...addIfDev(['react-hot-loader/patch']), './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ...addIfDev({
        'react-dom': '@hot-loader/react-dom',
      }),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        loaders: [...addIfDev(['style-loader']), ...addIfProd([MiniCssExtractPlugin.loader]), 'css-loader'],
      },
      { test: /\.md/, loaders: ['html-loader', 'markdown-loader'] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BACKEND_BASE_PATH': JSON.stringify(process.env.BACKEND_BASE_PATH),
      'process.env.BACKEND_PORT': JSON.stringify(process.env.BACKEND_PORT),
    }),
    new webpack.EnvironmentPlugin(['BACKEND_BASE_PATH', 'BACKEND_PORT']),
    new HtmlWebpackPlugin({
      title: 'telegram-finance-control',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
    }),
    ...addIfDev([new ErrorOverlayPlugin()]),
    ...addIfProd([
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
    ]),
  ],
  ...addIfProd({
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    },
  }),
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
