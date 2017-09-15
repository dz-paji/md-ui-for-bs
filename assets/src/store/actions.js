import { bs } from '../utils/bs-backend'

export default {
  async fetchSite ({ commit }) {
    const { site } = await bs('/md/info/basic')
    commit('updateSite', site)
  },
  async fetchUser ({ commit }) {
    const { user } = await bs('/md/info/basic')
    commit('updateUser', user)
  },
  async fetchMenu ({ commit }) {
    const { menu } = await bs('/md/info/basic')
    commit('updateMenu', menu)
  },
  async fetchAllBasicInfo ({ commit, state }) {
    if (!state.initialized) {
      const { site, user, menu } = await bs('/md/info/basic')
      commit('updateSite', site)
      commit('updateUser', user)
      commit('updateMenu', menu)
      commit('initialized')
    }
  }
}
