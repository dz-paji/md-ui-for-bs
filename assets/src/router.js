import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/user' },
    {
      path: '/user',
      component: load('user/Index'),
      meta: { title: 'general.dashboard' }
    },
    {
      path: '/user/closet',
      component: load('user/Closet'),
      meta: { title: 'general.myCloset' }
    },
    {
      path: '/user/player',
      component: load('user/Player'),
      meta: { title: 'general.playerManage' }
    },
    {
      path: '/user/profile',
      component: load('user/Profile'),
      meta: { title: 'general.profile' }
    },
    {
      path: '/user/skin-utilities',
      component: load('plugins/user/SkinUtilities'),
      meta: { title: 'plugins.skinUtilities.title' }
    },
    {
      path: '/user/report',
      component: load('plugins/user/UserReport'),
      meta: { title: 'plugins.reportTexture.userSide' }
    },
    {
      path: '/user/config',
      component: load('plugins/user/ConfigGenerator'),
      meta: { title: 'plugins.configGenerator.title' }
    },
    {
      path: '/admin',
      component: load('admin/Index'),
      meta: { title: 'general.dashboard', admin: true }
    },
    {
      path: '/admin/users',
      component: load('admin/Users'),
      meta: { title: 'general.userManage', admin: true }
    },
    {
      path: '/admin/players',
      component: load('admin/Players'),
      meta: { title: 'general.playerManage', admin: true }
    },
    {
      path: '/admin/plugins/manage',
      component: load('admin/Plugins'),
      meta: { title: 'general.pluginManage', admin: true }
    },
    {
      path: '/admin/customize',
      component: load('admin/Customize'),
      meta: { title: 'general.customize', admin: true }
    },
    {
      path: '/admin/score',
      component: load('admin/Score'),
      meta: { title: 'general.scoreOptions', admin: true }
    },
    {
      path: '/admin/options',
      component: load('admin/Options'),
      meta: { title: 'general.options', admin: true }
    },
    {
      path: '/admin/update',
      component: load('admin/Update'),
      meta: { title: 'general.checkUpdate', admin: true }
    },
    {
      path: '/go',
      beforeEnter: to => {
        window.location.pathname = decodeURI(to.query.dst)
      }
    },
    { path: '*', component: load('Error404') } // Not found
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.initialized) {
    await store.dispatch('fetchAllBasicInfo')
  }
  if (to.meta.admin && !store.getters.isAdmin) {
    next('/user')
  } else {
    next()
  }
})

export default router
