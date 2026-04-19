<template>
  <div class="df-pivot-grid">
    <DxPivotGrid
      ref="dxRef"
      :data-source="dataSource"
      :allow-sorting-by-summary="allowSortingBySummary"
      :allow-filtering="allowFiltering"
      :allow-expand-all="allowExpandAll"
      :show-borders="showBorders"
      :show-column-grand-totals="showColumnGrandTotals"
      :show-row-grand-totals="showRowGrandTotals"
      :show-totals="showTotals"
      :show-column-totals="showColumnTotals"
      :show-row-totals="showRowTotals"
      :row-header-layout="rowHeaderLayout"
      :word-wrap-enabled="wordWrapEnabled"
      :height="height"
      :width="width"
      @cell-click="$emit('cell-click', $event)"
      @cell-prepared="$emit('cell-prepared', $event)"
      @content-ready="$emit('content-ready', $event)"
      @context-menu-preparing="$emit('context-menu-preparing', $event)"
    >
      <slot />
    </DxPivotGrid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxPivotGrid } from 'devextreme-vue/pivot-grid'
import type { DfPivotGridProps } from './types'

defineOptions({ name: 'DfPivotGrid' })

withDefaults(defineProps<DfPivotGridProps>(), {
  allowSortingBySummary: true,
  allowFiltering: true,
  allowExpandAll: true,
  showBorders: true,
  showColumnGrandTotals: true,
  showRowGrandTotals: true,
  showTotals: true,
  showColumnTotals: true,
  showRowTotals: true,
  rowHeaderLayout: 'standard',
  wordWrapEnabled: false,
})

defineEmits<{
  'cell-click': [e: any]
  'cell-prepared': [e: any]
  'content-ready': [e: any]
  'context-menu-preparing': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

function getDataSource() {
  return dxRef.value?.instance?.getDataSource()
}

function bindChart(chart: any, integrationOptions?: Record<string, any>) {
  return dxRef.value?.instance?.bindChart(chart, integrationOptions)
}

function updateDimensions() {
  return dxRef.value?.instance?.updateDimensions()
}

defineExpose({ getInstance, getDataSource, bindChart, updateDimensions })
</script>

<style scoped>
.df-pivot-grid {
  display: block;
  width: 100%;
}

</style>
