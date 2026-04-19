<template>
  <div class="df-funnel">
    <DxFunnel
      ref="dxRef"
      :data-source="dataSource"
      :argument-field="argumentField"
      :value-field="valueField"
      :color-field="colorField"
      :palette="palette"
      :sort-data-field="sortDataField"
      :sort-order="sortOrder"
      :label="labelConfig"
      :tooltip="tooltipConfig"
      :title="titleConfig"
      :item="itemConfig"
      :margin="margin"
      :algorithm="(algorithm as any)"
      :inverted="inverted"
      @item-click="$emit('item-click', $event)"
      @selection-changed="$emit('selection-changed', $event)"
      @hover-changed="$emit('hover-changed', $event)"
    >
      <template v-if="$slots.item" #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxFunnel>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxFunnel } from 'devextreme-vue/funnel'

defineOptions({ name: 'DfFunnel' })

const props = withDefaults(defineProps<{
  dataSource?: any[]
  argumentField?: string
  valueField?: string
  colorField?: string
  palette?: string[]
  sortDataField?: string
  sortOrder?: 'asc' | 'desc' | 'none'
  label?: Record<string, any> | boolean
  tooltip?: Record<string, any> | boolean
  title?: string | Record<string, any>
  item?: Record<string, any>
  margin?: Record<string, any>
  algorithm?: string
  inverted?: boolean
}>(), {
  argumentField: 'argument',
  valueField: 'value',
  palette: () => ['Material'],
  algorithm: 'dynamicHeight',
  inverted: false,
})

const labelConfig = computed(() => typeof props.label === 'boolean' ? { visible: props.label } : props.label ?? { visible: true, showForZeroValues: true })
const tooltipConfig = computed(() => typeof props.tooltip === 'boolean' ? { enabled: props.tooltip } : props.tooltip ?? { enabled: true })
const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)
const itemConfig = computed(() => props.item ?? { border: { visible: true } })

defineEmits<{
  'item-click': [e: any]
  'selection-changed': [e: any]
  'hover-changed': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-funnel {
  display: inline-block;
}
</style>
