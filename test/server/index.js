const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')
const router = require('./router')

const app = new Koa()

app.use(serve('assets/dist'))

module.exports = (customRouter = {}) => {
  app.use(router(customRouter))
  const server = http.createServer(app.callback()).listen(3000)
  return () => server.close()
}
