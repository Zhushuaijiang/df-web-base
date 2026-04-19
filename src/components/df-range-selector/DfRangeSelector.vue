<template>
  <div class="df-range-selector">
    <DxRangeSelector
      ref="dxRef"
      :data-source="dataSource"
      :value="modelValue"
      :start-value="startValue"
      :end-value="endValue"
      :chart="chart"
      :scale="scale"
      :slider-marker="sliderMarker"
      :slider-handle="sliderHandle"
      :shutter="shutter"
      :background="background"
      :behavior="behavior"
      :margin="margin"
      :title="titleConfig"
      @value-changed="onValueChanged"
    >
      <slot />
    </DxRangeSelector>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxRangeSelector } from 'devextreme-vue/range-selector'
import type { DfRangeSelectorProps } from './types'

defineOptions({ name: 'DfRangeSelector' })

const props = withDefaults(defineProps<DfRangeSelectorProps>(), {})

const emit = defineEmits<{
  'update:modelValue': [val: any]
  change: [val: any]
}>()

const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)

const dxRef = ref()

function onValueChanged(e: any) {
  emit('update:modelValue', e.value)
  emit('change', e.value)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-range-selector {
  display: block;
  width: 100%;
}
</style>
