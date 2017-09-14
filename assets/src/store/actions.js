import { bs } from '../utils/bs-backend'

export default {
  async fetchSite ({ commit }) {
    const { site } = await bs('/md/info/basic')
    commit('updateSite', site)
  },
  async fetchUser ({ commit }) {
    const { user } = await bs('/md/info/basic')
    commit('updateSite', user)
  },
  async fetchMenu ({ commit }) {
    const { menu } = await bs('/md/info/basic')
    commit('updateSite', menu)
  },
  async fetchAllBasicInfo ({ commit }) {
    const { site, user, menu } = await bs('/md/info/basic')
    commit('updateSite', site)
    commit('updateUser', user)
    commit('updateMenu', menu)
  }
}
