<template>
  <base-skeleton>
    <div class="row layout-padding">
      <div class="auto">
        <q-data-table
          :config="config"
          :columns="columns"
          :data="reports"
          @refresh="fetchData"
        >
          <template slot="col-tid" scope="cell">
            {{ cell.data }}
            <router-link
              tag="button"
              class="primary clear"
              :to="`/go?dst=/skinlib/show/${cell.data}`"
            >
              <i>open_in_new</i>
            </router-link>
          </template>

          <template slot="col-status" scope="cell">
            {{ statusText(cell.data) }}
          </template>
        </q-data-table>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import BaseSkeleton from '../../user/Base'

export default {
  components: {
    BaseSkeleton
  },
  computed: {
    columns () {
      return [
        { label: 'TID', field: 'tid' },
        { label: this.$trans('skinlib.show.uploader'), field: 'uploader' },
        { label: this.$trans('plugins.reportTexture.reason'), field: 'reason' },
        { label: this.$trans('plugins.reportTexture.status'), field: 'status' },
        {
          label: this.$trans('plugins.reportTexture.reportTime'),
          field: 'report_at'
        }
      ]
    },
    config () {
      return {
        title: this.$trans('plugins.reportTexture.userSide'),
        refresh: true,
        messages: {
          noData: this.$trans('vendor.noData')
        }
      }
    }
  },
  data () {
    return {
      reports: []
    }
  },
  methods: {
    statusText (status) {
      return [
        this.$trans('plugins.reportTexture.reportPending'),
        this.$trans('plugins.reportTexture.reportResolved'),
        this.$trans('plugins.reportTexture.reportRejected')
      ][status]
    },
    async fetchData (done) {
      this.reports = await this.$bs('/md/info/user-report')
      done && done()
    }
  },
  beforeMount () {
    this.fetchData()
  }
}
</script>
