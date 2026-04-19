<template>
  <div class="df-step" :class="classes" :style="stepStyle">
    <div class="df-step__head">
      <div class="df-step__line"><i class="df-step__line-inner" :style="lineStyle" /></div>
      <div class="df-step__icon">
        <slot name="icon">
          <i v-if="icon" :class="icon" />
          <span v-else-if="currentStatus === 'finish' || currentStatus === 'success'" class="df-step__icon-check">✓</span>
          <span v-else-if="currentStatus === 'error'" class="df-step__icon-error">✗</span>
          <span v-else class="df-step__icon-number">{{ stepIndex + 1 }}</span>
        </slot>
      </div>
    </div>
    <div class="df-step__main">
      <div class="df-step__title"><slot name="title">{{ title }}</slot></div>
      <div v-if="description || $slots.description" class="df-step__description"><slot name="description">{{ description }}</slot></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, getCurrentInstance } from 'vue'
import type { Ref } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  icon?: string
  status?: 'wait' | 'process' | 'finish' | 'success' | 'error'
}>()

defineOptions({ name: 'DfStep' })

const parent = inject<{
  active: Ref<number>; finishStatus: string; processStatus: string; simple: boolean
}>('dfSteps')!

const instance = getCurrentInstance()!
const stepIndex = computed(() => {
  const siblings = instance.parent?.subTree?.children
  if (Array.isArray(siblings)) {
    return siblings.findIndex((vn: any) => vn?.component?.uid === instance.uid)
  }
  return 0
})

const currentStatus = computed(() => {
  if (props.status) return props.status
  const active = parent.active.value
  if (stepIndex.value < active) return parent.finishStatus
  if (stepIndex.value === active) return parent.processStatus
  return 'wait'
})

const classes = computed(() => [
  `df-step--${currentStatus.value}`,
  { 'df-step--simple': parent.simple },
])

const stepStyle = computed(() => ({ flexBasis: `${100 / Math.max(Number(instance.parent?.subTree?.children?.length ?? 1), 1)}%` }))
const lineStyle = computed(() => {
  const active = parent.active.value
  if (stepIndex.value < active) return { borderColor: 'var(--df-color-primary, #409eff)', width: '100%' }
  return {}
})
</script>

<style scoped>
.df-step { flex-shrink: 0; position: relative; }
.df-step__head { display: flex; align-items: center; position: relative; }
.df-step__icon {
  width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; border: 2px solid #c0c4cc; background: #fff; z-index: 1;
  color: #c0c4cc; flex-shrink: 0; box-sizing: border-box;
}
.df-step__line { position: absolute; top: 50%; left: 28px; right: 0; height: 0; border-top: 2px solid #c0c4cc; }
.df-step__line-inner { display: block; border-top: 2px solid transparent; width: 0; transition: all .3s; }
.df-step__main { padding: 4px 12px 0 0; }
.df-step__title { font-size: 14px; color: var(--df-color-text-secondary, #909399); line-height: 28px; }
.df-step__description { font-size: 12px; color: var(--df-color-text-placeholder, #c0c4cc); margin-top: 2px; }

.df-step--process .df-step__icon { border-color: var(--df-color-primary, #409eff); color: var(--df-color-primary, #409eff); }
.df-step--process .df-step__title { color: var(--df-color-text-primary, #303133); font-weight: 700; }
.df-step--finish .df-step__icon, .df-step--success .df-step__icon { border-color: var(--df-color-primary, #409eff); color: var(--df-color-primary, #409eff); }
.df-step--finish .df-step__title, .df-step--success .df-step__title { color: var(--df-color-primary, #409eff); }
.df-step--finish .df-step__line { border-color: var(--df-color-primary, #409eff); }
.df-step--error .df-step__icon { border-color: #f56c6c; color: #f56c6c; }
.df-step--error .df-step__title { color: #f56c6c; }
.df-step__icon-check { color: inherit; }
.df-step__icon-error { color: inherit; }
</style>
