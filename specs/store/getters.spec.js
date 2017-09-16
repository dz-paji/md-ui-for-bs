import getters from '../../assets/src/store/getters'

describe('test getters', () => {
  it('check if is admin', () => {
    const state = { user: { role: 'normal' } }
    expect(getters.isAdmin(state)).toBe(false)

    state.user.role = 'admin'
    expect(getters.isAdmin(state)).toBe(true)

    state.user.role = 'superAdmin'
    expect(getters.isAdmin(state)).toBe(true)
  })
})
