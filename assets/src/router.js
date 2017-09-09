import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

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
      path: '/go',
      beforeEnter: to => {
        window.location.pathname = decodeURI(to.query.dst)
      }
    },
    { path: '*', component: load('Error404') } // Not found
  ]
})
