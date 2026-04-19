<template>
  <div class="df-radio-group" :class="rootClasses">
    <label
      v-for="item in normalizedOptions"
      :key="item.value"
      class="df-radio"
      :class="{
        'df-radio--checked': modelValue === item.value,
        'df-radio--disabled': disabled || item.disabled,
      }"
      @click.prevent="handleSelect(item)"
    >
      <span class="df-radio__input">
        <span class="df-radio__inner" />
      </span>
      <span class="df-radio__label">{{ item.label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface RadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface DfRadioProps {
  /** 绑定值 */
  modelValue?: string | number
  /** 选项列表 */
  options?: RadioOption[]
  /** 禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: 'default' | 'small' | 'mini'
  /** 按钮模式 */
  button?: boolean
}

const props = withDefaults(defineProps<DfRadioProps>(), {
  options: () => [],
  disabled: false,
  size: 'default',
  button: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

defineOptions({ name: 'DfRadio' })

const normalizedOptions = computed(() => props.options)

const rootClasses = computed(() => [
  `df-radio-group--${props.size}`,
  {
    'df-radio-group--button': props.button,
    'df-radio-group--disabled': props.disabled,
  },
])

function handleSelect(item: RadioOption) {
  if (props.disabled || item.disabled) return
  if (props.modelValue === item.value) return
  emit('update:modelValue', item.value)
  emit('change', item.value)
}
</script>

<style scoped>
.df-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 16px;
}

.df-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  user-select: none;
  font-size: var(--df-font-size-md, 14px);
  color: var(--df-color-text-primary, #333);
}

.df-radio--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.df-radio__input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.df-radio__inner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--df-color-border, #ccc);
  background: #fff;
  transition: all var(--df-transition-fast, 150ms);
  position: relative;
}

.df-radio--checked .df-radio__inner {
  border-color: var(--df-color-primary, #1976d2);
}

.df-radio--checked .df-radio__inner::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--df-color-primary, #1976d2);
}

.df-radio__label {
  line-height: 1.4;
}

/* 按钮模式 */
.df-radio-group--button {
  gap: 0;
}

.df-radio-group--button .df-radio {
  padding: 6px 16px;
  border: 1px solid var(--df-color-border, #e0e0e0);
  margin-left: -1px;
}

.df-radio-group--button .df-radio:first-child {
  margin-left: 0;
  border-radius: var(--df-radius-sm, 4px) 0 0 var(--df-radius-sm, 4px);
}

.df-radio-group--button .df-radio:last-child {
  border-radius: 0 var(--df-radius-sm, 4px) var(--df-radius-sm, 4px) 0;
}

.df-radio-group--button .df-radio__input {
  display: none;
}

.df-radio-group--button .df-radio--checked {
  background: var(--df-color-primary, #1976d2);
  color: #fff;
  border-color: var(--df-color-primary, #1976d2);
  z-index: 1;
}

/* 尺寸 */
.df-radio-group--mini .df-radio {
  font-size: var(--df-font-size-xs, 12px);
}
.df-radio-group--mini .df-radio__inner {
  width: 12px;
  height: 12px;
}
.df-radio-group--mini .df-radio--checked .df-radio__inner::after {
  width: 6px;
  height: 6px;
}
.df-radio-group--mini.df-radio-group--button .df-radio {
  padding: 3px 10px;
}

.df-radio-group--small .df-radio {
  font-size: var(--df-font-size-sm, 13px);
}
.df-radio-group--small .df-radio__inner {
  width: 14px;
  height: 14px;
}
.df-radio-group--small .df-radio--checked .df-radio__inner::after {
  width: 7px;
  height: 7px;
}
.df-radio-group--small.df-radio-group--button .df-radio {
  padding: 4px 12px;
}
</style>
