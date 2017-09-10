<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <q-data-table
          :data="players"
          :config="config"
          :columns="columns"
          @refresh="fetchPlayersData"
        >
          <template slot="col-player_name" scope="cell">
            <span
              class="cursor-pointer"
              @click="showPlayerTexture(cell.row.pid)"
            >{{ cell.data }}</span>
          </template>

          <template slot="col-preference" scope="cell">
            <span v-if="cell.data === 'default'">Steve</span>
            <span v-else>Alex</span>
          </template>

          <template slot="col-operations" scope="cell">
            <button
              class="primary"
              @click="editPlayer(cell.row.__index)"
            >{{ $trans('user.player.edit') }}</button>
            <button
              class="warning"
              @click="deleteTexture(cell.row.pid)"
            >{{ $trans('user.player.deleteTexture') }}</button>
            <button
              class="negative"
              @click="deletePlayer(cell.row.pid)"
            >{{ $trans('user.player.deletePlayer') }}</button>
          </template>
        </q-data-table>
        <button
          class="pull-right primary clear btn-add-player"
          @click="addPlayer"
        >
          {{ $trans('user.player.addPlayer') }}
        </button>

        <div class="card login-notice-card">
          <div class="card-title bg-primary text-white">
            {{ $trans('general.notice') }}
          </div>
          <div class="card-content">
            {{ $trans('user.player.loginNotice') }}
          </div>
        </div>
      </div>

      <div class="auto">
        <div class="card">
          <div class="card-title">
            {{ $trans('user.player.playerInfo') }}
          </div>
          <div class="card-content">
            <texture-view v-if="preview3d" :skin="skinUrl" :cape="capeUrl" />
            <div v-else>
              <p>
                {{ $trans('user.player.textures.steve') }}
                <img
                  v-if="selected.steve"
                  class="skin2d pull-right"
                  :src="steveUrl"
                />
                <span v-else class="pull-right">
                  {{ $trans('user.player.textures.empty') }}
                </span>
              </p>
              <p>
                {{ $trans('user.player.textures.alex') }}
                <img
                  v-if="selected.alex"
                  class="skin2d pull-right"
                  :src="alexUrl"
                />
                <span v-else class="pull-right">
                  {{ $trans('user.player.textures.empty') }}
                </span>
              </p>
              <p>
                {{ $trans('user.player.textures.cape') }}
                <img
                  v-if="selected.cape"
                  class="skin2d pull-right"
                  :src="capeUrl"
                />
                <span v-else class="pull-right">
                  {{ $trans('user.player.textures.empty') }}
                </span>
              </p>
            </div>
            <button
              class="pull-right primary clear btn-switch-view"
              @click="switchPreview"
            >{{ preview3d
              ? $trans('user.switch2dPreview')
              : $trans('user.switch3dPreview') }}</button>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import { Dialog, Toast } from 'quasar'
import BaseSkeleton from './Base'
import TextureView from '../common/TextureView'
import title from 'src/mixins/title'

