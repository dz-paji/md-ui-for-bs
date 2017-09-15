<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-info text-white">
            {{ $trans('admin.update.info.title') }}
          </div>
          <div class="card-content">
            <transition name="fade">
              <q-progress v-if="fetching" class="indeterminate stripe cyan" />
              <div v-else>
                <div>
                  <span
                    class="label tag bg-positive text-white"
                    v-if="versionStatus === 'up-to-date'"
                  >
                    {{ $trans('admin.update.info.upToDate') }}
                  </span>
                  <span
                    class="label tag bg-primary text-white"
                    v-else
                  >
                    {{ $trans('admin.update.info.available') }}
                  </span>
                  <span
                    class="label tag bg-warning text-white"
                    v-if="isPreRelease"
                  >
                    {{ $trans('admin.update.info.preRelease') }}
                  </span>
                </div>

                <div v-if="versionStatus == 'not-latest'" class="line-margin">
                  <span>
                    {{ $trans('admin.update.info.versions.latest') }}
                  </span>
                  <span>{{ latestVersion }}</span>
                </div>

                <div class="line-margin">
                  <span>
                    {{ $trans('admin.update.info.versions.current') }}
                  </span>
                  <span>{{ currentVersion }}</span>
                </div>

                <div class="line-margin">
                  <span>
                    {{ $trans('admin.update.info.releaseTime') }}
                  </span>
                  <span>{{ readableReleaseTime }}</span>
                </div>

                <div class="line-margin">
                  <div>{{ $trans('admin.update.info.changeLog.text') }}</div>
                  <div v-for="(line, i) in releaseNote.split('\n')" :key="i">
                    <small>{{ line }}</small>
                  </div>
                </div>

                <div class="line-margin">
                  <a target="_blank" href="
                    https://github.com/printempw/blessing-skin-server/releases"
                  >{{ $trans('admin.update.info.checkGithub') }}</a>
                </div>

                <q-progress-button
                  v-if="versionStatus === 'not-latest'"
                  class="primary pull-right btn-margin"
                  @click.native="update()"
                  :percentage="updateProgress"
                  dark-filler
                >
                  {{ updateStateText }}
                </q-progress-button>
              </div>
            </transition>
          </div>
        </div>

        <div class="card">
          <div class="card-title bg-warning text-white">
            {{ $trans('admin.update.cautions.title') }}
          </div>
          <div class="card-content">
            {{ $trans('admin.update.cautions.text') }}
          </div>
        </div>
      </div>

      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-secondary text-white">
            {{ $trans('admin.options.update.title') }}
          </div>
          <div class="card-content">
            <option-item
              first
              :caption="$trans('admin.options.update.checkUpdate.title')"
            >
              <label>
                <q-toggle v-model="checkUpdate" />
                {{ $trans('admin.options.update.checkUpdate.label') }}
              </label>
            </option-item>

            <option-item
              :caption="$trans('admin.options.update.updateSource.title')"
            >
              <input class="full-width" v-model="updateSource" />
              <small v-html="$trans(
                'admin.options.update.updateSource.description',
                {},
                false
              )" />
            </option-item>

            <button class="primary clear pull-right btn-margin" @click="submitConfig">
              {{ $trans('general.submit') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import 'moment/locale/zh-CN'
import BaseSkeleton from './Base'
import OptionItem from '../common/OptionItem'

export default {
  components: {
    BaseSkeleton,
    OptionItem
  },
  data () {
    return {
      checkUpdate: false,
      updateSource: 'https://work.prinzeugen.net/update.json',
      fetching: true,
      versionStatus: '',
      latestVersion: '',
      releaseNote: '',
      isPreRelease: false,
      releastTime: 0,
      updateProgress: 0,
      updateState: 'updateNow'
    }
  },
  computed: {
    ...mapState({
      currentVersion: state => state.site.version
    }),
    readableReleaseTime () {
      const time = moment(this.releastTime, 'X')
      time.locale(this.$store.state.site.locale === 'zh_CN' ? 'zh-CN' : 'en')
      return time.format('LLLL')
    },
    updateStateText () {
      return {
        updateNow: this.$trans('admin.update.info.button'),
        prepare: this.$trans('admin.preparing'),
        downloading: this.$trans('admin.update.download.downloading'),
        extract: this.$trans('admin.extracting')
      }[this.updateState]
    }
  },
  methods: {
    submitConfig () {
      this.$bs('/md/options/update', {
        checkUpdate: this.checkUpdate,
        updateSource: this.updateSource
      })
    },
    async update () {
      if (this.updateProgress !== 0) {
        return void 0
      }

      this.updateState = 'prepare'
      const { file_size: fileSize } =
        await this.$bs('/admin/update/download?action=prepare-download')

      this.updateState = 'downloading'
      this.$bs('/admin/update/download?action=start-download')
        .then(() => (this.updateProgress = 100))

      const interval = setInterval(async () => {
        if (this.updateProgress === 100) {
          clearInterval(interval)
          this.updateState = 'extract'
          await this.$bs('/admin/update/download?action=extract')
          window.location.pathname = '/'
        } else {
          const { size } =
            await this.$bs('/admin/update/download?action=get-file-size')
          this.updateProgress = size / fileSize * 100
        }
      }, 300)
    }
  },
  async beforeMount () {
    const data = await this.$bs('/md/options/update')
    this.checkUpdate = data.checkUpdate
    this.updateSource = data.updateSource

    const updateInfo = await this.$bs('/md/info/update')
    this.releastTime = updateInfo.release_time
    this.latestVersion = updateInfo.version
    if (this.currentVersion === updateInfo.version) {
      this.versionStatus = 'up-to-date'
    } else {
      this.versionStatus = 'not-latest'
      this.releaseNote = updateInfo.release_note
      this.isPreRelease = updateInfo.pre_release
    }
    this.fetching = false
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active
  transition opacity 1.5s

.fade-enter
  opacity 0

.btn-margin
  margin-bottom 10px

.line-margin
  margin-top 15px
</style>
