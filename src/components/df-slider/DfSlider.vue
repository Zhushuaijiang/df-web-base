<template>
  <div
    class="df-slider"
    :class="{
      'df-slider--disabled': disabled,
      'df-slider--vertical': vertical,
      'df-slider--with-input': showInput,
      [`df-slider--${size}`]: size,
    }"
  >
    <DxSlider
      ref="sliderRef"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :read-only="readonly"
      :tooltip="tooltipOptions"
      :show-range="range"
      :width="vertical ? undefined : '100%'"
      :height="vertical ? height : undefined"
      @value-changed="onValueChanged"
    />

    <DxNumberBox
      v-if="showInput"
      class="df-slider__input"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :read-only="readonly"
      :width="inputWidth"
      :show-spin-buttons="true"
      @value-changed="onValueChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxSlider } from 'devextreme-vue/slider'
import { DxNumberBox } from 'devextreme-vue/number-box'

const props = withDefaults(defineProps<{
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  showTooltip?: boolean
  tooltipFormat?: string
  showInput?: boolean
  inputWidth?: number | string
  vertical?: boolean
  height?: string | number
  range?: boolean
  size?: 'large' | 'default' | 'small'
  marks?: Record<number, string>
}>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  readonly: false,
  showTooltip: true,
  showInput: false,
  inputWidth: 130,
  vertical: false,
  height: '200px',
  range: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
  input: [val: number]
}>()

defineOptions({ name: 'DfSlider' })

const tooltipOptions = computed(() => ({
  enabled: props.showTooltip,
  position: 'top',
  showMode: 'onHover',
  format: props.tooltipFormat,
}))

function onValueChanged(e: any) {
  const val: number = e.value ?? 0
  emit('update:modelValue', val)
  emit('change', val)
  emit('input', val)
}
</script>

<style scoped>
.df-slider {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.df-slider--vertical {
  flex-direction: column;
  width: auto;
}

.df-slider__input {
  flex-shrink: 0;
}

.df-slider--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
