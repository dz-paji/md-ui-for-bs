export default {
  isAdmin (state) {
    return state.user.role === 'admin' || state.user.role === 'superAdmin'
  }
}
