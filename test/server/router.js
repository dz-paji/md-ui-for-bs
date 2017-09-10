const Router = require('koa-router')
const mockData = require('../mock')

module.exports = custom => {
  const router = new Router({
    prefix: '/md/info'
  })
  router.get('/basic', ctx => {
    ctx.body = Object.assign(
      {},
      mockData['/basic'],
      custom['/basic'] || {}
    )
  })

  router.get('/user-index', ctx => {
    ctx.body = Object.assign(
      {},
      mockData['/user-index'],
      custom['/user-index'] || {}
    )
  })

  return router.routes()
}
