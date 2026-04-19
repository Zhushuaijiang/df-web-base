<template>
  <div class="df-card-view">
    <DxCardView
      ref="dxRef"
      :data-source="dataSource"
      :key-expr="keyExpr"
      :columns="columns"
      :selection-mode="selectionMode"
      :selected-item-keys="selectedItemKeys"
      :filter-value="filterValue"
      :search-panel="searchPanel"
      :paging="paging"
      :pager="pager"
      :sorting="sorting"
      :width="width"
      :height="height"
      @selection-changed="$emit('selection-changed', $event)"
      @item-click="$emit('item-click', $event)"
      @content-ready="$emit('content-ready', $event)"
    >
      <template v-if="$slots.item" #item="{ data }">
        <slot name="item" :data="data" />
      </template>
    </DxCardView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxCardView } from 'devextreme-vue/card-view'
import type { DfCardViewProps } from './types'

defineOptions({ name: 'DfCardView' })

withDefaults(defineProps<DfCardViewProps>(), {
  selectionMode: 'none',
})

defineEmits<{
  'selection-changed': [e: any]
  'item-click': [e: any]
  'content-ready': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

function getSelectedRowKeys() {
  return dxRef.value?.instance?.getSelectedRowKeys()
}

defineExpose({ getInstance, getSelectedRowKeys })
</script>

<style scoped>
.df-card-view {
  display: block;
  width: 100%;
}
</style>
