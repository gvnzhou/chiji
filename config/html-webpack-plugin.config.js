//html-webpack-plugin.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['common', 'index'],
        template: path.resolve(__dirname, '../template/base.html'),
        hash: true,
    }),
]
