export default {
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
}
