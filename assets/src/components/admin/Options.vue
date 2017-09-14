<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-blue text-white">
            {{ $trans('admin.options.general.title') }}
          </div>
          <div class="card-content">
            <option-item
              first
              :caption="$trans('admin.options.general.siteName')"
            ><input v-model="siteName" class="full-width" /></option-item>

            <option-item
              :caption="$trans('admin.options.general.siteDescription')"
            >
              <input v-model="siteDescription" class="full-width" />
            </option-item>

            <option-item
              :caption="$trans('admin.options.general.siteUrl.title')"
              :hint="$trans('admin.options.general.siteUrl.hint')"
            >
              <input v-model="siteUrl" class="full-width" />
            </option-item>

            <option-item
              :caption="$trans('admin.options.general.userCanRegister.title')"
            >
              <label>
                <q-toggle v-model="userCanRegister" />
                {{ $trans('admin.options.general.userCanRegister.label') }}
              </label>
            </option-item>

            <option-item
              :caption="$trans('admin.options.general.regsPerIp')"
            >
              <q-numeric :min="0" v-model="regsPerIp" />
            </option-item>

            <option-item
              :caption="$trans('admin.options.general.ipGetMethod.title')"
              :hint="$trans('admin.options.general.ipGetMethod.hint')"
            >
              <div class="column group">
                <label>
                  <q-radio v-model="ipGetMethod" val="0"></q-radio>
                  {{ $trans(
                    'admin.options.general.ipGetMethod.httpXForwardedFor'
                  ) }}
                </label>
                <label>
                  <q-radio v-model="ipGetMethod" val="1"></q-radio>
                  {{ $trans('admin.options.general.ipGetMethod.remoteAddr') }}
                </label>
              </div>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.general.maxUploadFileSize.title'
              )"
              :hint="maxUploadHint"
            >
              <q-numeric :min="0" v-model="maxUploadFileSize" /> KB
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.general.allowChinesePlayername.title'
              )"
            >
              <label>
                <q-toggle v-model="allowChinesePlayername" />
                {{
                  $trans('admin.options.general.allowChinesePlayername.label')
                }}
              </label>
            </option-item>

            <option-item
              :caption="$trans('admin.options.general.apiType')"
            >
              <div class="column group">
                <label>
                  <q-radio v-model="apiType" val="0"></q-radio>
                  CustomSkin API
                </label>
                <label>
                  <q-radio v-model="apiType" val="1"></q-radio>
                  UniversalSkin API
                </label>
              </div>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.general.autoDelInvalidTexture.title'
              )"
              :hint="$trans(
                'admin.options.general.autoDelInvalidTexture.hint'
              )"
            >
              <label>
                <q-toggle v-model="autoDelInvalidTexture" />
                {{
                  $trans('admin.options.general.autoDelInvalidTexture.label')
                }}
              </label>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.general.commentScript.title'
              )"
            >
              <textarea v-model="commentScript" class="full-width" rows="6" />
              <small v-html="$trans(
                'admin.options.general.commentScript.description', {}, false
              )"></small>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.general.allowSendingStatistics.title'
              )"
              :hint="$trans(
                'admin.options.general.allowSendingStatistics.hint'
              )"
            >
              <label>
                <q-toggle v-model="allowSendingStatistics" />
                {{
                  $trans('admin.options.general.allowSendingStatistics.label')
                }}
              </label>
            </option-item>

            <button
              class="primary clear pull-right submit-button"
              @click="submitGeneral"
            >
              {{ $trans('general.submit') }}
            </button>
          </div>
        </div>
      </div>

      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-info text-white">
            {{ $trans('admin.options.announcement.title') }}
          </div>
          <div class="card-content">
            <div class="markdown-edit-field">
              <mavon-editor
                v-model="announcement"
                :language="lang"
                default_open="edit"
                class="editor"
              ></mavon-editor>
            </div>
            <div>{{ $trans('admin.options.announcement.description') }}</div>
            <button
              class="primary clear pull-right submit-button"
              @click="submitAnnouncement"
            >
              {{ $trans('general.submit') }}
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-title bg-secondary text-white">
            {{ $trans('admin.options.resources.title') }}
            <small>
              {{ $trans('admin.options.resources.hint') }}
            </small>
          </div>
          <div class="card-content">
            <option-item
              first
              :caption="$trans(
                'admin.options.resources.forceSsl.title'
              )"
              :hint="$trans(
                'admin.options.resources.forceSsl.hint'
              )"
            >
              <label>
                <q-toggle v-model="forceSsl" />
                {{
                  $trans('admin.options.resources.forceSsl.label')
                }}
              </label>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.resources.autoDetectAssetUrl.title'
              )"
              :description="$trans(
                'admin.options.resources.autoDetectAssetUrl.description'
              )"
            >
              <label>
                <q-toggle v-model="autoDetectAssetUrl" />
                {{
                  $trans('admin.options.resources.autoDetectAssetUrl.label')
                }}
              </label>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.resources.return200WhenNotfound.title'
              )"
              :description="$trans(
                'admin.options.resources.return200WhenNotfound.description'
              )"
            >
              <label>
                <q-toggle v-model="return200WhenNotfound" />
                {{
                  $trans('admin.options.resources.return200WhenNotfound.label')
                }}
              </label>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.resources.cacheExpireTime.title'
              )"
              :hint="$trans(
                'admin.options.resources.cacheExpireTime.hint'
              )"
              :description="readableTime"
            >
              <q-numeric :min="0" v-model="cacheExpireTime"></q-numeric> s
            </option-item>

            <button
              class="primary clear pull-right submit-button"
              @click="submitResources"
            >
              {{ $trans('general.submit') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import moment from 'moment'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import BaseSkeleton from './Base'
import OptionItem from '../common/OptionItem'

export default {
  components: {
    BaseSkeleton,
    OptionItem,
    mavonEditor
  },
  data () {
    return {
      phpMaxUpload: '',
      siteName: '',
      siteDescription: '',
      siteUrl: '',
      userCanRegister: true,
      regsPerIp: 0,
      ipGetMethod: 0,
      maxUploadFileSize: 0,
      allowChinesePlayername: true,
      apiType: 0,
      autoDelInvalidTexture: false,
      commentScript: '',
      allowSendingStatistics: true,
      announcement: '',
      forceSsl: false,
      autoDetectAssetUrl: true,
      return200WhenNotfound: false,
      cacheExpireTime: 31536000
    }
  },
  computed: {
    lang () {
      if (this.$store.state.site.locale === 'zh_CN') {
        return 'cn'
      }
      return this.$store.state.site.locale
    },
    maxUploadHint () {
      return this.$trans(
        'admin.options.general.maxUploadFileSize.hint',
        { size: this.phpMaxUpload }
      )
    },
    readableTime () {
      moment.locale(this.$store.state.site.locale === 'zh_CN' ? 'zh-CN' : 'en')
      return moment
        .duration(this.cacheExpireTime, 'seconds')
        .humanize()
    }
  },
  methods: {
    submitGeneral () {
      this.$bs(
        '/md/options/site',
        {
          category: 'general',
          siteName: this.siteName,
          siteDescription: this.siteDescription,
          siteUrl: this.siteUrl,
          userCanRegister: this.userCanRegister,
          regsPerIp: this.regsPerIp,
          ipGetMethod: this.ipGetMethod,
          maxUploadFileSize: this.maxUploadFileSize,
          allowChinesePlayername: this.allowChinesePlayername,
          apiType: this.apiType,
          autoDelInvalidTexture: this.autoDelInvalidTexture,
          commentScript: this.commentScript,
          allowSendingStatistics: this.allowSendingStatistics
        }
      )
    },
    submitAnnouncement () {
      this.$bs(
        '/md/options/site',
        { category: 'announcement', announcement: this.announcement }
      )
    },
    submitResources () {
      this.$bs(
        '/md/options/site',
        {
          category: 'resources',
          forceSsl: this.forceSsl,
          autoDetectAssetUrl: this.autoDetectAssetUrl,
          return200WhenNotfound: this.return200WhenNotfound,
          cacheExpireTime: this.cacheExpireTime
        }
      )
    }
  },
  async beforeMount () {
    const data = await this.$bs('/md/options/site')

    this.phpMaxUpload = data.phpMaxUpload
    this.siteName = data.siteName
    this.siteDescription = data.siteDescription
    this.siteUrl = data.siteUrl
    this.userCanRegister = data.userCanRegister
    this.regsPerIp = data.regsPerIp
    this.ipGetMethod = data.ipGetMethod
    this.maxUploadFileSize = data.maxUploadFileSize
    this.allowChinesePlayername = data.allowChinesePlayername
    this.apiType = this.apiType
    this.autoDelInvalidTexture = data.autoDelInvalidTexture
    this.commentScript = data.commentScript
    this.allowSendingStatistics = data.allowSendingStatistics
    this.announcement = data.announcement
    this.forceSsl = data.forceSsl
    this.autoDetectAssetUrl = data.autoDetectAssetUrl
    this.return200WhenNotfound = data.return200WhenNotfound
    this.cacheExpireTime = data.cacheExpireTime
  }
}
</script>

<style lang="stylus" scoped>
.submit-button
  margin-bottom 15px

.markdown-edit-field
  height 400px

  .editor
    height 100%
    z-index 5
</style>
