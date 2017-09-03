<template>

  <div class="error-page window-height window-width column items-center">

    <div class="error-code flex items-center justify-center">
      404
    </div>

    <div class="error-card card bg-white column items-center justify-center">
      <i class="text-grey-5">error_outline</i>
      <p class="caption text-center">{{ $trans('other.notFound') }}</p>
      <p class="text-center group">
        <button v-if="canGoBack" class="grey push small" @click="goBack">
          <i class="on-left">keyboard_arrow_left</i>
          {{ $trans('general.back') }}
        </button>
        <router-link to="/">
          <button class="grey push small">
            {{ $trans('general.userCenter') }}
            <i class="on-right">home</i>
          </button>
        </router-link>
      </p>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.error-page
  background url('../assets/404.jpg')
  background-repeat no-repeat
  background-size cover
  .error-code
    height 50vh
    width 100%
    padding-top 15vh
    font-size 30vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    margin-top -25px
    width 90vw
    max-width 600px
    padding 50px
    i
      font-size 5rem
</style>
