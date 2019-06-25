const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const publicDir = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'production',
  context: srcDir,
  devtool: 'hidden-source-map',
  entry: './index.js',

  output: {
    filename: './js/[name].[chunkhash].js',
    path: publicDir,
    publicPath: './',
    sourceMapFilename: 'main.map'
  },

  devServer: {
    open: true,
    port: 5000,
    contentBase: publicDir,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    openPage: '',
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      title: 'App in prod',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#4285f4',
        description: 'Bienvenid@s, esta aplicación fue construida con Webpack',
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCSSExtractPlugin({
      filename: "./css/styles.css",
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
      whitelistPatterns: [
        /^transition/,
      ]
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
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
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

  resolve: {
    extensions: ['.js', '.jsx']
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    }
  },
};
