const Router = require('koa-router')
const router = new Router()

router.get('/md/info/site', ctx => {
  ctx.body = {
    siteName: 'Blessing Skin Server',
    theme: '#027be3',
    locale: 'zh_CN',
    customCopyright: 'Material Design Test',
    bsCopyright: 'Powered by Blessing Skin Server',
    menu: { user: [] },
    announcement: '~~Just for test!~~',
    score: {
      init: 1000,
      from: 10,
      to: 100,
      isReturn: true,
      perStorage: 50,
      perPlayer: 50
    },
    allowChinesePlayerName: true
  }
})

module.exports = router