export default {
  components: {
    BaseSkeleton,
    TextureView
  },
  mixins: [title],
  computed: {
    skinUrl () {
      if (!this.selected.skin) {
        return null
      }
      return this.$bsLink(`/raw/${this.selected.skin}.png`)
    },
    steveUrl () {
      if (!this.selected.steve) {
        return ''
      }
      return this.$bsLink(`/raw/${this.selected.steve}.png`)
    },
    alexUrl () {
      if (!this.selected.alex) {
        return ''
      }
      return this.$bsLink(`/raw/${this.selected.alex}.png`)
    },
    capeUrl () {
      if (!this.selected.cape) {
        return ''
      }
      return this.$bsLink(`/raw/${this.selected.cape}.png`)
    },
    config () {
      return {
        title: this.$trans('general.playerManage'),
        rowHeight: '50px',
        refresh: true,
        messages: {
          noData: this.$trans('user.player.noPlayersData')
        }
      }
    },
    columns () {
      return [
        {
          label: 'PID',
          field: 'pid',
          width: '10%'
        },
        {
          label: this.$trans('user.player.playerName'),
          field: 'player_name',
          width: '20%'
        },
        {
          label: this.$trans('user.player.preference.title'),
          field: 'preference',
          width: '17%'
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
      players: [],
      selected: {
        skin: null,
        steve: null,
        alex: null,
        cape: null
      },
      preview3d: true
    }
  },
  methods: {
    async fetchPlayersData (done) {
      this.players = await this.$bs('/md/info/player')
      done && done()
    },
    async showPlayerTexture (pid) {
      const {
        tid_steve: steve,
        tid_alex: alex,
        tid_cape: cape,
        preference
      } = await this.$bs('/user/player/show', { pid })
      if (preference === 'default') {
        this.selected.skin = steve
      } else {
        this.selected.skin = alex
      }
      this.selected.steve = steve
      this.selected.alex = alex
      this.selected.cape = cape
    },
    editPlayer (index) {
      Dialog.create({
        title: this.$trans('user.player.edit'),
        form: {
          name: {
            type: 'textbox',
            label: this.$trans('user.player.playerName'),
            model: this.players[index].player_name
          },
          preferenceTitle: {
            type: 'heading',
            label: this.$trans('user.player.preference.title')
          },
          preference: {
            type: 'radio',
            model: this.players[index].preference,
            items: [
              { label: 'Steve', value: 'default' },
              { label: 'Alex', value: 'slim' }
            ]
          }
        },
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: ({ name, preference }) => {
              if (name !== this.players[index].player_name) {
                this.$bs(
                  '/user/player/rename',
                  {
                    pid: this.players[index].pid,
                    new_player_name: name
                  },
                  {
                    success: () => (this.players[index].player_name = name)
                  }
                )
              }

              if (preference !== this.players[index].preference) {
                this.$bs(
                  '/user/player/preference',
                  {
                    pid: this.players[index].pid,
                    preference
                  },
                  {
                    success: () =>
                      (this.players[index].preference = preference)
                  }
                )
              }
            }
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    },
    deleteTexture (pid) {
      Dialog.create({
        title: this.$trans('user.chooseClearTexture'),
        form: {
          textures: {
            type: 'checkbox',
            items: [
              { label: 'Steve', value: 'steve' },
              { label: 'Alex', value: 'alex' },
              { label: this.$trans('general.cape'), value: 'cape' }
            ]
          }
        },
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: ({ textures }) => {
              if (textures.length === 0) {
                return Toast.create.warning(this.$trans('user.noClearChoice'))
              }

              const data = { pid }
              ;['steve', 'alex', 'cape'].forEach(type => {
                data[type] = textures.includes(type) ? 1 : 0
              })
              this.$bs('/user/player/texture/clear', data)
            }
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    },
    deletePlayer (pid) {
      Dialog.create({
        title: this.$trans('user.deletePlayer'),
        message: this.$trans('user.deletePlayerNotice'),
        buttons: [
          {
            label: this.$trans('general.confirm'),
            classes: 'negative',
            handler: () => {
              this.$bs(
                '/user/player/delete',
                { pid },
                {
                  success: () => (this.players = this.players.filter(
                    player => player.pid !== pid
                  ))
                }
              )
            }
          },
          {
            label: this.$trans('general.cancel')
          }
        ]
      })
    },
    addPlayer () {
      Dialog.create({
        title: this.$trans('user.player.addPlayer'),
        form: {
          heading: {
            type: 'heading',
            label: this.$trans('user.player.playerName')
          },
          name: {
            type: 'textbox',
            placeholder: this.$store.state.site.allowChinesePlayerName
              ? this.$trans('user.player.pnameRuleChinese')
              : this.$trans('user.player.pnameRule')
          }
        },
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: ({ name }) => {
              this.$bs(
                '/user/player/add',
                { player_name: name },
                {
                  success: () => (this.fetchPlayersData())
                }
              )
            }
          },
          {
            label: this.$trans('general.cancel')
          }
        ]
      })
    },
    switchPreview () {
      this.preview3d = !this.preview3d
    }
  },
  beforeMount () {
    this.fetchPlayersData()
  }
}
</script>

<style lang="stylus" scoped>
.btn-add-player
  margin-top 10px

.login-notice-card
  margin-top 55px

.btn-switch-view
  margin-top 10px
  margin-bottom 5px

.skin2d
  max-height 64px
  width 64px
</style>
