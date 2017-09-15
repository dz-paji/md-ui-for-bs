<template>
  <div class="footer-text-bar colorful-bar" :style="themeColor">
    <span v-html="customCopyright"></span>
    <span
      class="pull-right lt-md-hide"
      v-html="bsCopyright"
    ></span>
  </div>
</template>

<script>
export default {
  computed: {
    themeColor () {
      return { 'background-color': this.$store.state.site.theme }
    },
    customCopyright () {
      return this.$store.state.site.customCopyright.replace(
        '<a ',
        '<a style="color: #fff"'
      )
    },
    bsCopyright () {
      return this.$store.state.site.bsCopyright.replace(
        '<a ',
        '<a style="color: #fff"'
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer-text-bar
  padding 7px 15px 7px 15px
</style>
