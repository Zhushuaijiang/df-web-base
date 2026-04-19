<template>
  <div class="df-space" :class="classes" :style="gapStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'default' | 'large' | number
  wrap?: boolean
  alignment?: 'stretch' | 'center' | 'flex-start' | 'flex-end'
  fill?: boolean
}>(), {
  direction: 'horizontal',
  size: 'default',
  wrap: false,
  alignment: 'center',
  fill: false,
})

defineOptions({ name: 'DfSpace' })

const SIZE_MAP: Record<string, number> = { small: 8, default: 12, large: 16 }

const classes = computed(() => [
  `df-space--${props.direction}`,
  { 'df-space--wrap': props.wrap, 'df-space--fill': props.fill },
])

const gapStyle = computed(() => {
  const gap = typeof props.size === 'number' ? props.size : SIZE_MAP[props.size] ?? 12
  return { gap: `${gap}px`, alignItems: props.alignment }
})
</script>

<style scoped>
.df-space { display: inline-flex; }
.df-space--horizontal { flex-direction: row; }
.df-space--vertical { flex-direction: column; width: 100%; }
.df-space--wrap { flex-wrap: wrap; }
.df-space--fill { display: flex; }
.df-space--fill > :deep(*) { flex: 1; }
</style>
