<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title">
            {{ $trans('plugins.skinUtilities.title') }}
          </div>
          <div class="card-content">
            <p><a href="/user/skin-utilities/editor-1">
              {{ $trans('plugins.skinUtilities.editor1') }}
            </a></p>
            <p><a href="/user/skin-utilities/editor-2">
              {{ $trans('plugins.skinUtilities.editor2') }}
            </a></p>
          </div>
        </div>
      </div>

      <div class="auto">
        <div class="card">
          <div class="card-content">
            <ul>
              <li v-for="n in 3" :key="n">
                {{ $trans(`plugins.skinUtilities.notice${n}`) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row gutter sm-column layout-padding">
      <div class="auto">
        <div class="card">
          <div class="card-title">
            {{ $trans('plugins.skinUtilities.converter') }}
          </div>
          <div class="card-content">
            <div>{{ $trans('plugins.skinUtilities.converterNotice') }}</div>
            <q-uploader
              url="/"
              extensions=".png"
              hide-upload-button
              :labels="uploaderLabels"
              @add="convert"
              @remove="remove"
            ></q-uploader>
            <div>
              <img :src="originSkin" />
              <img :src="converted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import BaseSkeleton from '../../user/Base'
import title from '../../../mixins/title'

export default {
  components: {
    BaseSkeleton
  },
  mixins: [title],
  data () {
    return {
      originSkin: null,
      converted: null,
      reader: new FileReader()
    }
  },
  computed: {
    uploaderLabels () {
      return {
        add: this.$trans('vendor.pickFile'),
        remove: this.$trans('vendor.remove')
      }
    }
  },
  methods: {
    convert (files) {
      if (files.length !== 1) {
        return 0
      }
      this.reader.readAsDataURL(files[0])
    },
    remove () {
      this.originSkin = this.converted = null
    }
  },
  beforeMount () {
    this.reader.onload = event => {
      this.originSkin = event.target.result

      const source = new Image()
      source.src = event.target.result

      function copy (sc, dc, sx, sy, sw, sh, dx, dy, dw, dh, f) {
        dc.drawImage(
          sc,
          sx * f,
          sy * f,
          sw * f,
          sh * f,
          dx * f,
          dy * f,
          dw * f,
          dh * f
        )
      }

      function makeCanvas (w, h) {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        return canvas
      }

      // Extract the source image width and height
      const sw = source.width || 0
      const sh = source.height || 0

      // Ensure the source has a 2:1 ratio for width:height
      if (!(sw % 64 === 0 && sw === (sh * 2))) {
        return 0
      }

      // The destination image will be a square with the same
      // dimensions as the source width
      const dw = sw
      const dh = sw

      // Create the canvas and context
      const sCanvas = makeCanvas(sw, sh)
      const sContext = sCanvas.getContext('2d', { alpha: true })
      const dCanvas = makeCanvas(dw, dh)
      const dContext = dCanvas.getContext('2d', { alpha: true })

      // Draw the source image onto the top left corner of the source canvas
      sContext.drawImage(source, 0, 0)

      // Also draw the source image onto
      // the top left corner of the destination canvas
      dContext.drawImage(source, 0, 0)

      // Determine the multiplication factor for when the source image
      // is a multiple of 64 pixels
      const f = sw / 64

      // Save the current transformation state of the destination canvas
      dContext.save()

      // Flip the destination canvas horizontally
      // so when we draw the new parts they will be flipped
      dContext.translate(dw, 0)
      dContext.scale(-1, 1)

      // Copying: Leg
      copy(sCanvas, dContext, 0, 20, 4, 12, 36, 52, 4, 12, f) // Right
      copy(sCanvas, dContext, 4, 20, 4, 12, 40, 52, 4, 12, f) // Front
      copy(sCanvas, dContext, 8, 20, 4, 12, 44, 52, 4, 12, f) // Left
      copy(sCanvas, dContext, 12, 20, 4, 12, 32, 52, 4, 12, f) // Back
      copy(sCanvas, dContext, 4, 16, 4, 4, 40, 48, 4, 4, f) // Top
      copy(sCanvas, dContext, 8, 16, 4, 4, 36, 48, 4, 4, f) // Bottom

      // Copying: Arm
      copy(sCanvas, dContext, 40, 20, 4, 12, 20, 52, 4, 12, f) // Right
      copy(sCanvas, dContext, 44, 20, 4, 12, 24, 52, 4, 12, f) // Front
      copy(sCanvas, dContext, 48, 20, 4, 12, 28, 52, 4, 12, f) // Left
      copy(sCanvas, dContext, 52, 20, 4, 12, 16, 52, 4, 12, f) // Back
      copy(sCanvas, dContext, 44, 16, 4, 4, 24, 48, 4, 4, f) // Top
      copy(sCanvas, dContext, 48, 16, 4, 4, 20, 48, 4, 4, f) // Bottom

      // Return the destination back to it's original unflipped state
      dContext.restore()
      this.converted = dCanvas.toDataURL('image/png')
    }
  }
}
</script>
