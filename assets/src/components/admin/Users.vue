<template>
  <base-skeleton>
    <div class="row sm-column layout-padding">
      <div class="auto">
        <q-data-table
          :config="config"
          :data="users"
          :columns="columns"
          @refresh="fetchData"
        >
          <template slot="col-permission" scope="cell">
            {{ permissionText(cell.data) }}
          </template>

          <template slot="col-operations" scope="cell">
            <button class="primary" @click="editUser(cell.row)">
              {{ $trans('general.edit') }}
            </button>
            <button class="warning" @click="changePassword(cell.row.uid)">
              {{ $trans('admin.changePassword') }}
            </button>
            <button
              v-if="cell.row.permission === 2"
              class="negative"
              @click="deleteUser(cell.row.uid)"
            >
              {{ $trans('admin.deleteUser') }}
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
        title: this.$trans('general.userManage'),
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
        { label: 'UID', field: 'uid', width: '5%', filter: true, sort: true },
        {
          label: this.$trans('general.user.email'),
          field: 'email',
          filter: true
        },
        {
          label: this.$trans('general.user.nickname'),
          field: 'nickname',
          filter: true,
          sort: true
        },
        {
          label: this.$trans('general.user.score'),
          field: 'score',
          width: '10%',
          sort: true
        },
        {
          label: this.$trans('admin.users.status.title'),
          field: 'permission',
          width: '10%',
          sort: true
        },
        {
          label: this.$trans('admin.users.playersCount.title'),
          field: 'players_count',
          width: '10%',
          sort: true
        },
        {
          label: this.$trans('general.user.registerAt'),
          field: 'register_at',
          filter: true,
          sort: true
        },
        {
          label: this.$trans('general.operations'),
          field: 'operations',
          width: '27%',
          filter: false,
          sort: false
        }
      ]
    }
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
    permissionText (permission) {
      return {
        '-1': this.$trans('admin.banned'),
        '0': this.$trans('admin.normal'),
        '1': this.$trans('admin.admin'),
        '2': this.$trans('admin.superAdmin')
      }[permission]
    },
    async fetchData (done) {
      this.users = (await this.$bs('/admin/user-data')).data
      done && done()
    },
    editUser ({
      uid,
      email: _email,
      nickname: _nickname,
      score: _score,
      permission: _permission
    }) {
      const form = {
        headingEmail: {
          type: 'heading',
          label: this.$trans('general.user.email')
        },
        email: {
          type: 'textbox',
          model: _email
        },
        headingNickname: {
          type: 'heading',
          label: this.$trans('general.user.nickname')
        },
        nickname: {
          type: 'textbox',
          model: _nickname
        },
        headingScore: {
          type: 'heading',
          label: this.$trans('general.user.score')
        },
        score: {
          type: 'numeric',
          model: _score
        }
      }
      if (_permission !== 2) {
        form.headingPermission = {
          type: 'heading',
          label: this.$trans('admin.users.status.title')
        }
        form.permission = {
          type: 'radio',
          model: _permission,
          items: [
            { label: this.$trans('admin.admin'), value: 1 },
            { label: this.$trans('admin.normal'), value: 0 },
            { label: this.$trans('admin.banned'), value: -1 }
          ]
        }
      }

      Dialog.create({
        title: this.$trans('general.edit'),
        form,
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: async ({ email, nickname, score, permission }) => {
              if (email !== _email && email !== '') {
                await this.$bs('/admin/users?action=email', { uid, email })
              }
              if (nickname !== _nickname && nickname !== '') {
                await this.$bs(
                  '/admin/users?action=nickname',
                  { uid, nickname }
                )
              }
              if (score !== _score) {
                await this.$bs('/admin/users?action=score', { uid, score })
              }
              if (permission !== undefined && permission !== _permission) {
                if (
                  permission === 1 ||
                  (permission === 0 && _permission === 1)
                ) {
                  await this.$bs('/admin/users?action=admin', { uid })
                } else if (
                  permission === -1 ||
                  (permission === 0 && _permission === -1)
                ) {
                  await this.$bs('/admin/users?action=ban', { uid })
                }
              }
              this.fetchData()
            }
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    },
    changePassword (uid) {
      Dialog.create({
        title: this.$trans('admin.newUserPassword'),
        form: {
          password: {
            type: 'password'
          }
        },
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: ({ password }) => this.$bs(
              '/admin/users?action=password',
              { uid, password }
            )
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    },
    deleteUser (uid) {
      Dialog.create({
        title: this.$trans('admin.deleteUserNotice'),
        buttons: [
          {
            label: this.$trans('general.confirm'),
            classes: 'negative',
            handler: () => this.$bs('/admin/users?action=delete', { uid }, {
              success: () => {
                this.users = this.users.filter(user => user.uid !== uid)
              }
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
