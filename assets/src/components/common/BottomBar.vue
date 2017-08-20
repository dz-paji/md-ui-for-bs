<template>
  <div class="footer-text-bar" :style="themeColor">
    <span v-html="$store.state.site.customCopyright"></span>
    <span
      class="text-float-right lt-md-hide"
      v-html="$store.state.site.bsCopyright"
    ></span>
  </div>
</template>

<script>
export default {
  computed: {
    themeColor () {
      return { 'background-color': this.$store.state.site.theme }
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer-text-bar
  padding 7px 15px 7px 15px

  .text-float-right
    float right
</style>
