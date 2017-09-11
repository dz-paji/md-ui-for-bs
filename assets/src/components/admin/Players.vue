<template>
  <base-skeleton>
    <div class="row layout-padding">
      <div class="auto">
        <q-data-table
          :config="config"
          :data="players"
          :columns="columns"
          @refresh="fetchData"
        >
          <template slot="col-preview" scope="cell">
            <img
              v-if="cell.row.tid_steve !== 0"
              :src="$bsLink(`/preview/64/${cell.row.tid_steve}.png`)"
            />
            <img
              v-if="cell.row.tid_alex !== 0"
              :src="$bsLink(`/preview/64/${cell.row.tid_alex}.png`)"
            />
            <img
              v-if="cell.row.tid_cape !== 0"
              :src="$bsLink(`/preview/64/${cell.row.tid_cape}.png`)"
            />
            <span>&nbsp;</span>  <!-- This is a placeholder. -->
          </template>

          <template slot="col-operations" scope="cell">
            <button @click="editPlayer(cell.row)" class="primary">
              {{ $trans('general.edit') }}
            </button>
            <button @click="deletePlayer(cell.row.pid)" class="negative">
              {{ $trans('admin.deletePlayer') }}
            </button>
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
        title: this.$trans('general.playerManage'),
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
          label: 'PID',
          field: 'pid',
          filter: true,
          sort: true,
          width: '5%'
        },
        {
          label: this.$trans('general.player.owner'),
          field: 'uid',
          filter: true,
          sort: true,
          width: '7%'
        },
        {
          label: this.$trans('general.player.playerName'),
          field: 'player_name',
          filter: true,
          width: '15%'
        },
        {
          label: this.$trans('general.player.preference'),
          field: 'preference',
          filter: true,
          width: '10%'
        },
        {
          label: this.$trans('general.player.previews'),
          field: 'preview'
        },
        {
          label: this.$trans('general.player.lastModified'),
          field: 'last_modified'
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
      players: []
    }
  },
  methods: {
    async fetchData (done) {
      this.players = (await this.$bs('/admin/player-data')).data
      done && done()
    },
    editPlayer ({
      pid,
      player_name: _name,
      preference: _preference,
      tid_steve: _steve,
      tid_alex: _alex,
      tid_cape: _cape,
      uid: _uid
    }) {
      Dialog.create({
        title: this.$trans('general.edit'),
        form: {
          headingPlayerName: {
            type: 'heading',
            label: this.$trans('general.player.playerName')
          },
          name: {
            type: 'textbox',
            model: _name
          },
          headingPreference: {
            type: 'heading',
            label: this.$trans('general.player.preference')
          },
          preference: {
            type: 'radio',
            model: _preference,
            items: [
              { label: 'Steve / Default', value: 'default' },
              { label: 'Alex / Slim', value: 'slim' }
            ]
          },
          headingTexture: {
            type: 'heading',
            label: this.$trans('admin.changeTexture')
          },
          steve: {
            type: 'numeric',
            label: 'Steve',
            model: _steve
          },
          clearSteve: {
            type: 'toggle',
            items: [{
              label: this.$trans('admin.clearSteve'),
              value: true,
              model: false
            }]
          },
          alex: {
            type: 'numeric',
            label: 'Alex',
            model: _alex
          },
          clearAlex: {
            type: 'toggle',
            items: [{
              label: this.$trans('admin.clearAlex'),
              value: true,
              model: false
            }]
          },
          cape: {
            type: 'numeric',
            label: this.$trans('general.cape'),
            model: _cape
          },
          clearCape: {
            type: 'toggle',
            items: [{
              label: this.$trans('admin.clearCape'),
              value: true,
              model: false
            }]
          },
          headingOwner: {
            type: 'heading',
            label: this.$trans('general.player.owner')
          },
          uid: {
            type: 'numeric',
            model: _uid
          }
        },
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: async ({
              name,
              preference,
              steve,
              clearSteve,
              alex,
              clearAlex,
              cape,
              clearCape,
              uid
            }) => {
              if (name !== _name && name !== '') {
                await this.$bs('/admin/players?action=name', { pid, name })
              }
              if (preference !== _preference) {
                await this.$bs(
                  '/admin/players?action=preference',
                  { pid, preference }
                )
              }
              if (steve !== _steve && !clearSteve[0]) {
                await this.$bs(
                  '/admin/players?action=texture',
                  { pid, model: 'steve', tid: steve }
                )
              }
              if (clearSteve[0]) {
                await this.$bs(
                  '/admin/players?action=texture',
                  { pid, model: 'steve', tid: 0 }
                )
              }
              if (alex !== _alex && !clearAlex[0]) {
                await this.$bs(
                  '/admin/players?action=texture',
                  { pid, model: 'alex', tid: alex }
                )
              }
              if (clearAlex[0]) {
                await this.$bs(
                  '/admin/players?action=texture',
                  { pid, model: 'alex', tid: 0 }
                )
              }
              if (cape !== _cape && !clearCape[0]) {
                await this.$bs(
                  '/admin/players?action=texture',
                  { pid, model: 'cape', tid: cape }
                )
              }
              if (clearCape[0]) {
                await this.$bs(
                  '/admin/players?action=texture',
                  { pid, model: 'cape', tid: 0 }
                )
              }
              if (uid !== _uid) {
                await this.$bs('/admin/players?action=owner', { pid, uid })
              }
              this.fetchData()
            }
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    },
    deletePlayer (pid) {
      Dialog.create({
        title: this.$trans('admin.deletePlayerNotice'),
        buttons: [
          {
            label: this.$trans('general.confirm'),
            classes: 'negative',
            handler: () => this.$bs('/admin/players?action=delete', { pid }, {
              success: () => (this.players = this.players
                .filter(player => player.pid !== pid))
            })
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
