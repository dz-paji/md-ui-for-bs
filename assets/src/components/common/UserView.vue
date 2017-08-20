<template>
  <div class="user-view">
    <img class="avatar" :src="$store.state.user.avatar">
    <br>
    <span>{{ $store.state.user.nickname }}</span>
    <br>
    <span>{{ $trans('admin.users.status.' + $store.state.user.role) }}</span>
  </div>
</template>

<style lang="stylus" scoped>
.user-view
  margin-top 6%
  margin-left 6%

  .avatar
    width 64px
    height 64px
</style>
