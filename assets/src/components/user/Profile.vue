<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title bg-primary text-white">
            {{ $trans('user.profile.avatar.title') }}
          </div>
          <div class="card-content">
            {{ $trans('user.profile.avatar.notice') }}
          </div>
        </div>

        <div class="card">
          <div class="card-title bg-warning text-white">
            {{ $trans('user.profile.password.title') }}
          </div>
          <div class="card-content">
            <div class="floating-label">
              <input
                v-model="password.old"
                name="oldPassword"
                type="password"
                v-validate="'required|min:6|max:16'"
                required
                class="full-width"
                :class="{ 'has-error': errors.has('oldPassword') }"
              />
              <label>{{ $trans('user.profile.password.old') }}</label>
              <small
                v-show="errors.has('oldPassword:required')"
                class="text-negative"
              >{{ $trans('user.emptyPassword') }}</small>
            </div>

            <div class="floating-label margin-input">
              <input
                v-model="password.newPass"
                name="newPassword"
                type="password"
                v-validate="'required|min:8|max:16'"
                required
                class="full-width"
                :class="{ 'has-error': errors.has('newPassword') }"
              />
              <label>{{ $trans('user.profile.password.new') }}</label>
              <small
                v-show="errors.has('newPassword:required')"
                class="text-negative"
              >{{ $trans('user.emptyNewPassword') }}</small>
            </div>

            <div class="floating-label margin-input">
              <input
                v-model="password.confirm"
                name="confirm"
                type="password"
                v-validate="'required|confirmed:newPassword'"
                required
                class="full-width"
                :class="{ 'has-error': errors.has('confirm') }"
              />
              <label>{{ $trans('user.profile.password.confirm') }}</label>
              <small
                v-show="errors.has('confirm:required')"
                class="text-negative"
              >{{ $trans('auth.emptyConfirmPwd') }}</small>
              <small
                v-show="errors.has('confirm:confirmed')"
                class="text-negative"
              >{{ $trans('auth.invalidConfirmPwd') }}</small>
            </div>

            <button
              class="clear warning submit-button"
              @click="submitPassword"
            >
              {{ $trans('user.profile.password.button') }}
            </button>
          </div>
        </div>
      </div>

      <div class="auto">
        <div class="card">
          <div class="card-title bg-primary text-white">
            {{ $trans('user.profile.nickname.title') }}
          </div>
          <div class="card-content">
            <input
              v-model="nickname"
              name="nickname"
              v-validate="'required'"
              class="full-width"
              :class="{ 'has-error': errors.has('nickname') }"
              :placeholder="$trans('user.profile.nickname.rule')"
            />
            <small
              v-show="errors.has('nickname')"
              class="text-negative"
            >{{ $trans('user.emptyNewNickName') }}</small>
            <button
              @click="submitNickname"
              class="clear primary submit-button"
            >{{ $trans('general.submit') }}</button>
          </div>
        </div>

        <div class="card">
          <div class="card-title bg-warning text-white">
            {{ $trans('user.profile.email.title') }}
          </div>
          <div class="card-content">
            <input
              v-model="email"
              name="email"
              v-validate="'required|email'"
              class="full-width"
              :class="{ 'has-error': errors.has('email') }"
              :placeholder="$trans('user.profile.email.new')"
            />
            <small
              class="text-negative"
              v-show="errors.has('email:required')"
            >{{ $trans('user.emptyNewEmail') }}</small>
            <small
              class="text-negative"
              v-show="errors.has('email:email')"
            >{{ $trans('auth.invalidEmail') }}</small>

            <input
              v-model="emailPass"
              name="emailPass"
              type="password"
              v-validate="'required|min:6|max:16'"
              class="full-width margin-input"
              :class="{ 'has-error': errors.has('emailPass') }"
              :placeholder="$trans('user.profile.email.password')"
            />

            <button
              class="clear warning submit-button"
              @click="submitEmail"
            >{{ $trans('user.profile.email.button') }}</button>
          </div>
        </div>

        <div class="card">
          <div class="card-title bg-negative text-white">
            {{ $trans('user.profile.delete.title') }}
          </div>
          <div class="card-content">
            <p>{{ deleteNotice }}</p>
            <button
              class="clear negative submit-button"
              :class="{ disabled: isAdmin }"
              :disabled="isAdmin"
              @click="deleteAccount"
            >{{ $trans('user.profile.delete.button') }}</button>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VeeValidate from 'vee-validate'
