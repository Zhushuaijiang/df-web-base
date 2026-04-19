<template>
  <div class="df-sparkline">
    <DxSparkline
      ref="dxRef"
      :data-source="dataSource"
      :value-field="valueField"
      :type="type"
      :line-color="lineColor"
      :line-width="lineWidth"
      :show-min-max="showMinMax"
      :show-first-last="showFirstLast"
      :bar-positive-color="barPositiveColor"
      :bar-negative-color="barNegativeColor"
      :win-color="winColor"
      :loss-color="lossColor"
      :first-last-color="firstLastColor"
      :min-color="minColor"
      :max-color="maxColor"
      :point-size="pointSize"
      :margin="margin"
      :tooltip="tooltipConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxSparkline } from 'devextreme-vue/sparkline'

defineOptions({ name: 'DfSparkline' })

export type SparklineType = 'line' | 'spline' | 'stepline' | 'area' | 'bar' | 'winloss' | 'splinearea' | 'steparea'

const props = withDefaults(defineProps<{
  dataSource?: any[] | Record<string, any>[]
  valueField?: string
  type?: SparklineType
  lineColor?: string
  lineWidth?: number
  showMinMax?: boolean
  showFirstLast?: boolean
  barPositiveColor?: string
  barNegativeColor?: string
  winColor?: string
  lossColor?: string
  firstLastColor?: string
  minColor?: string
  maxColor?: string
  pointSize?: number
  margin?: Record<string, any>
  tooltipEnabled?: boolean
}>(), {
  valueField: 'value',
  type: 'line',
  lineWidth: 2,
  showMinMax: false,
  showFirstLast: false,
  pointSize: 4,
  margin: () => ({}),
  tooltipEnabled: true,
})

const tooltipConfig = computed(() => ({ enabled: props.tooltipEnabled }))
const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-sparkline {
  display: inline-block;
}
</style>
