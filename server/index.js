import Koa from 'koa';
import koaBetterRouter from 'koa-better-router';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Home from '../client/containers/Home/index'

const app = new Koa();
const router = koaBetterRouter().loadMethods();

// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

router.get('/', async(ctx, next) => {


    return ctx.body = renderToString(<Home />);


});

app.use(router.middleware());

app.listen(3333, () => {
    console.log("Server is listening 127.0.0.1:3333")
});