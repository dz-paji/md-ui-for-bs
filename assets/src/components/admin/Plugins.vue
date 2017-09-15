<template>
  <base-skeleton>
    <div class="row layout-padding">
      <div class="auto">
        <q-data-table
          :config="config"
          :data="plugins"
          :columns="columns"
          @refresh="fetchData"
        >
          <template slot="col-description" scope="cell">
            <span>
              {{ cell.data }}
              <q-tooltip anchor="bottom middle" self="top middle">
                {{ cell.data }}
              </q-tooltip>
            </span>
          </template>

          <template slot="col-author" scope="cell">
            <a v-if="cell.data.url" :href="cell.data.url" target="_blank">
              {{ cell.data.author }}
            </a>
            <span v-else>{{ cell.data.author }}</span>
          </template>

          <template slot="col-operations" scope="cell">
            <button
              v-if="cell.data.enabled"
              class="warning"
              @click="disablePlugin(cell.row.name)"
            >{{ $trans('admin.disablePlugin') }}</button>
            <button
              v-else
              class="positive"
              @click="enablePlugin(cell.row.name)"
            >{{ $trans('admin.enablePlugin') }}</button>
            <button
              class="primary"
              :class="{ disabled: !canConfigPlugin(cell.data) }"
              :disabled="!canConfigPlugin(cell.data)"
              :title="noConfigNotice(cell.data)"
              @click="pluginConfig(cell.row.name)"
            >{{ $trans('admin.configurePlugin') }}</button>
            <button
              class="negative"
              @click="deletePlugin(cell.row)"
            >{{ $trans('admin.deletePlugin') }}</button>
          </template>
        </q-data-table>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import { Dialog } from 'quasar'
import BaseSkeleton from './Base'

export default {
  components: {
    BaseSkeleton
  },
  computed: {
    config () {
      return {
        title: this.$trans('general.pluginManage'),
        refresh: true,
        messages: {
          noData: this.$trans('vendor.noData'),
          noDataAfterFiltering: this.$trans('vendor.noFilterData')
        },
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 25, 50]
        },
        labels: {
          columns: this.$trans('vendor.columns'),
          allCols: this.$trans('vendor.allCols'),
          search: this.$trans('vendor.search'),
          all: this.$trans('vendor.all'),
          rows: this.$trans('vendor.rows')
        }
      }
    },
    columns () {
      return [
        {
          label: this.$trans('admin.plugins.name'),
          field: 'title',
          filter: true,
          sort: true,
          width: '15%'
        },
        {
          label: this.$trans('admin.plugins.description'),
          field: 'description',
          width: '37%',
          filter: true
        },
        {
          label: this.$trans('admin.plugins.author'),
          field: 'author',
          filter: true,
          sort: true,
          width: '10%'
        },
        {
          label: this.$trans('admin.plugins.version'),
          field: 'version',
          width: '7%'
        },
        {
          label: this.$trans('general.operations'),
          field: 'operations'
        }
      ]
    }
  },
  data () {
    return {
      plugins: []
    }
  },
  methods: {
    canConfigPlugin ({ enabled, hasConfigView }) {
      return hasConfigView && enabled
    },
    noConfigNotice ({ enabled, hasConfigView }) {
      if (!hasConfigView) {
        return this.$trans('admin.noPluginConfigNotice')
      } else if (!enabled) {
        return this.$trans('admin.pluginDisabledNotice')
      }
    },
    async fetchData (done) {
      this.plugins = (await this.$bs('/admin/plugins/data')).data
      done && done()
    },
    async enablePlugin (name) {
      await this.$bs('/admin/plugins/manage', { action: 'enable', name })
      this.fetchData()
      this.$store.dispatch('fetchMenu')
    },
    async disablePlugin (name) {
      await this.$bs('/admin/plugins/manage', { action: 'disable', name })
      this.fetchData()
      this.$store.dispatch('fetchMenu')
    },
    pluginConfig (name) {
      this.$router.push(`/admin/plugins/config/${name}`)
    },
    deletePlugin ({ name, title }) {
      Dialog.create({
        title: this.$trans('admin.confirmDeletion', { name: title }),
        buttons: [
          {
            label: this.$trans('general.confirm'),
            classes: 'negative',
            handler: async () => {
              await this.$bs('/admin/plugins/manage', {
                action: 'delete', name
              })
              this.fetchData()
              this.$store.dispatch('fetchMenu')
            }
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    }
  },
  beforeMount () {
    this.fetchData()
  }
}
</script>
