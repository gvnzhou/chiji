'use strict';

const webpack = require('webpack');
const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin'),

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
      './src/index.js'
    ]
  },
  output: {
    path: assetsDir,
    filename: jsDir + '[name].js',
    publicPath: '/'
  },
  modules: {
    // 加载器配置
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            // options: {
            //     presets: ['react-hmre']
            // }
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
  ]
};

module.exports = config