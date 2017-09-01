const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')
const router = require('./router')

module.exports = (customRouter = {}) => {
  const app = new Koa()
  app.use(serve('assets/dist'))
  app.use(router(customRouter))
  const server = http.createServer(app.callback()).listen(3000)
  return () => server.close()
}
