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
    this.$store.dispatch('fetchAllBasicInfo')
  }
}
</script>
