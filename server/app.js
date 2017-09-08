import Koa from 'koa';
import koaBetterRouter from 'koa-better-router';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Home from '../client/containers/Home/index'

import webpack from 'webpack';
import koaWebpackMiddleware from 'koa-webpack-middleware';
import config from '../webpack.config';

const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;

const app = new Koa();
const router = koaBetterRouter().loadMethods();

const compiler = webpack(config);

router.get('/', async(ctx, next) => {
    
    const html = renderToString(<Home />);

    return ctx.body = renderFullPage(html, '');

});

app.use(router.middleware());

app.use(webpackDevMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    reload: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

function renderFullPage(html, initState){
    // const main = JSON.parse(fs.readFileSync(path.join(__dirname,'../webpack/webpack-assets.json'))).javascript.main;
    const main = '/static/index.bundle.js'
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title></title>
        </head>
        <body>
            <div id="root"><div>${html}</div></div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initState)}
            </script>
            <script src=${main}></script>
        </body>
        </html>
    `
}


// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });


app.listen(3333, () => {
    console.log("Server is listening at 127.0.0.1:3333")
});