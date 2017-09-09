<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-2of3">
        <div class="card">
          <div class="card-title">
            {{ $trans('general.myCloset') }}
            <q-search
              class="search-input pull-right"
              :placeholder="$trans('user.closet.typeToSearch')"
              :debounce="350"
              @input="fetchData"
              v-model="search"
            />
            <q-select
              class="pull-right"
              v-model="category"
              :options="qSelectOptions"
              @input="fetchData"
            ></q-select>
          </div>
          <div class="card-content">
            <div>
              <div class="text-center layout-padding" v-if="items.length === 0">
                <span v-if="search === ''">{{ $trans('user.emptyClosetMsg') }}</span>
                <span v-else>{{ $trans('general.noResult') }}</span>
              </div>
              <div v-else v-for="(item, index) in items" :key="item.tid" class="closet-item">
                <img
                  :src="texturePreviewUrl(item.tid)"
                  @click="switchPreview(item.tid, item.type)"
                  class="cursor-pointer"
                />

                <input
                  v-if="item.tid === renaming"
                  v-model="items[index].name"
                  @keypress.enter="renameItem(index)"
                  @blur="renameItem(index)"
                />
                <span
                  v-else
                  @dblclick="readyToRename(index)"
                >{{ item.name }}</span>

                <span class="pull-right">
                  <button
                    class="small blue-grey clear"
                    :title="$trans('user.viewInSkinlib')"
                    @click="showActionsSheet(item.tid)"
                  >
                    <i>settings</i>
                  </button>
                </span>
              </div>
            </div>
            <div>
              <q-pagination
                v-model="currentPage"
                :max="totalPages"
                @input="fetchData"
                class="pull-right"
                ref="pagination"
              ></q-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="auto">
        <div class="card">
          <div class="card-title">{{ $trans('general.texturePreview') }}</div>
          <div class="card-content">
            <texture-view :skin="rawSkinUrl" :cape="rawCapeUrl"></texture-view>
            <button
              class="primary clear"
              @click="switchPreview(null, 'skin')"
            >{{ $trans('user.closet.clearSkin') }}</button>
            <button
              class="primary clear"
              @click="switchPreview(null, 'cape')"
            >{{ $trans('user.closet.clearCape') }}</button>
            <button
              class="primary clear pull-right btn-use-as"
              @click="applyToPlayer"
            >{{ $trans('user.closet.useAs.button') }}</button>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import { ActionSheet, Dialog } from 'quasar'
import BaseSkeleton from './Base'
import TextureView from '../common/TextureView'
import title from '../../mixins/title'

