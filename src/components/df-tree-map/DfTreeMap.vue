<template>
  <div class="df-tree-map">
    <DxTreeMap
      ref="dxRef"
      :data-source="dataSource"
      :value-field="valueField"
      :label-field="labelField"
      :colorizer="colorizer"
      :tooltip="tooltipConfig"
      :title="titleConfig"
      :interaction-with-group="interactionWithGroup"
      :max-depth="maxDepth"
      :layout-direction="(layoutDirection as any)"
      @node-click="$emit('node-click', $event)"
      @node-hover-changed="$emit('node-hover-changed', $event)"
      @node-selection-changed="$emit('node-selection-changed', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxTreeMap } from 'devextreme-vue/tree-map'

defineOptions({ name: 'DfTreeMap' })

const props = withDefaults(defineProps<{
  dataSource?: any[]
  valueField?: string
  labelField?: string
  colorizer?: Record<string, any>
  tooltip?: Record<string, any> | boolean
  title?: string | Record<string, any>
  interactionWithGroup?: boolean
  maxDepth?: number
  layoutDirection?: string
}>(), {
  valueField: 'value',
  labelField: 'name',
  interactionWithGroup: false,
  layoutDirection: 'squarified',
})

const tooltipConfig = computed(() => typeof props.tooltip === 'boolean' ? { enabled: props.tooltip } : props.tooltip ?? { enabled: true })
const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)

defineEmits<{
  'node-click': [e: any]
  'node-hover-changed': [e: any]
  'node-selection-changed': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-tree-map {
  display: inline-block;
}
</style>
