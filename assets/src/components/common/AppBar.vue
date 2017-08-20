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
  </div>
</template>

<script>
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
    }
  },
  beforeMount () {
    document
      .getElementsByTagName('meta')['theme-color']
      .setAttribute('content', this.$store.state.site.theme)
  }
}
</script>
