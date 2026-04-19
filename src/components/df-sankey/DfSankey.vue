<template>
  <div class="df-sankey">
    <DxSankey
      ref="dxRef"
      :data-source="dataSource"
      :source-field="sourceField"
      :target-field="targetField"
      :weight-field="weightField"
      :node="nodeConfig"
      :link="linkConfig"
      :palette="palette"
      :title="titleConfig"
      :tooltip="tooltipConfig"
      :label="labelConfig"
      :alignment="alignment"
      @node-click="$emit('node-click', $event)"
      @link-click="$emit('link-click', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxSankey } from 'devextreme-vue/sankey'

defineOptions({ name: 'DfSankey' })

const props = withDefaults(defineProps<{
  dataSource?: any[]
  sourceField?: string
  targetField?: string
  weightField?: string
  node?: Record<string, any>
  link?: Record<string, any>
  palette?: string[]
  title?: string | Record<string, any>
  tooltip?: Record<string, any> | boolean
  label?: Record<string, any> | boolean
  alignment?: 'bottom' | 'center' | 'top'
}>(), {
  sourceField: 'source',
  targetField: 'target',
  weightField: 'weight',
  palette: () => ['Material'],
  alignment: 'center',
})

const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)
const tooltipConfig = computed(() => typeof props.tooltip === 'boolean' ? { enabled: props.tooltip } : props.tooltip ?? { enabled: true })
const labelConfig = computed(() => typeof props.label === 'boolean' ? { visible: props.label } : props.label ?? { visible: true })
const nodeConfig = computed(() => props.node ?? { width: 10, padding: 20 })
const linkConfig = computed(() => props.link ?? { colorMode: 'source' })

defineEmits<{
  'node-click': [e: any]
  'link-click': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-sankey {
  display: inline-block;
}
</style>
