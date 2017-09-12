const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = {
  devtool: 'eval-source-map',
  // context: path.resolve(__dirname, '..'),
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000',

      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/'

  },
  module: {
    // 加载器配置
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2', 'react-hmre'],
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查
        include: /src/,  // src文件夹下的文件需要被lint
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')   // 编译后错误报告格式
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },
  
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: true, // 如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
      hash: true, // 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      // 允许只添加某些块
      chunks: [ 
        'index', 'vendor', 'manifest'
      ],
      filename: 'index.html' 
    }),
    new ProgressBarPlugin({summary: false}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin() 
  ]
};

module.exports = config