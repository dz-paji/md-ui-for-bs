<template>
  <base-skeleton>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <div class="card">
          <div class="card-title">
            {{ $trans('plugins.skinUtilities.title') }}
          </div>
          <div class="card-content">
            <p><a href="/user/skin-utilities/converter">
              {{ $trans('plugins.skinUtilities.converter') }}
            </a></p>
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
  </base-skeleton>
</template>

<script>
import BaseSkeleton from '../../user/Base'
import title from '../../../mixins/title'

export default {
  components: {
    BaseSkeleton
  },
  mixins: [title]
}
</script>
