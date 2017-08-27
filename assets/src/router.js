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
      path: '/go',
      beforeEnter: to => {
        window.location = '/' + decodeURI(to.query.dst)
      }
    },
    { path: '*', component: load('Error404') } // Not found
  ]
})
