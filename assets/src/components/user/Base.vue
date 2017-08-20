<template>
  <q-layout>
    <app-bar
      slot="header"
      class="toolbar"
      @openDrawer="openDrawer"
    ></app-bar>

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

export default {
  components: {
    AppBar,
    BottomBar,
    SideBar
  },
  methods: {
    openDrawer () {
      this.$refs.sideBar.open()
    }
  },
  async beforeMount () {
    this.$bs('/md/info/site').then(
      data => this.$store.commit('updateSiteInfo', data)
    )
    this.$bs('/md/info/user').then(
      data => this.$store.commit('updateUserInfo', data)
    )
  }
}
</script>
