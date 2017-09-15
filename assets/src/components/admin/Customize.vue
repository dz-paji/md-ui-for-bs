<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of3">
        <div class="card">
          <div class="card-title bg-primary text-white">
            {{ $trans('admin.customize.changeColor.title') }}
          </div>
          <div class="card-content">
            <div class="row gutter">
              <div class="width-1of3">
                <button
                  class="primary"
                  @click="setRGB(2, 123, 227)"
                >{{ $trans('admin.customize.colors.primary') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="amber"
                  @click="setRGB(255, 193, 7)"
                >{{ $trans('admin.customize.colors.amber') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="purple"
                  @click="setRGB(156, 39, 176)"
                >{{ $trans('admin.customize.colors.purple') }}</button>
              </div>
            </div>
            <div class="row gutter">
              <div class="width-1of3">
                <button
                  class="orange"
                  @click="setRGB(255, 152, 0)"
                >{{ $trans('admin.customize.colors.orange') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="pink"
                  @click="setRGB(233, 30, 99)"
                >{{ $trans('admin.customize.colors.pink') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="negative"
                  @click="setRGB(219, 40, 40)"
                >{{ $trans('admin.customize.colors.negative') }}</button>
              </div>
            </div>
            <div class="row gutter">
              <div class="width-1of3">
                <button
                  class="positive"
                  @click="setRGB(33, 186, 69)"
                >{{ $trans('admin.customize.colors.positive') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="blue"
                  @click="setRGB(33, 150, 243)"
                >{{ $trans('admin.customize.colors.blue') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="teal"
                  @click="setRGB(0, 150, 136)"
                >{{ $trans('admin.customize.colors.teal') }}</button>
              </div>
            </div>
            <div class="row gutter">
              <div class="width-1of3">
                <button
                  class="grey"
                  @click="setRGB(158, 158, 158)"
                >{{ $trans('admin.customize.colors.grey') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="light-blue"
                  @click="setRGB(3, 169, 244)"
                >{{ $trans('admin.customize.colors.light-blue') }}</button>
              </div>
              <div class="width-1of3">
                <button
                  class="indigo"
                  @click="setRGB(63, 81, 181)"
                >{{ $trans('admin.customize.colors.indigo') }}</button>
              </div>
            </div>

            <div class="custom-rgb-title">
              {{ $trans('admin.customize.changeColor.customRGB') }}
              <button class="primary clear pull-right" @click="resetColor">
                {{ $trans('admin.customize.changeColor.reset') }}
              </button>
            </div>
            <q-knob
              v-model="mdThemeR"
              :min="0"
              :max="255"
              color="red"
            ></q-knob>
            <q-knob
              v-model="mdThemeG"
              :min="0"
              :max="255"
              color="green"
              class="knob-margin"
            ></q-knob>
            <q-knob
              v-model="mdThemeB"
              :min="0"
              :max="255"
              color="blue"
              class="knob-margin"
            ></q-knob>

            <button
              class="primary clear pull-right btn-margin"
              @click="submitMdTheme"
            >{{ $trans('general.submit') }}</button>
          </div>
        </div>
      </div>

      <div class="width-2of3">
        <div class="card">
          <div class="card-title bg-primary text-white">
            {{ $trans('admin.options.homepage.title') }}
          </div>
          <div class="card-content">
            <option-item
              first
              :caption="$trans('admin.options.homepage.homePicUrl.title')"
              :hint="$trans('admin.options.homepage.homePicUrl.hint')"
            ><input class="full-width" v-model="homePicUrl" /></option-item>

            <option-item
              :caption="$trans('admin.options.homepage.faviconUrl.title')"
              :hint="$trans('admin.options.homepage.faviconUrl.hint')"
              :description="$trans(
                'admin.options.homepage.faviconUrl.description'
              )"
            ><input class="full-width" v-model="faviconUrl" /></option-item>

            <option-item
              :caption="$trans('admin.options.homepage.copyrightPrefer.title')"
            >
              <q-select
                type="list"
                class="full-width"
                v-model="copyrightPrefer"
                :options="copyrightOptions"
              />
              <small
                v-html="$trans(
                  'admin.options.homepage.copyrightPrefer.description',
                  {},
                  false
                )">
              </small>
            </option-item>

            <option-item
              :caption="$trans('admin.options.homepage.copyrightText.title')"
            >
              <textarea
                v-model="copyrightText"
                class="full-width"
                rows="5"
              />
              <small
                v-html="$trans(
                  'admin.options.homepage.copyrightText.description',
                  {},
                  false
                )"
              ></small>
            </option-item>

            <button
              class="primary clear pull-right btn-margin"
              @click="submitHomepage"
            >{{ $trans('general.submit') }}</button>
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
      copyrightOptions: [
        { value: '0', label: 'Powered with ❤ by Blessing Skin Server.' },
        { value: '1', label: 'Powered by Blessing Skin Server.' },
        { value: '2', label: 'Proudly powered by Blessing Skin Server.' },
        { value: '3', label: '由 Blessing Skin Server 强力驱动.' },
        { value: '4', label: '自豪地采用 Blessing Skin Server.' }
      ],
      homePicUrl: '',
      faviconUrl: '',
      copyrightPrefer: '0',
      copyrightText: '',
      mdThemeR: 0,
      mdThemeG: 0,
      mdThemeB: 0,
      previousRGB: this.$store.state.site.theme
    }
  },
  watch: {
    mdThemeR (val) {
      this.mdThemeValue = '#' +
        val.toString(16).padStart(2, '0') +
        this.mdThemeG.toString(16).padStart(2, '0') +
        this.mdThemeB.toString(16).padStart(2, '0')
    },
    mdThemeG (val) {
      this.mdThemeValue = '#' +
        this.mdThemeR.toString(16).padStart(2, '0') +
        val.toString(16).padStart(2, '0') +
        this.mdThemeB.toString(16).padStart(2, '0')
    },
    mdThemeB (val) {
      this.mdThemeValue = '#' +
        this.mdThemeR.toString(16).padStart(2, '0') +
        this.mdThemeG.toString(16).padStart(2, '0') +
        val.toString(16).padStart(2, '0')
    }
  },
  computed: {
    mdThemeValue: {
      get () {
        return '#' +
          this.mdThemeR.toString(16).padStart(2, '0') +
          this.mdThemeG.toString(16).padStart(2, '0') +
          this.mdThemeB.toString(16).padStart(2, '0')
      },
      set (val) {
        Array.from(document.getElementsByClassName('colorful-bar'))
          .forEach(el => (el.style.backgroundColor = val))
      }
    }
  },
  methods: {
    convertHexToDec (hexString) {
      return Number.parseInt(Number.parseInt(hexString, 16).toString(10))
    },
    convertHexColor (theme) {
      this.mdThemeR = this.convertHexToDec(theme[1] + theme[2])
      this.mdThemeG = this.convertHexToDec(theme[3] + theme[4])
      this.mdThemeB = this.convertHexToDec(theme[5] + theme[6])
    },
    setRGB (r, g, b) {
      this.mdThemeR = r
      this.mdThemeG = g
      this.mdThemeB = b
    },
    resetColor () {
      this.convertHexColor(this.previousRGB)
    },
    submitMdTheme () {
      this.$bs('/md/options/customize', {
        category: 'md',
        mdTheme: this.mdThemeValue
      })
    },
    async submitHomepage () {
      await this.$bs('/md/options/customize', {
        category: 'homepage',
        homePicUrl: this.homePicUrl,
        faviconUrl: this.faviconUrl,
        copyrightPrefer: this.copyrightPrefer,
        copyrightText: this.copyrightText
      })
      this.$store.dispatch('fetchSite')
    }
  },
  async beforeMount () {
    this.convertHexColor(this.$store.state.site.theme)

    const data = await this.$bs('/md/options/customize')

    this.homePicUrl = data.homePicUrl
    this.faviconUrl = data.faviconUrl
    this.copyrightPrefer = data.copyrightPrefer
    this.copyrightText = data.copyrightText
  }
}
</script>

<style lang="stylus" scoped>
.option-margin
  margin-top 20px

.btn-margin
  margin-bottom 10px

.custom-rgb-title
  margin-bottom 25px
  margin-top 15px

.knob-margin
  margin-left 15px
</style>
