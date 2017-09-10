<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-2of3">
        <div class="card">
          <div class="card-title">
            {{ $trans('user.used.title') }}
          </div>
          <div class="card-content">
            <div class="row gutter sm-column">
              <div class="width-2of3">

                <div>
                  {{ $trans('user.used.players') }}
                  <span class="progress-number">
                    <b>{{ playersUsage.used }}</b>
                     / {{ playersUsage.total }}
                  </span>
                </div>
                <q-progress
                  :percentage="getPlayersPercentage"
                  class="info"
                ></q-progress>

                <div>
                  {{ $trans('user.used.storage') }}
                  <span class="progress-number">
                    <span v-if="storageUsed > 1024">
                      <b>{{ (storageUsed / 1024).toFixed(2) }}</b>
                      / {{ (storageTotal / 1024).toFixed(2) }} MB
                    </span>
                    <span v-else>
                      <b>{{ storageUsage.used }}</b>
                      / {{ storageUsage.total }} KB
                    </span>
                  </span>
                </div>
                <q-progress
                  :percentage="getStoragePercentage"
                  class="warning"
                ></q-progress>

              </div>

              <div class="auto">
                <div class="text-center">
                  {{ $trans('user.curScore') }}
                </div>
                <div id="score" class="text-center" @click="showScoreIntro">
                  {{ score }}
                </div>
                <div class="text-center score-notice">{{ $trans('user.scoreNotice') }}</div>
              </div>
            </div>

            <button
              class="primary"
              :class="{ disabled: !canSign }"
              :disabled="!canSign"
              @click="sign">
              {{ signButtonText }}
            </button>
          </div>
        </div>
      </div>
      <div class="auto">
        <div class="card">
          <div class="card-title">
            {{ $trans('user.announcement') }}
          </div>
          <div class="card-content">
            <vue-markdown :source="announcement"></vue-markdown>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import { Dialog } from 'quasar'
import VueMarkdown from 'vue-markdown'
import BaseSkeleton from './Base'
import title from 'src/mixins/title'

export default {
  components: {
    BaseSkeleton,
    VueMarkdown
  },
  mixins: [title],
  computed: {
    signButtonText () {
      if (this.canSign) {
        return this.$trans('user.sign')
      } else {
        const remain = this.canSignRemainingTime
        return this.$trans('user.signRemainingTime', remain >= 1
          ? { time: remain.toString(), unit: this.$trans('user.timeUnitHour') }
          : {
            time: (remain * 60).toFixed(),
            unit: this.$trans('user.timeUnitMin')
          })
      }
    },
    getPlayersPercentage () {
      return this.playersUsage.used / this.playersUsage.total * 100
    },
    getStoragePercentage () {
      return this.storageUsage.used / this.storageUsage.total * 100
    }
  },
  methods: {
    async sign () {
      const {
        score,
        remaining_time: canSignRemainingTime,
        storage
      } = await this.$bs('/user/sign', {})

      this.score = score
      this.canSign = false
      this.canSignRemainingTime = canSignRemainingTime
      this.storageUsage = storage
    },
    showScoreIntro () {
      Dialog.create({
        title: this.$trans('user.scoreIntro.title'),
        message: this.$trans(
          'user.scoreIntro.introduction',
          {
            returnScore: this.scoreRule.isReturn
              ? this.$trans('user.scoreIntro.willReturnScore')
              : this.$trans('user.scoreIntro.noReturnScore'),
            initialScore: this.scoreRule.init,
            scoreFrom: this.scoreRule.from,
            scoreTo: this.scoreRule.to
          }
        ) + ' Note: ' +
        this.$trans(
          'user.scoreIntro.rates.storage',
          { score: this.scoreRule.perStorage }
        ) + ', ' +
        this.$trans(
          'user.scoreIntro.rates.player',
          { score: this.scoreRule.perPlayer }
        )
      })
    }
  },
  data () {
    return {
      score: 0,
      canSign: true,
      canSignRemainingTime: 0,
      playersUsage: { used: 0, total: 0 },
      storageUsage: { used: 0, total: 0 },
      announcement: '',
      scoreRule: {
        init: 0,
        from: 0,
        to: 0,
        isReturn: false,
        perStorage: 0,
        perPlayer: 0
      }
    }
  },
  async beforeMount () {
    const {
      score,
      canSign,
      canSignRemainingTime,
      playersUsage,
      storageUsage,
      announcement
    } = await this.$bs('/md/info/user-index')

    this.score = score
    this.canSign = canSign
    this.canSignRemainingTime = canSignRemainingTime
    this.playersUsage = playersUsage
    this.storageUsage = storageUsage
    this.announcement = announcement
  }
}
</script>

<style lang="stylus" scoped>
.progress-number
  float right

.score-notice
  margin-top 20px
  font-size smaller

#score
  font-size 50px
  text-align center
  margin-top 20px
  cursor help
</style>
