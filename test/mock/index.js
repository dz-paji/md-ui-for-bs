module.exports = {
  '/basic': {
    menu: { user: [], admin: [] },
    site: {
      siteName: 'Blessing Skin Server',
      theme: '#027be3',
      locale: 'en',
      customCopyright: 'Material Design Test',
      bsCopyright: 'Powered by Blessing Skin Server',
      allowChinesePlayerName: true
    },
    user: {
      role: 'admin',
      avatar: '/img/avatar.png',
      nickname: 'gplane'
    }
  },
  '/user-index': {
    score: 1500,
    canSign: true,
    canSignRemainingTime: 0,
    playersUsage: { used: 1, total: 20 },
    storageUsage: { used: 30, total: 100 },
    scoreRule: {
      init: 1000,
      from: 10,
      to: 100,
      isReturn: true,
      perStorage: 50,
      perPlayer: 50
    },
    announcement: '~~Just for test!~~'
  }
}
