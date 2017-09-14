<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-primary text-white">
            {{ $trans('admin.options.rate.title') }}
          </div>
          <div class="card-content">
            <option-item
              first
              :caption="$trans('admin.options.rate.scorePerStorage.title')"
            >
              <q-numeric v-model="scorePerStorage" :min="0" />
              <span>
                {{ $trans('admin.options.rate.scorePerStorage.addon') }}
              </span>
            </option-item>

            <option-item
              :caption="$trans(
                'admin.options.rate.privateScorePerStorage.title'
              )"
              :hint="$trans('admin.options.rate.privateScorePerStorage.hint')"
            >
              <q-numeric v-model="privateScorePerStorage" :min="0" />
              <span>
                {{ $trans('admin.options.rate.privateScorePerStorage.addon') }}
              </span>
            </option-item>

            <option-item
              :caption="$trans('admin.options.rate.scorePerClosetItem.title')"
            >
              <q-numeric v-model="scorePerClosetItem" :min="0" />
              <span>
                {{ $trans('admin.options.rate.scorePerClosetItem.addon') }}
              </span>
            </option-item>

            <option-item
              :caption="$trans('admin.options.rate.returnScore.title')"
            >
              <label>
                <q-toggle v-model="returnScore"></q-toggle>
                {{ $trans('admin.options.rate.returnScore.label') }}
              </label>
            </option-item>

            <option-item
              :caption="$trans('admin.options.rate.scorePerPlayer.title')"
            >
              <q-numeric v-model="scorePerPlayer" :min="0" />
              <span>
                {{ $trans('admin.options.rate.scorePerPlayer.addon') }}
              </span>
            </option-item>

            <option-item
              :caption="$trans('admin.options.rate.userInitialScore.title')"
            >
              <q-numeric v-model="userInitialScore" :min="0" />
            </option-item>

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
            <option-item
              first
              :caption="$trans('admin.options.sign.signScore.title')"
            >
              <q-numeric v-model="signMin" :min="0" />
              <span>{{ $trans('admin.options.sign.signScore.addon1') }}</span>
              <q-numeric v-model="signMax" />
              <span>{{ $trans('admin.options.sign.signScore.addon2') }}</span>
            </option-item>

            <option-item
              :caption="$trans('admin.options.sign.signGapTime.title')"
            >
              <q-numeric v-model="signGapTime" :min="0" />
              <span>{{ $trans('admin.options.sign.signGapTime.addon') }}</span>
            </option-item>

            <option-item
              :caption="$trans('admin.options.sign.signAfterZero.title')"
            >
              <label>
                <q-toggle v-model="signAfterZero"></q-toggle>
                {{ $trans('admin.options.sign.signAfterZero.label') }}
                <q-tooltip anchor="bottom middle" self="top middle">
                  {{ $trans('admin.options.sign.signAfterZero.hint') }}
                </q-tooltip>
              </label>
            </option-item>

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
import OptionItem from '../common/OptionItem'

export default {
  components: {
    BaseSkeleton,
    OptionItem
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
    const data = await this.$bs('/md/options/score')

    this.scorePerStorage = data.scorePerStorage
    this.privateScorePerStorage = data.privateScorePerStorage
    this.scorePerClosetItem = data.scorePerClosetItem
    this.returnScore = data.returnScore
    this.scorePerPlayer = data.scorePerPlayer
    this.userInitialScore = data.userInitialScore
    this.signMin = data.signMin
    this.signMax = data.signMax
    this.signGapTime = data.signGapTime
    this.signAfterZero = data.signAfterZero
  }
}
</script>

<style lang="stylus" scoped>
.option-margin
  margin-top 20px

.btn-margin
  margin-bottom 10px
</style>
