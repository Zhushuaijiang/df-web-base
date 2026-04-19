<template>
  <div class="df-diagram">
    <DxDiagram
      ref="dxRef"
      :data-source="dataSource"
      :custom-shapes="customShapes"
      :custom-command-template="customCommandTemplate"
      :toolbox="toolbox"
      :zoom-level="zoomLevel"
      :simple-view="simpleView"
      :show-grid="showGrid"
      :snap-to-grid="snapToGrid"
      :grid-size="gridSize"
      :page-color="pageColor"
      :page-orientation="pageOrientation"
      :units="units"
      :view-toolbar="viewToolbar ?? undefined"
      :main-toolbar="mainToolbar ?? undefined"
      :history-toolbar="historyToolbar ?? undefined"
      :properties-panel="propertiesPanel ?? undefined"
      :auto-zoom-mode="autoZoomMode"
      :full-screen="fullScreen"
      @request-edit-operation="$emit('request-edit-operation', $event)"
      @request-layout-update="$emit('request-layout-update', $event)"
      @selection-changed="$emit('selection-changed', $event)"
      @content-ready="$emit('content-ready', $event)"
      @custom-command="$emit('custom-command', $event)"
      @item-dbl-click="$emit('item-dbl-click', $event)"
      @focus-item="$emit('focus-item', $event)"
    >
      <slot />
    </DxDiagram>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxDiagram } from 'devextreme-vue/diagram'
import type { DfDiagramProps } from './types'

defineOptions({ name: 'DfDiagram' })

withDefaults(defineProps<DfDiagramProps>(), {
  simpleView: false,
  showGrid: true,
  snapToGrid: true,
  units: 'cm',
  autoZoomMode: 'disabled',
  fullScreen: false,
})

defineEmits<{
  'request-edit-operation': [e: any]
  'request-layout-update': [e: any]
  'selection-changed': [e: any]
  'content-ready': [e: any]
  'custom-command': [e: any]
  'item-dbl-click': [e: any]
  'focus-item': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

function exportTo(format: string) {
  return dxRef.value?.instance?.exportTo(format)
}

function importDiagram(data: string) {
  return dxRef.value?.instance?.import(data)
}

function getBoundingBox() {
  return dxRef.value?.instance?.getBoundingBox()
}

defineExpose({ getInstance, exportTo, importDiagram, getBoundingBox })
</script>

<style scoped>
.df-diagram {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
