<template>
  <li class="df-timeline-item">
    <div class="df-timeline-item__tail" />
    <div class="df-timeline-item__node" :class="nodeClasses" :style="nodeStyle">
      <slot name="dot">
        <i v-if="icon" :class="icon" />
      </slot>
    </div>
    <div class="df-timeline-item__wrapper">
      <div v-if="!hideTimestamp && placement === 'top'" class="df-timeline-item__timestamp df-timeline-item__timestamp--top">{{ timestamp }}</div>
      <div class="df-timeline-item__content"><slot /></div>
      <div v-if="!hideTimestamp && placement === 'bottom'" class="df-timeline-item__timestamp df-timeline-item__timestamp--bottom">{{ timestamp }}</div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  timestamp?: string
  hideTimestamp?: boolean
  placement?: 'top' | 'bottom'
  type?: '' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
  size?: 'normal' | 'large'
  icon?: string
}>(), {
  placement: 'bottom',
  type: '',
  size: 'normal',
})

defineOptions({ name: 'DfTimelineItem' })

const nodeClasses = computed(() => [
  `df-timeline-item__node--${props.size}`,
  props.type ? `df-timeline-item__node--${props.type}` : '',
])

const nodeStyle = computed(() => props.color ? { borderColor: props.color, color: props.color } : {})
</script>

<style scoped>
.df-timeline-item { position: relative; padding-bottom: 20px; padding-left: 28px; }
.df-timeline-item:last-child .df-timeline-item__tail { display: none; }
.df-timeline-item__tail { position: absolute; left: 5px; top: 0; height: 100%; border-left: 2px solid var(--df-color-border-light, #e4e7ed); }
.df-timeline-item__node {
  position: absolute; left: 0; top: 0;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--df-color-border-light, #e4e7ed); display: flex; align-items: center; justify-content: center;
  z-index: 1;
}
.df-timeline-item__node--large { width: 16px; height: 16px; left: -2px; }
.df-timeline-item__node--primary { background: var(--df-color-primary, #409eff); }
.df-timeline-item__node--success { background: var(--df-color-success, #67c23a); }
.df-timeline-item__node--warning { background: var(--df-color-warning, #e6a23c); }
.df-timeline-item__node--danger { background: var(--df-color-error, #f56c6c); }
.df-timeline-item__node--info { background: var(--df-color-info, #909399); }
.df-timeline-item__content { font-size: 14px; color: var(--df-color-text-primary, #303133); }
.df-timeline-item__timestamp { font-size: 13px; color: var(--df-color-text-secondary, #909399); }
.df-timeline-item__timestamp--top { margin-bottom: 4px; }
.df-timeline-item__timestamp--bottom { margin-top: 4px; }
</style>
