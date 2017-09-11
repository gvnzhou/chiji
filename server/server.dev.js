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



const app = require('./app.js')

console.log(1111)
console.log(app)

// app.listen(3333, () => {
//   console.log("Server is listening at 127.0.0.1:3333")
// });