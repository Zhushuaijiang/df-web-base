<template>
  <div class="df-chart" :style="containerStyle">
    <DxChart
      ref="chartRef"
      :data-source="dataSource"
      :rotated="rotated"
      :palette="(palette as any) ?? 'Material'"
      @point-click="$emit('point-click', $event)"
      @legend-click="$emit('legend-click', $event)"
      @done="$emit('done', $event)"
    >
      <DxTitle v-if="title" :text="title" />

      <DxCommonSeriesSettings :argument-field="argumentField ?? 'arg'" />

      <DxSeries
        v-for="(s, idx) in series"
        :key="s.valueField + idx"
        :value-field="s.valueField"
        :name="s.name ?? s.valueField"
        :type="s.type ?? 'bar'"
        :color="s.color"
        :axis="s.axis"
      >
        <DxLabel v-if="s.label?.visible" :visible="true" :format="s.label.format" />
      </DxSeries>

      <DxTooltip
        :enabled="tooltipEnabled ?? true"
        :format="tooltipFormat"
        :shared="series.length > 1"
      />

      <DxLegend
        :visible="showLegend ?? true"
        :horizontal-alignment="legendHAlign"
        :vertical-alignment="legendVAlign"
      />

      <DxArgumentAxis>
        <DxAxisLabel v-if="argumentAxisLabel" :text="argumentAxisLabel" />
      </DxArgumentAxis>

      <DxValueAxis>
        <DxAxisLabel v-if="valueAxisLabel" :text="valueAxisLabel" />
      </DxValueAxis>

      <DxScrollBar v-if="scrollEnabled" :visible="true" />
      <DxZoomAndPan v-if="zoomEnabled" argument-axis="both" />

      <DxExport v-if="exportEnabled" :enabled="true" />

      <DxCommonAnnotationSettings v-if="crosshairEnabled" />

      <DxAnimation :enabled="animation ?? true" />
    </DxChart>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import type { DfChartSeries } from './types'

import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxLegend,
  DxTooltip,
  DxTitle,
  DxArgumentAxis,
  DxValueAxis,
  DxLabel as DxAxisLabel,
  DxExport,
  DxScrollBar,
  DxZoomAndPan,
  DxAnimation,
  DxCommonAnnotationSettings,
} from 'devextreme-vue/chart'

const props = defineProps({
  dataSource: { type: Array as PropType<any[]>, required: true },
  series: { type: Array as PropType<DfChartSeries[]>, required: true },
  argumentField: { type: String, default: 'arg' },
  title: { type: String, default: undefined },
  palette: { type: [String, Array] as PropType<string | string[]>, default: 'Material' },
  rotated: { type: Boolean, default: false },
  showLegend: { type: Boolean, default: true },
  legendPosition: { type: String as PropType<'top' | 'bottom' | 'left' | 'right'>, default: 'bottom' },
  tooltipEnabled: { type: Boolean, default: true },
  tooltipFormat: { type: [String, Object], default: undefined },
  argumentAxisLabel: { type: String, default: undefined },
  valueAxisLabel: { type: String, default: undefined },
  valueAxisFormat: { type: [String, Object], default: undefined },
  height: { type: [Number, String], default: 400 },
  width: { type: [Number, String], default: '100%' },
  animation: { type: Boolean, default: true },
  crosshairEnabled: { type: Boolean, default: false },
  zoomEnabled: { type: Boolean, default: false },
  scrollEnabled: { type: Boolean, default: false },
  exportEnabled: { type: Boolean, default: false },
})

defineEmits<{
  'point-click': [e: any]
  'legend-click': [e: any]
  'done': [e: any]
}>()

const chartRef = ref()

const containerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

const legendHAlign = computed(() =>
  props.legendPosition === 'left' ? 'left' : props.legendPosition === 'right' ? 'right' : 'center',
)
const legendVAlign = computed(() =>
  props.legendPosition === 'top' ? 'top' : props.legendPosition === 'bottom' ? 'bottom' : 'top',
)

function getInstance() {
  return chartRef.value?.instance
}

function refresh() {
  getInstance()?.render()
}

defineExpose({ getInstance, refresh })
</script>

<style scoped>
.df-chart {
  width: 100%;
}
</style>
