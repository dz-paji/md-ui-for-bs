import mutations from '../../assets/src/store/mutations'

describe('test mutations', () => {
  it('load menu', () => {
    const state = { menu: { user: [], admin: [] } }

    mutations.updateMenu(state, {
      user: [
        { title: '皮肤工具' },
        { title: '我的举报' },
        { title: 'Blessing\\ConfigGenerator::config.generate-config' }
      ],
      admin: [
        { title: '文件缓存' },
        { title: '举报管理' },
        { title: '批量导入' },
        { title: 'GPlane\\PluginsMarket::general.name' },
        { title: '导入数据' }
      ]
    })

    expect(state.menu).toEqual({
      user: [
        {
          title: 'plugins.skinUtilities.menu',
          icon: 'card_travel',
          link: '/user/skin-utilities'
        },
        {
          title: 'plugins.reportTexture.userSide',
          icon: 'feedback',
          link: '/user/report'
        },
        {
          title: 'plugins.configGenerator.title',
          icon: 'tune',
          link: '/user/config'
        },
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
      ],
      admin: [
        {
          title: 'plugins.profileCache.title',
          icon: 'cached'
        },
        {
          title: 'plugins.reportTexture.adminSide',
          icon: 'feedback'
        },
        {
          title: 'plugins.batchImport.title',
          icon: 'subject'
        },
        {
          title: 'plugins.pluginsMarket.title',
          icon: 'shop'
        },
        {
          title: 'plugins.importData.name',
          icon: 'work',
          link: `/go?dst=${encodeURI('/setup/migrations')}`
        },
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
    })
  })

  it('update site info', () => {
    const state = {
      site: {
        prop1: 'before'
      }
    }

    mutations.updateSite(state, { prop1: 'after', prop2: 'prop2' })

    expect(state).toEqual({
      site: {
        prop1: 'after',
        prop2: 'prop2'
      }
    })
  })

  it('update user info', () => {
    const state = {
      user: {
        prop1: 'before'
      }
    }

    mutations.updateUser(state, { prop1: 'after', prop2: 'prop2' })

    expect(state).toEqual({
      user: {
        prop1: 'after',
        prop2: 'prop2'
      }
    })
  })

  it('change locale', () => {
    const state = {
      site: { locale: 'zh_CN' }
    }

    mutations.changeLocale(state, 'en')

    expect(state).toEqual({ site: { locale: 'en' } })
  })

  it('complete initialization', () => {
    const state = { initialized: false }
    mutations.initialized(state)
    expect(state.initialized).toBe(true)
  })
})
