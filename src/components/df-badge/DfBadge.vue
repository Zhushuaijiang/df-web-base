<template>
  <div class="df-badge" :class="{ 'df-badge--dot': isDot }">
    <slot />
    <transition name="df-zoom-in-center">
      <sup v-if="!hidden && (content || isDot)" class="df-badge__content" :class="contentClasses">
        {{ isDot ? '' : content }}
      </sup>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DfBadgeProps {
  value?: string | number
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

const props = withDefaults(defineProps<DfBadgeProps>(), {
  value: '',
  isDot: false,
  hidden: false,
  type: 'danger',
})

defineOptions({ name: 'DfBadge' })

const content = computed(() => {
  if (props.isDot) return ''
  if (typeof props.value === 'number' && typeof props.max === 'number' && props.value > props.max) {
    return `${props.max}+`
  }
  return `${props.value}`
})

const contentClasses = computed(() => [
  `df-badge__content--${props.type}`,
  { 'df-badge__content--fixed': !!useSlots().default },
])

import { useSlots } from 'vue'
</script>

<style scoped>
.df-badge { position: relative; display: inline-flex; vertical-align: middle; }
.df-badge__content {
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px; height: 18px; min-width: 18px; padding: 0 5px;
  border-radius: 10px; color: #fff; white-space: nowrap;
  box-sizing: border-box;
}
.df-badge__content--fixed { position: absolute; top: 0; right: 0; transform: translate(50%, -50%); z-index: 1; }
.df-badge__content--primary { background: var(--df-color-primary, #1976d2); }
.df-badge__content--success { background: var(--df-color-success, #52C41A); }
.df-badge__content--warning { background: var(--df-color-warning, #FAAD14); }
.df-badge__content--danger { background: var(--df-color-error, #F5222D); }
.df-badge__content--info { background: var(--df-color-secondary-500, #6B7790); }
.df-badge--dot .df-badge__content { width: 8px; height: 8px; min-width: 8px; padding: 0; border-radius: 50%; }
.df-zoom-in-center-enter-active, .df-zoom-in-center-leave-active { transition: all .2s ease; }
.df-zoom-in-center-enter-from, .df-zoom-in-center-leave-to { opacity: 0; transform: scale(0); }
</style>
