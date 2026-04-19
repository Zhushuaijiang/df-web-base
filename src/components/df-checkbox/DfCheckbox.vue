<template>
  <label class="df-checkbox" :class="rootClasses" @click.prevent="handleToggle">
    <DxCheckBox
      :value="isChecked"
      :disabled="disabled"
      :class="{ 'df-checkbox__inner': true }"
      @value-changed="onValueChanged"
    />
    <span v-if="$slots.default || label" class="df-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxCheckBox } from 'devextreme-vue/check-box'

export interface DfCheckboxProps {
  /** 绑定值 */
  modelValue?: boolean | string[] | number[]
  /** 选中时的值（用于复选框组） */
  checkedValue?: string | number
  /** 标签文本 */
  label?: string
  /** 禁用 */
  disabled?: boolean
  /** 不确定状态 */
  indeterminate?: boolean
  /** 尺寸 */
  size?: 'default' | 'small' | 'mini'
}

const props = withDefaults(defineProps<DfCheckboxProps>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | (string | number)[]]
  change: [value: boolean | (string | number)[]]
}>()

defineOptions({ name: 'DfCheckbox' })

/** 判断是否选中（支持 boolean 和数组模式） */
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue) && props.checkedValue !== undefined) {
    return (props.modelValue as (string | number)[]).includes(props.checkedValue)
  }
  return !!props.modelValue
})

const rootClasses = computed(() => [
  `df-checkbox--${props.size}`,
  {
    'df-checkbox--checked': isChecked.value,
    'df-checkbox--disabled': props.disabled,
    'df-checkbox--indeterminate': props.indeterminate,
  },
])

function handleToggle() {
  if (props.disabled) return

  // 数组模式
  if (Array.isArray(props.modelValue) && props.checkedValue !== undefined) {
    const arr = [...props.modelValue] as (string | number)[]
    const idx = arr.indexOf(props.checkedValue)
    if (idx > -1) {
      arr.splice(idx, 1)
    } else {
      arr.push(props.checkedValue)
    }
    emit('update:modelValue', arr)
    emit('change', arr)
    return
  }

  // 布尔模式
  const newVal = !isChecked.value
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

function onValueChanged(_e: any) {
  // DxCheckBox 自身事件也走此路径（保证一致）
}
</script>

<style scoped>
.df-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  user-select: none;
  font-size: var(--df-font-size-md, 14px);
  color: var(--df-color-text-primary, #333);
}

.df-checkbox--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.df-checkbox__label {
  line-height: 1.4;
}

.df-checkbox--mini {
  font-size: var(--df-font-size-xs, 12px);
}

.df-checkbox--small {
  font-size: var(--df-font-size-sm, 13px);
}
</style>
