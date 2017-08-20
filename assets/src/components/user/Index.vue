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
                    <b>{{ playersUsed }}</b>
                     / {{ playersTotal }}
                  </span>
                </div>
                <q-progress
                  :percentage="$store.getters.getPlayersPercentage"
                  class="info"
                ></q-progress>

                <div>
                  {{ $trans('user.used.storage') }}
                  <span class="progress-number">
                    <span v-if="storageUsed > 1024">
                      <b>{{ round(storageUsed) }}</b>
                      / {{ round(storageTotal) }} MB
                    </span>
                    <span v-else>
                      <b>{{ storageUsed }}</b>
                      / {{ storageTotal }} KB
                    </span>
                  </span>
                </div>
                <q-progress
                  :percentage="$store.getters.getStoragePercentage"
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
            <vue-markdown :source="$store.state.site.announcement"></vue-markdown>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog, Toast } from 'quasar'
import VueMarkdown from 'vue-markdown'
import BaseSkeleton from './Base'

export default {
  components: {
    BaseSkeleton,
    VueMarkdown
  },
  computed: {
    signButtonText () {
      if (this.canSign) {
        return this.$trans('user.sign')
      } else {
        const remain = this.$store.state.user.canSignRemainingTime
        return this.$trans('user.signRemainingTime', remain >= 1
          ? { time: remain.toString(), unit: this.$trans('user.timeUnitHour') }
          : {
            time: (remain * 60).toFixed(),
            unit: this.$trans('user.timeUnitMin')
          })
      }
    },
    ...mapState({
      playersUsed: state => state.user.playersUsage.used,
      playersTotal: state => state.user.playersUsage.total,
      storageUsed: state => state.user.storageUsage.used,
      storageTotal: state => state.user.storageUsage.total,
      score: state => state.user.score,
      canSign: state => state.user.canSign
    })
  },
  methods: {
    async sign () {
      const result = await this.$bs('/user/sign', {})
      if (result.errno !== 0) {
        return Toast.create.warning(result.msg)
      }
      Toast.create.positive(result.msg)
      this.$store.commit(
        'updateUserInfo',
        {
          storageUsage: {
            used: result.storage.used,
            total: result.storage.total
          },
          score: result.score,
          canSign: false,
          canSignRemainingTime: result.remaining_time
        }
      )
    },
    showScoreIntro () {
      Dialog.create({
        title: this.$trans('user.scoreIntro.title'),
        message: this.$trans(
          'user.scoreIntro.introduction',
          {
            returnScore: this.$store.state.site.score.isReturn
              ? this.$trans('user.scoreIntro.willReturnScore')
              : this.$trans('user.scoreIntro.noReturnScore'),
            initialScore: this.$store.state.site.score.init,
            scoreFrom: this.$store.state.site.score.from,
            scoreTo: this.$store.state.site.score.to
          }
        ) + ' Note: ' +
        this.$trans(
          'user.scoreIntro.rates.storage',
          { score: this.$store.state.site.score.perStorage }
        ) + ', ' +
        this.$trans(
          'user.scoreIntro.rates.player',
          { score: this.$store.state.site.score.perPlayer }
        )
      })
    }
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
