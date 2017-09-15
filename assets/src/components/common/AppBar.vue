<template>
  <div :style="themeColor">
    <button class="hide-on-drawer-visible" @click="openDrawer">
        <i>menu</i>
     </button>
    <q-toolbar-title :padding="0">
      {{ this.$store.state.site.siteName }}
    </q-toolbar-title>
    <q-select
      type="list"
      v-model="lang"
      :options="locales"
    ></q-select>
    <button
      class="clear logout-button"
      :title="$trans('general.logout')"
      @click="logout"
    >
      <i>exit_to_app</i>
    </button>
  </div>
</template>

<script>
import { Dialog } from 'quasar'

export default {
  data () {
    return {
      locales: [
        { label: '中文（简体）', value: 'zh_CN' },
        { label: 'English', value: 'en' }
      ]
    }
  },
  computed: {
    lang: {
      get () {
        return this.$store.state.site.locale
      },
      set (locale) {
        this.$store.commit('changeLocale', locale)
        this.$bs(`/?lang=${locale}`)
      }
    },
    themeColor () {
      return { 'background-color': this.$store.state.site.theme }
    }
  },
  methods: {
    openDrawer () {
      this.$emit('openDrawer')
    },
    logout () {
      Dialog.create({
        title: this.$trans('general.confirmLogout'),
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: async () => {
              await this.$bs('/auth/logout', {})
              setTimeout(() => {
                window.location.pathname = '/'
              }, 1000)
            }
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    }
  },
  beforeMount () {
    document
      .getElementsByTagName('meta')['theme-color']
      .setAttribute('content', this.$store.state.site.theme)
  }
}
</script>

<style lang="stylus" scoped>
.logout-button
  margin-left 15px
</style>
