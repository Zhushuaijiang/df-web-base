<template>
  <DxScrollView
    class="df-scrollbar"
    :direction="direction"
    :show-scrollbar="showScrollbar"
    :use-native="native"
    :height="height"
    :width="width"
    :bounce-enabled="false"
  >
    <slot />
  </DxScrollView>
</template>

<script setup lang="ts">
import { DxScrollView } from 'devextreme-vue/scroll-view'

withDefaults(defineProps<{
  height?: string | number
  width?: string | number
  direction?: 'vertical' | 'horizontal' | 'both'
  native?: boolean
  showScrollbar?: 'onScroll' | 'onHover' | 'always' | 'never'
  noresize?: boolean
}>(), {
  direction: 'vertical',
  native: false,
  showScrollbar: 'onHover',
})

defineOptions({ name: 'DfScrollbar' })

</script>

<style scoped>
.df-scrollbar { position: relative; overflow: hidden; }
</style>
