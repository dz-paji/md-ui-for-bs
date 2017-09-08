<template>
  <div class="user-view">
    <div class="row">
      <div class="width-1of3">
        <img class="avatar" :src="$store.state.user.avatar">
      </div>
      <div class="auto user-text">
        <div>{{ $store.state.user.nickname }}</div>
        <div>{{ $trans('admin.users.status.' + $store.state.user.role) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.user-view
  margin-top 6%
  margin-left 6%
  padding-bottom 7px

  .avatar
    width 64px
    height 64px

.user-text
  margin-top 15px
</style>
