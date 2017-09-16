import { mount } from 'avoriaz'

import AppBar from '../../assets/src/components/common/AppBar.vue'
import BottomBar from '../../assets/src/components/common/BottomBar.vue'
import SideBar from '../../assets/src/components/user/SideBar.vue'
import Base from '../../assets/src/components/user/Base.vue'

describe('Base skeleton', () => {
  const wrapper = mount(Base)

  it('should contains other components', () => {
    expect(wrapper.contains(AppBar)).toBe(true)
    expect(wrapper.contains(BottomBar)).toBe(true)
    expect(wrapper.contains(SideBar)).toBe(true)
  })
})
