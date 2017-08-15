import Koa from 'koa';
import koaBetterRouter from 'koa-better-router';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Home from '../client/containers/Home/index'

import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import config from '../webpack.config';

const app = new Koa();
const router = koaBetterRouter().loadMethods();

const compiler = webpack(config);

function renderFullPage(html, initState){
    // const main = JSON.parse(fs.readFileSync(path.join(__dirname,'../webpack/webpack-assets.json'))).javascript.main;
    const main = '/dist/index.bundle.js'
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>react-ssr</title>
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



router.get('/', async(ctx, next) => {

    const html = renderToString(<Home />);

    return ctx.body = renderFullPage(html, '');

});

app.use(router.middleware());

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.listen(3333, () => {
    console.log("Server is listening at 127.0.0.1:3333")
});