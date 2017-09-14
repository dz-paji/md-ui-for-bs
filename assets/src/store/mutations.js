import transformMenu from '../utils/menus'

export default {
  updateMenu (state, menu) {
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

    state.menu.admin = [
      { title: 'general.dashboard', icon: 'dashboard', link: '/admin' },
      {
        title: 'general.userManage',
        icon: 'supervisor_account',
        link: '/admin/users'
      },
      {
        title: 'general.playerManage',
        icon: 'videogame_asset',
        link: '/admin/players'
      },
      {
        title: 'general.pluginManage',
        icon: 'extension',
        link: '/admin/plugins/manage'
      },
      {
        title: 'general.customize',
        icon: 'perm_media',
        link: '/admin/customize'
      },
      {
        title: 'general.scoreOptions',
        icon: 'credit_card',
        link: '/admin/score'
      },
      {
        title: 'general.options',
        icon: 'settings',
        link: '/admin/options'
      },
      {
        title: 'general.checkUpdate',
        icon: 'network_wifi',
        link: '/admin/update'
      }
    ]
    for (let i = 0; i < menu.admin.length; i++) {
      if (!menu.admin[i].title.startsWith('general')) {
        state.menu.admin.splice(i, 0, transformMenu(menu.admin[i]))
      }
    }
  },
  updateSite (state, info) {
    state.site = Object.assign(state.site, info)
  },
  updateUser (state, info) {
    state.user = Object.assign(state.user, info)
  },
  changeLocale (state, locale) {
    state.site.locale = locale
  }
}
