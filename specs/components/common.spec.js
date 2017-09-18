import Vue from 'vue'
import Vuex from 'vuex'
import Quasar from 'quasar'
import { mount } from 'avoriaz'
import trans from '../../assets/src/utils/i18n'

import AppBar from '../../assets/src/components/common/AppBar.vue'
import OptionItem from '../../assets/src/components/common/OptionItem.vue'

Vue.use(Vuex)
Vue.use(Quasar)
Vue.use(trans)

describe('App Bar', () => {
  const $bs = jasmine.createSpy()
  const store = new Vuex.Store({
    state: {
      site: { locale: 'en' }
    },
    mutations: {
      changeLocale (state, locale) {
        state.site.locale = locale
      }
    }
  })
  const wrapper = mount(AppBar, {
    store,
    globals: { $bs }
  })

  it('should has two locales to be chose', () => {
    expect(wrapper.data().locales).toEqual([
      { label: '中文（简体）', value: 'zh_CN' },
      { label: 'English', value: 'en' }
    ])
  })

  it('drawer-open button should has class "hide-on-drawer-visible"', () => {
    expect(wrapper.find('button')[0].hasClass('hide-on-drawer-visible'))
      .toBe(true)
  })

  it('should has class name "colorful-bar"', () => {
    expect(wrapper.hasClass('colorful-bar')).toBe(true)
  })

  it('should render logout button', () => {
    expect(wrapper.find('button')[1].hasClass('clear')).toBe(true)
  })
})

describe('Option Item', () => {
  const wrapper = mount(OptionItem, {
    propsData: {
      caption: 'caption',
      description: 'description'
    },
    slots: {
      default: 'option'
    }
  })
  const inner = wrapper.find('div')[0]

  it('should have margin style if is not first', () => {
    expect(wrapper.hasStyle('margin-top', '20px')).toBe(true)
  })

  it('should not have margin style if is first', () => {
    wrapper.setProps({ first: true })
    expect(wrapper.hasStyle('margin-top', '20px')).toBe(false)
  })

  it('should render caption', () => {
    expect(inner.find('.caption')[0].text()).toBe('caption')
  })

  it('should render description', () => {
    expect(inner.find('small')[0].text()).toBe('description')
  })
})
