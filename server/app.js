

const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3333, () => {
  console.log("Server is listening at 127.0.0.1:3333")
});