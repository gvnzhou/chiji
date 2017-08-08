const Koa = require("koa");
const app = new Koa();
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const router = require('koa-better-router')().loadMethods();
const Promise = require("bluebird");
const readFileAsync = Promise.promisify(fs.readFile);
const serve = require('koa-static-server');
const RES_PATH = path.resolve(__dirname, '../build/');



/**
 * 读取HTML模版，返回cheerio实例
 * @param path
 * @return {Promise.<*>}
 */
async function loadHTMLTemplate(path) {
    try {
        let content = await readFileAsync(path);
        return cheerio.load(content);

    } catch (e) {
        console.error(e);
        return false;
    }
}

//API接口
router.get('/api/todo_list', async(ctx, next) => {

    return ctx.body = ['11', '222'];

});



router.get('/', async(ctx, next) => {

  let $ = await loadHTMLTemplate(path.resolve(__dirname, '../build/index.html'));
  return ctx.body = 'aasdsads';

  if (!$) {
      return ctx.body = null;
  }

  let IndexBundle = require("../build_server/index.bundle.js");

  //fetch接口数据
  // let todoList = await(await fetch('http://localhost:8088/api/todo_list')).json();

  let initialData = {todoList: [2,3,4]};

  let instance = React.createElement(IndexBundle.default, initialData);

  let str = renderToString(instance);

  console.log(111)
  $('#wrap').html(str);

  //前后端数据要同步
  let syncScript = `<script id="server-data">window._SERVER_DATA=${JSON.stringify(initialData)}</script>`;

  $('head').append(syncScript);

  return ctx.body = $.html();

});

app.use(router.middleware());

app.use(function (ctx, next) {

    //如果路由中间件已经有数据了，无需再走静态文件中间件了
    if (ctx.body) {
        return true;
    }

    return next();
});


app.use(serve({rootDir: RES_PATH}));

app.listen(8088, _ => {
    console.log('localhost:8088 is server started')
});