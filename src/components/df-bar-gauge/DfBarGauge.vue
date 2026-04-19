<template>
  <div class="df-bar-gauge">
    <DxBarGauge
      ref="dxRef"
      :values="values"
      :start-value="startValue"
      :end-value="endValue"
      :base-value="baseValue"
      :palette="palette"
      :label="labelConfig"
      :tooltip="tooltipConfig"
      :legend="legendConfig"
      :title="titleConfig"
      :geometry="geometry"
      :animation="animation"
      @tooltip-hidden="$emit('tooltip-hidden')"
      @tooltip-shown="$emit('tooltip-shown')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxBarGauge } from 'devextreme-vue/bar-gauge'

defineOptions({ name: 'DfBarGauge' })

const props = withDefaults(defineProps<{
  values?: number[]
  startValue?: number
  endValue?: number
  baseValue?: number
  palette?: string[]
  label?: Record<string, any> | boolean
  tooltip?: Record<string, any> | boolean
  legend?: Record<string, any> | boolean
  title?: string | Record<string, any>
  geometry?: Record<string, any>
  animation?: Record<string, any> | boolean
}>(), {
  values: () => [],
  startValue: 0,
  endValue: 100,
  baseValue: 0,
  palette: () => ['Material'],
  animation: () => ({ enabled: true, duration: 1000 }),
})

const labelConfig = computed(() => typeof props.label === 'boolean' ? { visible: props.label } : props.label)
const tooltipConfig = computed(() => typeof props.tooltip === 'boolean' ? { enabled: props.tooltip } : props.tooltip)
const legendConfig = computed(() => typeof props.legend === 'boolean' ? { visible: props.legend } : props.legend)
const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)

defineEmits<{
  'tooltip-hidden': []
  'tooltip-shown': []
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-bar-gauge {
  display: inline-block;
}
</style>
