<template>
  <div class="df-accordion">
    <DxAccordion
      ref="dxRef"
      :data-source="dataSource"
      :selected-items="selectedItems"
      :multiple="multiple"
      :collapsible="collapsible"
      :animation-duration="animationDuration"
      :defer-rendering="deferRendering"
      :key-expr="keyExpr"
      :display-expr="displayExpr"
      @selection-changed="onSelectionChanged"
      @item-title-click="$emit('item-title-click', $event)"
      @item-click="$emit('item-click', $event)"
    >
      <template #title="{ data }">
        <slot name="title" :data="data" />
      </template>
      <template #item="{ data }">
        <slot name="item" :data="data" />
      </template>
    </DxAccordion>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxAccordion } from 'devextreme-vue/accordion'

defineOptions({ name: 'DfAccordion' })

withDefaults(defineProps<{
  dataSource?: any[]
  selectedItems?: any[]
  multiple?: boolean
  collapsible?: boolean
  animationDuration?: number
  deferRendering?: boolean
  keyExpr?: string
  displayExpr?: string | ((data: any) => string)
}>(), {
  multiple: false,
  collapsible: false,
  animationDuration: 300,
  deferRendering: true,
})

const emit = defineEmits<{
  'selection-changed': [e: any]
  'item-title-click': [e: any]
  'item-click': [e: any]
}>()

const dxRef = ref()

function onSelectionChanged(e: any) {
  emit('selection-changed', e)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-accordion {
  display: block;
}

</style>
