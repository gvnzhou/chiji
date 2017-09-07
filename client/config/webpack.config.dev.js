'use strict';

const webpack = require('webpack');
const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
  设置默认常用路径
**/
//srcDir为当前开发目录(默认:/src)
const srcDir = path.resolve(process.cwd(), 'src');
//assetsDir为当前建立目录(默认:/assets)
const assetsDir = path.resolve(process.cwd(), 'assets');
//生成JS的目录地址(默认:)
const jsDir = 'dist/js/';
//生成css的目录地址(默认:)
const cssDir = 'dist/css/';

const config = {
  devtool: 'source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://127.0.0.1:5000/',
      'webpack/hot/dev-server',
      './src'
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: assetsDir,
    filename: jsDir + '[name].js',
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
        loaders: [
          'babel-loader',
          'eslint-loader'
        ]
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
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true, // 如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
      hash: true, // 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      // 允许只添加某些块
      // chunks: [ 
      //   'index', 'vendor', 'manifest'
      // ],
      filename: 'index.html' 
    }),
    new webpack.HotModuleReplacementPlugin(),    
  ]
};

module.exports = config