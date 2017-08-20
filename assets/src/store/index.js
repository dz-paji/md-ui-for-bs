import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: {
      user: []
    },
    site: {
      siteName: '',
      theme: '#027be3',
      locale: 'zh_CN',
      announcement: '',
      customCopyright: '',
      bsCopyright: ''
    },
    user: {
      role: 'normal',
      avatar: '',
      nickname: '',
      score: 0,
      canSign: true,
      canSignRemainingTime: 0,
      playersUsage: { used: 0, total: 0 },
      storageUsage: { used: 0, total: 0 }
    }
  },
  getters: {
    getPlayersPercentage (state) {
      const stat = state.user.playersUsage
      return stat.used / stat.total * 100
    },
    getStoragePercentage (state) {
      const stat = state.user.storageUsage
      return stat.used / stat.total * 100
    },
    isAdmin (state) {
      return state.user.role === 'admin' || state.user.role === 'superAdmin'
    }
  },
  mutations: {
    updateSiteInfo (state, info) {
      const menu = info.menu

      state.menu.user = [
        { title: 'general.dashboard', icon: 'dashboard', link: '/user' },
        { title: 'general.myCloset', icon: 'face', link: '/user/closet' },
        {
          title: 'general.playerManage',
          icon: 'supervisor_account',
          link: '/user/player'
        },
        {
          title: 'general.profile',
          icon: 'contact_mail',
          link: '/user/profile'
        }
      ]
      for (let i = 0; i < menu.user.length; i++) {
        if (!menu.user[i].title.startsWith('general')) {
          state.menu.user.splice(i, 0, {
            title: menu.user[i].title,
            icon: 'polymer',
            link: `/go?dst=${encodeURI(menu.user[i].link)}`
          })
        }
      }
      delete info.menu
      state.site = Object.assign(state.site, info)
    },
    updateUserInfo (state, info) {
      state.user = Object.assign(state.user, info)
    },
    changeLocale (state, locale) {
      state.site.locale = locale
    }
  }
})