import { Cookies, Dialog, Toast } from 'quasar'
import BaseSkeleton from './Base'
import title from 'src/mixins/title'

Vue.use(VeeValidate)

export default {
  components: {
    BaseSkeleton
  },
  mixins: [title],
  computed: {
    ...mapGetters(['isAdmin']),
    deleteNotice () {
      return this.isAdmin
        ? this.$trans('user.profile.delete.admin')
        : this.$trans(
          'user.profile.delete.notice',
          { site: this.$store.state.site.siteName }
          )
    }
  },
  data () {
    return {
      password: {
        old: '',
        newPass: '',
        confirm: ''
      },
      nickname: '',
      email: '',
      emailPass: ''
    }
  },
  methods: {
    async submitPassword () {
      if (
        !await this.$validator.validate('oldPassword') ||
        !await this.$validator.validate('newPassword') ||
        !await this.$validator.validate('confirm')
      ) {
        return
      }

      const { errno, msg } = await this.$bs(
        '/user/profile?action=password',
        {
          current_password: this.password.old,
          new_password: this.password.newPass
        }
      )

      if (errno !== 0) {
        return Toast.create.warning(msg)
      }
      await Toast.create.positive(msg)
      try {
        await this.$bs('/auth/logout', {})
      } catch (err) {
        Cookies.remove('token')
      } finally {
        window.location = '/auth/login'
      }
    },
    async submitNickname () {
      if (!await this.$validator.validate('nickname')) {
        return
      }

      Dialog.create({
        message: this.$trans(
          'user.changeNickName',
          { newNickname: this.nickname }
        ),
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: async () => {
              const { errno, msg } = await this.$bs(
                '/user/profile?action=nickname',
                { new_nickname: this.nickname }
              )
              if (errno === 0) {
                this.$store.commit(
                  'updateUserInfo',
                  { nickname: this.nickname }
                )
                Toast.create.positive(msg)
              } else {
                Toast.create.warning(msg)
              }
            }
          },
          { label: this.$trans('general.cancel') }
        ]
      })
    },
    async submitEmail () {
      if (
        !await this.$validator.validate('email') ||
        !await this.$validator.validate('emailPass')
      ) {
        return
      }

      Dialog.create({
        message: this.$trans(
          'user.changeEmail',
          { newEmail: this.email }
        ),
        buttons: [
          {
            label: this.$trans('general.confirm'),
            handler: async () => {
              const { errno, msg } = await this.$bs(
                '/user/profile?action=email',
                {
                  new_email: this.email,
                  password: this.emailPass
                }
              )

              if (errno !== 0) {
                return Toast.create.warning(msg)
              }

              await Toast.create.positive(msg)
              try {
                await this.$bs('/auth/logout', {})
              } catch (err) {
                Cookies.remove('token')
              } finally {
                window.location = '/auth/login'
              }
            }
          }
        ]
      })
    },
    async deleteAccount () {
      Dialog.create({
        title: this.$trans('user.profile.delete.modalTitle'),
        message: this.$trans('user.profile.delete.modalNotice'),
        form: {
          password: {
            type: 'password',
            label: this.$trans('user.profile.delete.password'),
            model: ''
          }
        },
        buttons: [
          {
            label: this.$trans('general.submit'),
            handler: async ({ password }) => {
              if (!password) {
                return Dialog.create({
                  message: this.$trans('user.emptyDeletePassword')
                })
              }

              const { errno, msg } = await this.$bs(
                '/user/profile?action=delete',
                { password }
              )
              if (errno !== 0) {
                return Toast.create.warning(msg)
              } else {
                Dialog.create({
                  message: msg,
                  buttons: [
                    {
                      label: this.$trans('general.confirm'),
                      handler () {
                        window.location = '/auth/login'
                      }
                    }
                  ]
                })
              }
            }
          },
          { label: this.$trans('general.close') }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.margin-input
  margin-top 8px

.submit-button
  margin-top 10px
  margin-bottom 10px
  float right
  letter-spacing 1px
</style>
