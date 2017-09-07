//加载webpack模块
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//加载webpack配置文件
const config = require('./webpack.config.dev');
//载入默认配置
const common = require('../../common.json');

var creatServer = () => {
    //调用webpack热加载模块及对应参数
    let app = new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true // 用颜色标识
        }
    });
    //调用开启端口用来测试和开发
    app.listen(common.clientPort, function(err) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + common.clientPort);
    });
};

creatServer();