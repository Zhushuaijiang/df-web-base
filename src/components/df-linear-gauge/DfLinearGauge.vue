<template>
  <div class="df-linear-gauge">
    <DxLinearGauge
      ref="dxRef"
      :value="modelValue"
      :subvalues="subvalues"
      :geometry="geometry"
      :scale="scale"
      :range-container="rangeContainer"
      :value-indicator="valueIndicator"
      :subvalue-indicator="subvalueIndicator"
      :title="titleConfig"
      :tooltip="tooltipConfig"
      :animation="animation"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxLinearGauge } from 'devextreme-vue/linear-gauge'

defineOptions({ name: 'DfLinearGauge' })

const props = withDefaults(defineProps<{
  modelValue?: number
  subvalues?: number[]
  geometry?: Record<string, any>
  scale?: Record<string, any>
  rangeContainer?: Record<string, any>
  valueIndicator?: Record<string, any>
  subvalueIndicator?: Record<string, any>
  title?: string | Record<string, any>
  tooltip?: Record<string, any>
  animation?: Record<string, any>
}>(), {
  animation: () => ({ enabled: true, duration: 1000 }),
})

const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)
const tooltipConfig = computed(() => typeof props.tooltip === 'boolean' ? { enabled: props.tooltip } : props.tooltip)

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-linear-gauge {
  display: inline-block;
}
</style>
