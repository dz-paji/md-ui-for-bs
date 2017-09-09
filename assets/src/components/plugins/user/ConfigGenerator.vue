<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title">
            {{ $trans('plugins.configGenerator.title') }}
          </div>
          <div class="card-content">
            <label>
              <q-radio v-model="api" val="csl"></q-radio>
              Custom Skin Loader 13.1+
            </label>
            <label>
              <q-radio v-model="api" val="usm"></q-radio>
              Universal Skin Mod 1.4+
            </label>
            <pre v-highlightjs="configText"><code class="json"></code></pre>
          </div>
        </div>
      </div>

      <div class="width-1of2">
        <div class="card">
          <div class="card-title">CustomSkinLoader ExtraList</div>
          <div class="card-content">
            <div>
              {{ $trans('plugins.configGenerator.extraListNotice') }}
            </div>
            <button
              class="primary pull-right btn-download"
              @click="downloadExtraList"
            >
              <i>get_app</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import Vue from 'vue'
import VueHighlightJs from 'vue-highlightjs'
import 'highlight.js/styles/github.css'
import BaseSkeleton from '../../user/Base'
import title from '../../../mixins/title'

Vue.use(VueHighlightJs)

export default {
  components: {
    BaseSkeleton
  },
  mixins: [title],
  data () {
    return {
      api: 'csl'
    }
  },
  computed: {
    configText () {
      if (this.api === 'csl') {
        return JSON.stringify(
          {
            enable: true,
            loadlist: [
              {
                name: this.$store.state.site.siteName,
                type: 'CustomSkinAPI',
                root: `${this.$store.state.site.siteUrl}/csl/`
              }
            ]
          },
          null,
          2
        )
      } else {
        return JSON.stringify(
          { rootURIs: [`${this.$store.state.site.siteUrl}/usm`] },
          null,
          2
        )
      }
    }
  },
  methods: {
    downloadExtraList () {
      const data = encodeURI(JSON.stringify({
        name: this.$store.state.site.siteName,
        type: 'CustomSkinAPI',
        root: `${this.$store.state.site.siteUrl}/csl/`
      }))
      const el = document.createElement('a')
      el.download = this.$store.state.site.siteName + '.json'
      el.href = `data:application/json,${data}`
      el.click()
    }
  }
}
</script>

<style lang="stylus" scoped>
code
  font-size 14px
  font-family Menlo, Monaco, Consolas, 'Courier New', monospace

.btn-download
  margin-bottom 10px
</style>
