export default {
  mounted () {
    document.title
     = `${this.$trans(this.$route.meta.title)} -`
     + `${this.$store.state.site.siteName}`
  }
}
