import Koa from 'koa';
import koaBetterRouter from 'koa-better-router';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Home from '../client/src/containers/Home/index'

const app = new Koa();
const router = koaBetterRouter().loadMethods();

app.use(router.middleware());

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