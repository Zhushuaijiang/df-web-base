<template>
  <div class="df-range-slider" :class="{ 'df-range-slider--disabled': disabled, [`df-range-slider--${size}`]: size }">
    <DxRangeSlider
      ref="dxRef"
      :start="modelValue?.[0] ?? start"
      :end="modelValue?.[1] ?? end"
      :min="min"
      :max="max"
      :step="step"
      :label="label"
      :tooltip="tooltipConfig"
      :show-range="showRange"
      :disabled="disabled"
      :width="width"
      @value-changed="onValueChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DxRangeSlider } from 'devextreme-vue/range-slider'
import { DF_UI_KEY } from '../../install'

defineOptions({ name: 'DfRangeSlider' })

inject(DF_UI_KEY)

const props = withDefaults(defineProps<{
  modelValue?: [number, number] | null
  start?: number
  end?: number
  min?: number
  max?: number
  step?: number
  label?: Record<string, any>
  tooltip?: Record<string, any>
  showRange?: boolean
  disabled?: boolean
  width?: number | string
  size?: 'large' | 'default' | 'small'
}>(), {
  start: 0,
  end: 100,
  min: 0,
  max: 100,
  step: 1,
  showRange: true,
  disabled: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: [number, number]]
  change: [val: [number, number]]
}>()

const tooltipConfig = computed(() => props.tooltip)

const dxRef = ref()

function onValueChanged(e: any) {
  const val: [number, number] = [e.start, e.end]
  emit('update:modelValue', val)
  emit('change', val)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-range-slider {
  width: 100%;
}
.df-range-slider--disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
