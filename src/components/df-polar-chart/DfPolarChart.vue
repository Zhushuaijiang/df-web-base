<template>
  <div class="df-polar-chart">
    <DxPolarChart
      ref="dxRef"
      :data-source="dataSource"
      :use-spider-web="useSpiderWeb"
      :series="series"
      :common-series-settings="commonSeriesSettings"
      :argument-field="argumentField"
      :value-field="valueField"
      :palette="palette"
      :legend="legendConfig"
      :tooltip="tooltipConfig"
      :title="titleConfig"
      :animation="animation"
      @series-click="$emit('series-click', $event)"
      @point-click="$emit('point-click', $event)"
      @legend-click="$emit('legend-click', $event)"
    >
      <slot />
    </DxPolarChart>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxPolarChart } from 'devextreme-vue/polar-chart'

defineOptions({ name: 'DfPolarChart' })

const props = withDefaults(defineProps<{
  dataSource?: any[]
  useSpiderWeb?: boolean
  series?: any[]
  commonSeriesSettings?: Record<string, any>
  argumentField?: string
  valueField?: string
  palette?: string[]
  legend?: Record<string, any> | boolean
  tooltip?: Record<string, any> | boolean
  title?: string | Record<string, any>
  animation?: Record<string, any> | boolean
}>(), {
  argumentField: 'arg',
  valueField: 'val',
  palette: () => ['Material'],
  useSpiderWeb: false,
  animation: () => ({ enabled: true, duration: 1000 }),
})

const legendConfig = computed(() => typeof props.legend === 'boolean' ? { visible: props.legend } : props.legend ?? { visible: true })
const tooltipConfig = computed(() => typeof props.tooltip === 'boolean' ? { enabled: props.tooltip } : props.tooltip ?? { enabled: true })
const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)

defineEmits<{
  'series-click': [e: any]
  'point-click': [e: any]
  'legend-click': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-polar-chart {
  display: inline-block;
}
</style>
