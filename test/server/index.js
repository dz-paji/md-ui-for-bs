const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')
const router = require('./router')

const app = new Koa()

app.use(serve('assets/dist'))

let server

module.exports = {
  start: (customRouter = {}) => {
    app.use(router(customRouter))
    server = http.createServer(app.callback()).listen(3000)
  },
  close: () => server.close()
}
