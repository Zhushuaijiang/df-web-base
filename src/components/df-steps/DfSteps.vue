<template>
  <div class="df-steps" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, computed, toRef } from 'vue'

const props = withDefaults(defineProps<{
  active?: number
  direction?: 'horizontal' | 'vertical'
  alignCenter?: boolean
  simple?: boolean
  finishStatus?: 'wait' | 'process' | 'finish' | 'success' | 'error'
  processStatus?: 'wait' | 'process' | 'finish' | 'success' | 'error'
}>(), {
  active: 0,
  direction: 'horizontal',
  alignCenter: false,
  simple: false,
  finishStatus: 'finish',
  processStatus: 'process',
})

defineOptions({ name: 'DfSteps' })

const classes = computed(() => [
  `df-steps--${props.direction}`,
  { 'df-steps--simple': props.simple, 'df-steps--center': props.alignCenter },
])

provide('dfSteps', {
  active: toRef(props, 'active'),
  direction: props.direction,
  finishStatus: props.finishStatus,
  processStatus: props.processStatus,
  simple: props.simple,
})
</script>

<style scoped>
.df-steps { display: flex; }
.df-steps--horizontal { flex-direction: row; }
.df-steps--vertical { flex-direction: column; }
.df-steps--center { text-align: center; }
</style>
