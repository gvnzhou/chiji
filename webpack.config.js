const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const htmlWebpackPluginConfig = require("./config/html-webpack-plugin.config");
const autoRefresh = require("./config/browser-sync.config");

//入口文件
let entry = {
    index: './client/module/index/index_entry'
};

//浏览器端的配置
let browserConfig = {
    entry,
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/',
      filename: "js/[name].bundle.js",
      chunkFilename: "js/[id].bundle.js"
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.(png|jpe?g|gif)/,
          loader: 'url?limit=1024&name=img/[name].[ext]'
        }, {
          test: /\.(ttf|eot|svg)$/,
          loader: "url?limit=1024&name=fonts/[name].[ext]"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(styl|css)$/,
          loader: ExtractTextPlugin.extract(["vue-style"], "css?sourceMap!autoprefixer!stylus"),
        },
      ]
    },
    plugins:[
      new ExtractTextPlugin('css/[name].css'),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
      }),
      ...htmlWebpackPluginConfig,
      autoRefresh
    ]
};

let serverConfig = {};

Object.assign(serverConfig, browserConfig, {
  output: {
    path: path.join(__dirname, 'build_server'),
    filename: "[name].bundle.js",
    libraryTarget: 'commonjs2' //设置导出类型，web端默认是var，node需要module.exports = xxx的形式
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {                //node端的babel编译配置可以简化很多
          babelrc: "false",
          presets: ['react'],
          plugins: [
            "transform-decorators-legacy",
            "transform-es2015-modules-commonjs" //如果不转换成require，import 'xxx.styl'会报错
          ]
        }
      },
      {
        test: /\.(styl|css)$/,          //node端不能 require('xx.css')，会报错
        loader: 'null'
      },
    ]
  },
  target: 'node',
  externals: [nodeExternals()], //不把node_modules中的文件打包
});

module.exports = [browserConfig, serverConfig];
