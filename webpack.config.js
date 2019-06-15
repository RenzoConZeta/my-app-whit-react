const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, 'src');
const publicDir = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'development',
  context: srcDir,
  devtool: 'eval',
  entry: './index.js',

  output: {
    filename: '[name].[hash].js',
    path: publicDir,
    publicPath: './',
    sourceMapFilename: 'main.map',
  },

  devServer: {
    open: true,
    port: 5000,
    contentBase: publicDir,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    openPage: '',
    stats: 'errors-only',
    hot: true,
    hotOnly: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|txt|xml)$/,
        use: 'file-loader?name=[path][name].[ext]'
      },
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },

  watchOptions: {
    ignored: /node_modules/,
  },
};
