import Router from 'koa-router'
// import user from '../controllers/user'

const router = new Router({prefix: '/user'})

router.get('/getUserInfo', async(ctx, next) => {
  return ctx.body = "asdasdasdas";
})

export default router