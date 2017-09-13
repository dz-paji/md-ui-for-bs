<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-primary text-white">
            {{ $trans('admin.options.rate.title') }}
          </div>
          <div class="card-content">
            <div>
              <div class="caption">
                {{ $trans('admin.options.rate.scorePerStorage.title') }}
              </div>
              <q-numeric v-model="scorePerStorage" :min="0" />
              <span>
                {{ $trans('admin.options.rate.scorePerStorage.addon') }}
              </span>
            </div>

            <div class="option-margin">
              <div class="caption">
                {{ $trans('admin.options.rate.privateScorePerStorage.title') }}
              </div>
              <q-numeric v-model="privateScorePerStorage" :min="0" />
              <span>
                {{ $trans('admin.options.rate.privateScorePerStorage.addon') }}
              </span>
              <q-tooltip anchor="bottom middle" self="top middle">
                {{ $trans('admin.options.rate.privateScorePerStorage.hint') }}
              </q-tooltip>
            </div>

            <div class="option-margin">
              <div class="caption">
                {{ $trans('admin.options.rate.scorePerClosetItem.title') }}
              </div>
              <q-numeric v-model="scorePerClosetItem" :min="0" />
              <span>
                {{ $trans('admin.options.rate.scorePerClosetItem.addon') }}
              </span>
            </div>

            <div class="option-margin">
              <div class="caption">
                {{ $trans('admin.options.rate.returnScore.title') }}
              </div>
              <label>
                <q-toggle v-model="returnScore"></q-toggle>
                {{ $trans('admin.options.rate.returnScore.label') }}
              </label>
            </div>

            <div class="option-margin">
              <div class="caption">
                {{ $trans('admin.options.rate.scorePerPlayer.title') }}
              </div>
              <q-numeric v-model="scorePerPlayer" :min="0" />
              <span>
                {{ $trans('admin.options.rate.scorePerPlayer.addon') }}
              </span>
            </div>

            <div class="option-margin">
              <div class="caption">
                {{ $trans('admin.options.rate.userInitialScore.title') }}
              </div>
              <q-numeric v-model="userInitialScore" :min="0" />
            </div>

            <button
              class="primary clear pull-right btn-margin"
              @click="submitRate"
            >
              {{ $trans('general.submit') }}
            </button>
          </div>
        </div>
      </div>

      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-primary text-white">
            {{ $trans('admin.options.sign.title') }}
          </div>
          <div class="card-content">
            <div>
              <div class="caption">
                {{ $trans('admin.options.sign.signScore.title') }}
              </div>
              <q-numeric v-model="signMin" :min="0" />
              <span>{{ $trans('admin.options.sign.signScore.addon1') }}</span>
              <q-numeric v-model="signMax" />
              <span>{{ $trans('admin.options.sign.signScore.addon2') }}</span>
            </div>

            <div class="option-margin">
              <div class="caption">
                {{ $trans('admin.options.sign.signGapTime.title') }}
              </div>
              <q-numeric v-model="signGapTime" :min="0" />
              <span>{{ $trans('admin.options.sign.signGapTime.addon') }}</span>
            </div>

            <div class="option-margin">
              <div class="caption">
                {{ $trans('admin.options.sign.signAfterZero.title') }}
              </div>
              <label>
                <q-toggle v-model="signAfterZero"></q-toggle>
                {{ $trans('admin.options.sign.signAfterZero.label') }}
                <q-tooltip anchor="bottom middle" self="top middle">
                  {{ $trans('admin.options.sign.signAfterZero.hint') }}
                </q-tooltip>
              </label>
            </div>

            <button
              class="primary clear pull-right btn-margin"
              @click="submitSign"
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
import BaseSkeleton from './Base'
export default {
  components: {
    BaseSkeleton
  },
  data () {
    return {
      scorePerStorage: 0,
      privateScorePerStorage: 0,
      scorePerClosetItem: 0,
      returnScore: true,
      scorePerPlayer: 0,
      userInitialScore: 0,
      signMin: 0,
      signMax: 0,
      signGapTime: 0,
      signAfterZero: false
    }
  },
  methods: {
    submitRate () {
      this.$bs('/md/options/score', {
        category: 'rate',
        scorePerStorage: this.scorePerStorage,
        privateScorePerStorage: this.privateScorePerStorage,
        scorePerClosetItem: this.scorePerClosetItem,
        returnScore: this.returnScore,
        scorePerPlayer: this.scorePerPlayer,
        userInitialScore: this.userInitialScore
      })
    },
    submitSign () {
      this.$bs('/md/options/score', {
        category: 'sign',
        signScore: `${this.signMin},${this.signMax}`,
        signGapTime: this.signGapTime,
        signAfterZero: this.signAfterZero
      })
    }
  },
  async beforeMount () {
    const {
      scorePerStorage,
      privateScorePerStorage,
      scorePerClosetItem,
      returnScore,
      scorePerPlayer,
      userInitialScore,
      signMin,
      signMax,
      signGapTime,
      signAfterZero
    } = await this.$bs('/md/options/score')

    this.scorePerStorage = scorePerStorage
    this.privateScorePerStorage = privateScorePerStorage
    this.scorePerClosetItem = scorePerClosetItem
    this.returnScore = returnScore
    this.scorePerPlayer = scorePerPlayer
    this.userInitialScore = userInitialScore
    this.signMin = signMin
    this.signMax = signMax
    this.signGapTime = signGapTime
    this.signAfterZero = signAfterZero
  }
}
</script>

<style lang="stylus" scoped>
.option-margin
  margin-top 20px

.btn-margin
  margin-bottom 10px
</style>