export default {
  components: {
    BaseSkeleton,
    TextureView
  },
  mixins: [title],
  data () {
    return {
      items: [],
      category: 'skin',
      search: '',
      currentPage: 1,
      totalPages: 1,
      previewingSkin: null,
      previewingCape: null,
      oldName: '',
      renaming: null
    }
  },
  computed: {
    rawSkinUrl () {
      if (!this.previewingSkin) {
        return null
      }
      return this.$bsLink(`/raw/${this.previewingSkin}.png`)
    },
    rawCapeUrl () {
      if (!this.previewingCape) {
        return null
      }
      return this.$bsLink(`/raw/${this.previewingCape}.png`)
    },
    qSelectOptions () {
      return [
        { label: this.$trans('general.skin'), value: 'skin' },
        { label: this.$trans('general.cape'), value: 'cape' }
      ]
    }
  },
  methods: {
    texturePreviewUrl (tid) {
      return this.$bsLink(`/preview/${tid}.png`)
    },
    switchPreview (tid, type) {
      this[`previewing${type === 'cape' ? 'Cape' : 'Skin'}`] = tid
    },
    showActionsSheet (tid) {
      const actions = [
        {
          label: this.$trans('user.viewInSkinlib'),
          icon: 'find_in_page',
          handler: () => this.$router.push(
            '/go?dst=' +
            encodeURI(`/skinlib/show/${tid}`)
          )
        },
        {
          label: this.$trans('user.renameItem'),
          icon: 'create',
          handler: () => this.readyToRename(
            this.items.findIndex(item => item.tid === tid)
          )
        },
        {
          label: this.$trans('user.removeItem'),
          icon: 'delete',
          handler: () => {
            Dialog.create({
              message: this.$trans('user.removeFromClosetNotice'),
              buttons: [
                {
                  label: this.$trans('general.confirm'),
                  handler: () => {
                    this.$bs('/user/closet/remove', { tid }).then(() => {
                      this.items = this.items.filter(item => item.tid !== tid)
                    })
                  }
                },
                { label: this.$trans('general.cancel') }
              ]
            })
          }
        }
      ]

      if (this.category === 'skin') {
        actions.push({
          label: this.$trans('user.setAsAvatar'),
          icon: 'account_circle',
          handler: () => {
            Dialog.create({
              title: this.$trans('user.setAsAvatar'),
              message: this.$trans('user.setAvatarNotice'),
              buttons: [
                {
                  label: this.$trans('general.confirm'),
                  handler: async () => {
                    await this.$bs('/user/profile/avatar', { tid })
                    const userInfo = await this.$bs('/md/info/user')
                    this.$store.commit('updateUserInfo', userInfo)
                  }
                },
                { label: this.$trans('general.cancel') }
              ]
            })
          }
        })
      }

      ActionSheet.create({
        actions
      })
    },
    readyToRename (index) {
      this.oldName = this.items[index].name
      this.renaming = this.items[index].tid
    },
    renameItem (index) {
      this.renaming = null
      if (this.items[index].name === '') {
        this.items[index].name = this.oldName
        return 0
      }
      this.$bs(
        '/user/closet/rename',
        {
          tid: this.items[index].tid,
          new_name: this.items[index].name
        }
      )
    },
    async applyToPlayer () {
      if (!this.previewingSkin && !this.previewingCape) {
        return 0
      }
      const players = await this.$bs('/md/info/player')
      ActionSheet.create({
        title: this.$trans('user.closet.useAs.title'),
        gallery: true,
        actions: players.map(player => {
          const { preference, tid_steve: steve, tid_alex: alex } = player
          return {
            label: player.player_name,
            avatar: this.$bsLink(
              '/md/avatar/' + (preference === 'default' ? steve : alex)
              ),
            handler: () => {
              const data = { pid: player.pid, tid: {} }
              if (this.previewingSkin) {
                data.tid.skin = this.previewingSkin
              }
              if (this.previewingCape) {
                data.tid.cape = this.previewingCape
              }
              this.$bs('/user/player/set', data)
            }
          }
        }).concat({
          label: this.$trans('user.closet.useAs.add'),
          icon: 'add',
          handler: () => {
            Dialog.create({
              title: this.$trans('user.player.addPlayer'),
              form: {
                name: {
                  type: 'textbox',
                  label: this.$trans('user.player.playerName'),
                  placeholder: this.$store.state.site.allowChinesePlayerName
                    ? this.$trans('user.player.pnameRuleChinese')
                    : this.$trans('user.player.pnameRule')
                },
                applyNow: {
                  type: 'toggle',
                  items: [{
                    label: this.$trans('user.closet.useAs.applyNow'),
                    value: 'apply',
                    model: true
                  }]
                }
              },
              buttons: [
                {
                  label: this.$trans('general.confirm'),
                  handler: async ({ name, applyNow }) => {
                    await this.$bs(
                      '/user/player/add',
                      { player_name: name },
                      { useToast: false }
                    )
                    if (!applyNow.length) {
                      this.applyToPlayer()
                    } else {
                      const newPlayer = {
                        pid: (await this.$bs(`/md/player/${name}`)).pid,
                        tid: {}
                      }
                      if (this.previewingSkin) {
                        newPlayer.tid.skin = this.previewingSkin
                      }
                      if (this.previewingCape) {
                        newPlayer.tid.cape = this.previewingCape
                      }
                      await this.$bs('/user/player/set', newPlayer)
                    }
                  }
                },
                { label: this.$trans('general.cancel') }
              ]
            })
          }
        })
      })
    },
    async fetchData () {
      const { items, total_pages: totalPages } = await this.$bs(
        '/user/closet-data' +
        `?category=${this.category}` +
        `&page=${this.currentPage}` +
        `&q=${this.search}`
      )
      this.items = items
      this.totalPages = totalPages || 1
      if (this.currentPage > totalPages) {
        this.$refs.pagination.set(totalPages)
      }
    }
  },
  beforeMount () {
    this.fetchData()
  }
}
</script>

<style lang="stylus" scoped>
.btn-use-as
  margin-bottom 10px

.search-input
  margin-left 20px
  width 220px

.closet-item
  display inline-block
  position relative
  margin-right 30px
  margin-bottom 50px
  cursor pointer
  width 210px
  height 196px

  img
    width 200px
    height 200px
    display inline
</style>
