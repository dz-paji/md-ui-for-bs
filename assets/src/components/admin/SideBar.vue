<template>
  <q-drawer ref="drawer">
    <div class="list platform-delimiter">
      <user-view />
      <hr>
      <div class="list-label">{{ $trans('general.adminPanel') }}</div>
      <div v-for="item in $store.state.menu.admin" :key="item.link">
        <q-drawer-link :icon="item.icon" :to="item.link">
          {{ $trans(item.title) }}
        </q-drawer-link>
      </div>
      <hr>
      <div class="list-label">{{ $trans('general.back') }}</div>
      <q-drawer-link icon="account_circle" to="/user">
        {{ $trans('general.userCenter') }}
      </q-drawer-link>
    </div>
  </q-drawer>
</template>

<script>
import UserView from '../common/UserView'

export default {
  components: {
    UserView
  },
  methods: {
    open () {
      this.$refs.drawer.open()
    }
  }
}
</script>
