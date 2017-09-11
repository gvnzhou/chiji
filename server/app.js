import Koa from 'koa';
import koaBetterRouter from 'koa-better-router';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Home from '../client/containers/Home/index'

const app = new Koa();
const router = koaBetterRouter().loadMethods();

function renderFullPage(html, initState){
    // const main = JSON.parse(fs.readFileSync(path.join(__dirname,'../webpack/webpack-assets.json'))).javascript.main;
    const index = '/public/static/js/index.js'
    const vendor = '/public/static/js/vendor.js'
    const manifest = '/public/static/js/manifest.js'
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title></title>
            <link href="/public/static/css/style.css" rel="stylesheet"></head>
        </head>
        <body>
            <div id="root"><div>${html}</div></div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initState)}
            </script>
            <script src=${manifest}></script>
            <script src=${vendor}></script>
            <script src=${index}></script>
        </body>
        </html>
    `
}

router.get('/', async(ctx, next) => {
    
    const html = renderToString(<Home />);

    return ctx.body = renderFullPage(html, '');

});

app.use(router.middleware());

// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

export default app;

