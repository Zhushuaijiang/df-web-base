<template>
  <DxButton
    :text="text"
    :type="dxType"
    :styling-mode="dxStylingMode"
    :icon="icon"
    :disabled="isDisabled"
    :hint="hint"
    :class="rootClasses"
    :element-attr="elementAttr"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <template v-if="$slots.default" #content>
      <div class="df-button__content">
        <DfLoading v-if="loading" :loading="true" class="df-button__loading" />
        <i v-else-if="icon" :class="iconClass" class="df-button__icon" />
        <span class="df-button__text"><slot /></span>
      </div>
    </template>
  </DxButton>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import DfLoading from '../df-loading/DfLoading.vue'
import { DF_UI_KEY } from '../../install'

import type { DfButtonProps, ButtonType } from './types'

const props = withDefaults(defineProps<DfButtonProps>(), {
  type: 'default',
  size: 'default',
  loading: false,
  disabled: false,
  plain: false,
  round: false,
  circle: false,
  debounce: 500,
})

const emit = defineEmits<{
  click: [e: Event]
}>()

defineOptions({ name: 'DfButton' })

inject(DF_UI_KEY, undefined)

/** 防抖锁 */
const debouncing = ref(false)

/** DxButton type 映射 */
const dxType = computed(() => {
  const map: Record<ButtonType, string> = {
    default: 'normal',
    primary: 'default',
    success: 'success',
    warning: 'normal',
    danger: 'danger',
    info: 'normal',
    text: 'normal',
  }
  return map[props.type] ?? 'normal'
})

/** DxButton stylingMode 映射 */
const dxStylingMode = computed(() => {
  if (props.type === 'text') return 'text'
  if (props.plain) return 'outlined'
  return 'contained'
})

const isDisabled = computed(() => props.disabled || props.loading)

const rootClasses = computed(() => [
  'df-button',
  `df-button--${props.type}`,
  `df-button--${props.size}`,
  {
    'df-button--plain': props.plain,
    'df-button--round': props.round,
    'df-button--circle': props.circle,
    'df-button--loading': props.loading,
    'df-button--disabled': isDisabled.value,
  },
])

const iconClass = computed(() => props.icon ?? '')

const elementAttr = computed(() => ({
  class: rootClasses.value.filter((c) => typeof c === 'string').join(' '),
}))

function handleClick(e: { event?: Event }) {
  if (isDisabled.value || debouncing.value) return

  emit('click', e.event ?? new Event('click'))

  // 防抖
  if (props.debounce > 0) {
    debouncing.value = true
    setTimeout(() => {
      debouncing.value = false
    }, props.debounce)
  }
}
</script>

<style scoped>
.df-button__content {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.df-button :deep(.dx-button) {
  box-sizing: border-box;
  border-radius: var(--df-radius-sm, 4px);
}

.df-button :deep(.dx-button-content) {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: var(--df-radius-sm, 4px);
  white-space: nowrap;
}

.df-button__loading {
  position: static;
  background: transparent;
  width: 14px;
  height: 14px;
}

.df-button--default {
  --dx-color-button-bg: var(--df-color-bg-surface, #fff);
}

.df-button--primary :deep(.dx-button-content) {
  background: var(--df-color-primary, #1976d2);
  color: var(--df-color-primary-contrast, #fff);
}

.df-button--success :deep(.dx-button-content) {
  background: var(--df-color-success, #4caf50);
  color: #fff;
}

.df-button--warning :deep(.dx-button-content) {
  background: var(--df-color-warning, #ff9800);
  color: #fff;
}

.df-button--danger :deep(.dx-button-content) {
  background: var(--df-color-error, #f44336);
  color: #fff;
}

.df-button--info :deep(.dx-button-content) {
  background: var(--df-color-info, #2196f3);
  color: #fff;
}

.df-button--text :deep(.dx-button-content) {
  background: transparent;
  color: var(--df-color-primary, #1976d2);
  border: none;
}

.df-button--mini {
  font-size: var(--df-font-size-xs, 12px);
}
.df-button--mini :deep(.dx-button) {
  min-height: 24px;
}
.df-button--mini :deep(.dx-button-content) {
  min-height: 24px;
  padding: 0 8px;
  font-size: var(--df-font-size-xs, 12px);
}

.df-button--default {
  font-size: var(--df-font-size-sm, 14px);
}
.df-button--default :deep(.dx-button) {
  min-height: 32px;
}
.df-button--default :deep(.dx-button-content) {
  min-height: 32px;
  padding: 0 16px;
  font-size: var(--df-font-size-sm, 14px);
}

.df-button--small {
  font-size: var(--df-font-size-sm, 13px);
}
.df-button--small :deep(.dx-button) {
  min-height: 30px;
}
.df-button--small :deep(.dx-button-content) {
  min-height: 30px;
  padding: 0 12px;
  font-size: var(--df-font-size-sm, 13px);
}

.df-button--large {
  font-size: var(--df-font-size-lg, 16px);
}
.df-button--large :deep(.dx-button) {
  min-height: 36px;
}
.df-button--large :deep(.dx-button-content) {
  min-height: 36px;
  padding: 0 20px;
  font-size: var(--df-font-size-lg, 16px);
}

.df-button--round {
  border-radius: 20px;
}
.df-button--round :deep(.dx-button-content) {
  border-radius: 20px;
}

.df-button--circle {
  border-radius: 50%;
  padding: 8px;
}
.df-button--circle :deep(.dx-button-content) {
  border-radius: 50%;
}

.df-button--plain.df-button--primary :deep(.dx-button-content) {
  background: transparent;
  color: var(--df-color-primary, #1976d2);
  border: 1px solid var(--df-color-primary, #1976d2);
}

.df-button--plain.df-button--success :deep(.dx-button-content) {
  background: transparent;
  color: var(--df-color-success, #4caf50);
  border: 1px solid var(--df-color-success, #4caf50);
}

.df-button--plain.df-button--danger :deep(.dx-button-content) {
  background: transparent;
  color: var(--df-color-error, #f44336);
  border: 1px solid var(--df-color-error, #f44336);
}

.df-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
