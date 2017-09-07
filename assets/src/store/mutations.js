import transformMenu from '../utils/menus'

export default {
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
        state.menu.user.splice(i, 0, transformMenu(menu.user[i]))
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
