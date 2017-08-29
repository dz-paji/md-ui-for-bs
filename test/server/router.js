const Router = require('koa-router')
const router = new Router()
const mockData = require('../mock')

module.exports = custom => {
  router.get('/md/info/site', ctx => {
    ctx.body = Object.assign(
      {},
      mockData['/md/info/site'],
      custom['/md/info/site'] || {}
    )
  })

  router.get('/md/info/user', ctx => {
    ctx.body = Object.assign(
      {},
      mockData['/md/info/user'],
      custom['/md/info/user'] || {}
    )
  })

  return router.routes()
}
