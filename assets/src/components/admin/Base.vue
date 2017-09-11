<template>
  <q-layout>
    <app-bar slot="header" class="toolbar" @openDrawer="openDrawer"></app-bar>

    <side-bar ref="sideBar" />

    <div class="layout-view">
      <slot></slot>
    </div>

    <bottom-bar slot="footer"></bottom-bar>
  </q-layout>
</template>

<script>
import AppBar from '../common/AppBar'
import BottomBar from '../common/BottomBar'
import SideBar from './SideBar'
import title from '../../mixins/title'

export default {
  components: {
    AppBar,
    BottomBar,
    SideBar
  },
  mixins: [title],
  methods: {
    openDrawer () {
      this.$refs.sideBar.open()
    }
  },
  async beforeMount () {
    this.$bs('/md/info/basic').then(
      ({ menu, site, user }) => {
        this.$store.commit('updateMenu', menu)
        this.$store.commit('updateSite', site)
        this.$store.commit('updateUser', user)
      }
    )
  }
}
</script>
