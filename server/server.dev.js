// Provide custom regenerator runtime and core-js
// require('babel-polyfill')

// Node babel source map support
// 源映射(Source Map)是一种数据格式，它存储了源代码和生成代码之间的位置映射关系。
// require('source-map-support').install()

// Javascript require hook
require('babel-register')({
  presets: ['es2015', 'react', 'stage-2'],
  plugins: ['transform-runtime']
})

// Css require hook
require('css-modules-require-hook')({
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
      require('node-sass').renderSync({
          data,
          file: filename
      }).css,
  camelCase: true,
  generateScopedName: '[name]__[local]__[hash:base64:8]'
})

const app = require('./app.js').default
const webpack = require('webpack')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const config = require('../build/webpack.config.dev')
const compile = webpack(config)

app.use(devMiddleware(compile, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(hotMiddleware(compile, {
  // log: console.log, 
  // path: '/__webpack_hmr', 
  // heartbeat: 10 * 1000 
}))




app.listen(3000);