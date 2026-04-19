<template>
  <div class="df-pie-chart" :style="containerStyle">
    <DxPieChart
      ref="chartRef"
      :data-source="dataSource"
      :type="type ?? 'doughnut'"
      :inner-radius="type === 'doughnut' ? (innerRadius ?? 0.6) : 0"
      :palette="(palette as any) ?? 'Material'"
      @point-click="$emit('point-click', $event)"
      @legend-click="$emit('legend-click', $event)"
      @done="$emit('done', $event)"
    >
      <DxTitle v-if="title" :text="title" />

      <DxSeries :argument-field="argumentField ?? 'arg'" :value-field="valueField ?? 'val'">
        <DxLabel
          :visible="labelVisible ?? true"
          :format="labelFormat"
          :connector="{ visible: labelConnector ?? true }"
          position="columns"
        />
      </DxSeries>

      <DxTooltip :enabled="tooltipEnabled ?? true" :format="tooltipFormat" :customize-tooltip="customizeTooltip" />

      <DxLegend
        :visible="showLegend ?? true"
        :horizontal-alignment="legendHAlign"
        :vertical-alignment="legendVAlign"
      />

      <DxExport v-if="exportEnabled" :enabled="true" />

      <DxAnimation :enabled="animation ?? true" />

      <slot name="center" />
    </DxPieChart>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'

import {
  DxPieChart,
  DxSeries,
  DxLabel,
  DxLegend,
  DxTooltip,
  DxTitle,
  DxExport,
  DxAnimation,
} from 'devextreme-vue/pie-chart'

const props = defineProps({
  dataSource: { type: Array as PropType<any[]>, required: true },
  argumentField: { type: String, default: 'arg' },
  valueField: { type: String, default: 'val' },
  title: { type: String, default: undefined },
  palette: { type: [String, Array] as PropType<string | string[]>, default: 'Material' },
  type: { type: String as PropType<'pie' | 'doughnut'>, default: 'doughnut' },
  innerRadius: { type: Number, default: 0.6 },
  showLegend: { type: Boolean, default: true },
  legendPosition: { type: String as PropType<'top' | 'bottom' | 'left' | 'right'>, default: 'bottom' },
  tooltipEnabled: { type: Boolean, default: true },
  tooltipFormat: { type: [String, Object], default: undefined },
  labelVisible: { type: Boolean, default: true },
  labelFormat: { type: [String, Object], default: undefined },
  labelConnector: { type: Boolean, default: true },
  height: { type: [Number, String], default: 400 },
  width: { type: [Number, String], default: '100%' },
  animation: { type: Boolean, default: true },
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

function customizeTooltip(pointInfo: any) {
  return {
    text: `${pointInfo.argumentText}: ${pointInfo.valueText} (${pointInfo.percentText})`,
  }
}

function getInstance() {
  return chartRef.value?.instance
}

function refresh() {
  getInstance()?.render()
}

defineExpose({ getInstance, refresh })
</script>

<style scoped>
.df-pie-chart {
  width: 100%;
}
</style>
