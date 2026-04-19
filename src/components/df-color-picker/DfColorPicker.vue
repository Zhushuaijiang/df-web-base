<template>
  <div class="df-color-picker" :class="{ 'df-color-picker--disabled': disabled, [`df-color-picker--${size}`]: size }">
    <DxColorBox
      :value="modelValue"
      :disabled="disabled"
      :read-only="readonly"
      :show-clear-button="clearable"
      :edit-alpha-channel="showAlpha"
      :placeholder="placeholder"
      :width="width"
      :apply-button-text="confirmText"
      :cancel-button-text="cancelText"
      @value-changed="onValueChanged"
    />

    <!-- Preview swatch -->
    <div
      v-if="showPreview"
      class="df-color-picker__preview"
      :style="{ backgroundColor: modelValue || 'transparent' }"
    />
  </div>
</template>

<script setup lang="ts">
import { DxColorBox } from 'devextreme-vue/color-box'

withDefaults(defineProps<{
  modelValue?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showAlpha?: boolean
  showPreview?: boolean
  placeholder?: string
  width?: string | number
  size?: 'large' | 'default' | 'small'
  confirmText?: string
  cancelText?: string
  predefine?: string[]
}>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  clearable: true,
  showAlpha: false,
  showPreview: true,
  placeholder: '请选择颜色',
  size: 'default',
  confirmText: '确定',
  cancelText: '取消',
})

const emit = defineEmits<{
  'update:modelValue': [val: string]
  change: [val: string]
  activeChange: [val: string]
}>()

defineOptions({ name: 'DfColorPicker' })

function onValueChanged(e: any) {
  emit('update:modelValue', e.value as string)
  emit('change', e.value as string)
}
</script>

<style scoped>
.df-color-picker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.df-color-picker__preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--df-color-border, #dcdfe6);
  flex-shrink: 0;
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  position: relative;
  overflow: hidden;
}

.df-color-picker__preview::after {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
}

.df-color-picker--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.df-color-picker--small .df-color-picker__preview {
  width: 20px;
  height: 20px;
}

.df-color-picker--large .df-color-picker__preview {
  width: 28px;
  height: 28px;
}
</style>
