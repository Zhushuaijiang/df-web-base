<template>
  <div
    class="df-grid-layout"
    :class="{ 'df-grid-layout--equal-height': equalHeight }"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import type { DfGridLayoutProps } from './types'

const props = withDefaults(defineProps<DfGridLayoutProps>(), {
  cols: 3,
  rowGap: 16,
  colGap: 16,
  equalHeight: false,
})

defineOptions({ name: 'DfGridLayout' })

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920)

function onResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const effectiveCols = computed(() => {
  if (!props.responsive) return props.cols
  const w = windowWidth.value
  if (w < 768 && props.responsive.sm != null) return props.responsive.sm
  if (w < 992 && props.responsive.md != null) return props.responsive.md
  if (w < 1200 && props.responsive.lg != null) return props.responsive.lg
  return props.cols
})

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${effectiveCols.value}, 1fr)`,
  rowGap: `${props.rowGap}px`,
  columnGap: `${props.colGap}px`,
}))
</script>

<style scoped>
.df-grid-layout {
  width: 100%;
}
.df-grid-layout--equal-height > :deep(*) {
  height: 100%;
}
</style>
