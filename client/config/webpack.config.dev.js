var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
    
    './client/index.js'
  ],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/static/',
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
