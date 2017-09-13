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
const fs = require('fs')
const path = require('path')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const views = require('koa-views')
const router = require('./routes')
const clientRoute = require('./clientRoute')
const config = require('../config/webpack.config.dev')
const port = process.env.port || 3000
const compile = webpack(config)

// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compile.plugin('emit', (compilation, callback) => {
  const assets = compilation.assets
  let file, data

  Object.keys(assets).forEach(key => {
      if (key.match(/\.html$/)) {
          file = path.resolve(__dirname, key)
          data = assets[key].source()
          fs.writeFileSync(file, data)
      }
  })
  callback()
})

app.use(views(path.resolve(__dirname, '../views/dev'), {map: {html: 'ejs'}}))
app.use(clientRoute)
app.use(router.routes())
app.use(router.allowedMethods())

app.use(devMiddleware(compile, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(hotMiddleware(compile, {
  // log: console.log, 
  // path: '/__webpack_hmr', 
  // heartbeat: 10 * 1000 
}))





app.listen(port);