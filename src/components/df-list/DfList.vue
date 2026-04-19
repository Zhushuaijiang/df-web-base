<template>
  <div class="df-list">
    <DxList
      ref="dxRef"
      :data-source="dataSource"
      :items="items"
      :selected-items="selectedItems"
      :selection-mode="selectionMode"
      :search-enabled="searchEnabled"
      :search-mode="(searchMode as any)"
      :search-editor-options="searchEditorOptions"
      :page-load-mode="(pageLoadMode as any)"
      :key-expr="keyExpr"
      :display-expr="displayExpr"
      :grouped="grouped"
      :collapsible-groups="collapsibleGroups"
      :height="height"
      :width="width"
      :disabled="disabled"
      :hover-state-enabled="hoverStateEnabled"
      :focus-state-enabled="focusStateEnabled"
      :active-state-enabled="activeStateEnabled"
      :allow-item-deleting="allowItemDeleting"
      :item-delete-mode="itemDeleteMode"
      :menu-items="menuItems"
      :menu-mode="menuMode"
      @selection-changed="onSelectionChanged"
      @item-click="$emit('item-click', $event)"
      @item-deleted="$emit('item-deleted', $event)"
      @item-reordered="$emit('item-reordered', $event)"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
      <template v-if="$slots.group" #group="{ data }">
        <slot name="group" :data="data" />
      </template>
    </DxList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxList } from 'devextreme-vue/list'

defineOptions({ name: 'DfList' })

withDefaults(defineProps<{
  dataSource?: any[] | Record<string, any>
  items?: any[]
  selectedItems?: any[]
  selectionMode?: 'none' | 'single' | 'multiple' | 'all'
  searchEnabled?: boolean
  searchMode?: string
  searchEditorOptions?: Record<string, any>
  pageLoadMode?: string
  keyExpr?: string
  displayExpr?: string | ((data: any) => string)
  grouped?: boolean
  collapsibleGroups?: boolean
  height?: number | string
  width?: number | string
  disabled?: boolean
  hoverStateEnabled?: boolean
  focusStateEnabled?: boolean
  activeStateEnabled?: boolean
  allowItemDeleting?: boolean
  itemDeleteMode?: 'context' | 'static' | 'toggle' | 'slideButton' | 'slideItem' | 'swipe' | 'static'
  menuItems?: any[]
  menuMode?: 'context' | 'slide'
}>(), {
  selectionMode: 'none',
  searchEnabled: false,
  searchMode: 'contains',
  pageLoadMode: 'scrollBottom',
  grouped: false,
  collapsibleGroups: false,
  disabled: false,
  hoverStateEnabled: true,
  focusStateEnabled: true,
  activeStateEnabled: true,
  allowItemDeleting: false,
  itemDeleteMode: 'static',
  menuMode: 'context',
})

const emit = defineEmits<{
  'selection-changed': [e: any]
  'item-click': [e: any]
  'item-deleted': [e: any]
  'item-reordered': [e: any]
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
.df-list {
  display: block;
}

</style>
