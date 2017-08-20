<template>
  <q-drawer ref="drawer">
    <div class="list platform-delimiter">
      <user-view />
      <hr>
      <div class="list-label">{{ $trans('general.userCenter') }}</div>
      <div v-for="item in $store.state.menu.user" :key="item.link">
        <q-drawer-link :icon="item.icon" :to="item.link">
          {{ $trans(item.title) }}
        </q-drawer-link>
      </div>
      <hr>
      <div class="list-label">{{ $trans('general.explore') }}</div>
      <q-drawer-link icon="camera" to="/skinlib">
        {{ $trans('general.skinlib') }}
      </q-drawer-link>
      <div v-if="$store.getters.isAdmin">
        <hr>
        <div class="list-label">{{ $trans('general.manage') }}</div>
        <q-drawer-link icon="build" to="/admin">
          {{ $trans('general.adminPanel') }}
        </q-drawer-link>
      </div>
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
