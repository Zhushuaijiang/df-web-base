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

.df-button__loading {
  position: static;
  background: transparent;
  width: 14px;
  height: 14px;
}

.df-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
