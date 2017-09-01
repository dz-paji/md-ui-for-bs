const Router = require('koa-router')
const mockData = require('../mock')

module.exports = custom => {
  const router = new Router({
    prefix: '/md/info'
  })
  router.get('/site', ctx => {
    ctx.body = Object.assign(
      {},
      mockData['/site'],
      custom['/site'] || {}
    )
  })

  router.get('/user', ctx => {
    ctx.body = Object.assign(
      {},
      mockData['/user'],
      custom['/user'] || {}
    )
  })

  return router.routes()
}
