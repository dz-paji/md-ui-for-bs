const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')
const router = require('./router')

const app = new Koa()

app.use(serve('assets/dist'))
app.use(router.routes())

module.exports = http.createServer(app.callback()).listen(3000)
