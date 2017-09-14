<template>
  <div :class="{ 'option-margin': !first }">
    <div class="caption">{{ caption }}</div>
    <slot></slot>
    <small>{{ description }}</small>
    <q-tooltip v-if="hint" anchor="bottom middle" self="top middle">
      {{ hint }}
    </q-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    first: {
      type: Boolean,
      default: false
    },
    caption: String,
    hint: String,
    description: String
  }
}
</script>

<style lang="stylus" scoped>
.option-margin
  margin-top 20px

small
  display block
</style>
