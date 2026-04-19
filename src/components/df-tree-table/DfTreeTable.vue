<template>
  <div class="df-tree-table" :class="{ 'df-tree-table--bordered': border }">
    <DxTreeList
      ref="treeListRef"
      :data-source="dataSource"
      :key-expr="rowKey"
      :parent-id-expr="parentIdExpr"
      :columns="dxColumns"
      :show-borders="border"
      :show-row-lines="stripe"
      :show-column-lines="border"
      :column-auto-width="columnAutoWidth"
      :word-wrap-enabled="wordWrap"
      :allow-column-reordering="allowColumnReorder"
      :allow-column-resizing="allowColumnResize"
      :column-resizing-mode="'widget'"
      :root-value="rootValue"
      :expanded-row-keys="expandedRowKeys"
      :auto-expand-all="defaultExpandAll"
      :height="height"
      :no-data-text="emptyText"
      :hover-state-enabled="highlightRow"
      @row-click="onRowClick"
      @selection-changed="onSelectionChanged"
      @row-expanded="onRowExpanded"
      @row-collapsed="onRowCollapsed"
    >
      <!-- Selection -->
      <DxSelection
        v-if="showCheckbox"
        :mode="selectionMode"
        :recursive="checkStrictly !== true"
        :allow-select-all="showCheckbox"
      />

      <!-- Paging (disabled for tree) -->
      <DxPaging :enabled="false" />

      <!-- Filter row -->
      <DxFilterRow :visible="filterable" />

      <!-- Header filter -->
      <DxHeaderFilter :visible="showHeaderFilter" />

      <!-- Sorting -->
      <DxSorting :mode="sortable ? 'multiple' : 'none'" />

      <!-- Scrolling -->
      <DxScrolling mode="virtual" />

      <!-- Column slots -->
      <template v-for="col in columns" :key="col.field">
        <DxColumn
          v-if="col.slot"
          :data-field="col.field"
          :caption="col.title"
          :width="col.width"
          :min-width="col.minWidth"
          :fixed="(!!col.fixed as any)"
          :alignment="col.align"
          :sort-order="col.sortOrder"
          :allow-sorting="col.sortable !== false"
          :cell-template="col.slot"
        />
      </template>

      <!-- Custom cell templates -->
      <template v-for="col in slotColumns" :key="`tpl-${col.field}`" #[col.slot!]="{ data }">
        <slot :name="col.slot" :row="data.data" :column="col" :row-index="data.rowIndex" />
      </template>

      <!-- Toolbar -->
      <DxToolbar v-if="$slots.toolbar">
        <DxItem location="before" template="toolbarTemplate" />
        <template #toolbarTemplate>
          <slot name="toolbar" />
        </template>
      </DxToolbar>
    </DxTreeList>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  DxTreeList,
  DxColumn,
  DxSelection,
  DxPaging,
  DxFilterRow,
  DxHeaderFilter,
  DxSorting,
  DxScrolling,
  DxToolbar,
  DxItem,
} from 'devextreme-vue/tree-list'
import type { DfTreeTableProps } from './types'

const props = withDefaults(defineProps<DfTreeTableProps>(), {
  dataSource: () => [],
  columns: () => [],
  rowKey: 'id',
  parentIdExpr: 'parentId',
  rootValue: 0,
  defaultExpandAll: false,
  border: true,
  stripe: false,
  emptyText: '暂无数据',
  showCheckbox: false,
  checkStrictly: false,
  selectionMode: 'multiple',
  filterable: false,
  showHeaderFilter: false,
  sortable: true,
  highlightRow: true,
  columnAutoWidth: true,
  wordWrap: false,
  allowColumnReorder: false,
  allowColumnResize: true,
})

const emit = defineEmits<{
  'row-click': [row: any, e: any]
  'selection-change': [rows: any[]]
  'expand': [row: any]
  'collapse': [row: any]
}>()

defineOptions({ name: 'DfTreeTable' })

const treeListRef = ref()

const dxColumns = computed(() => {
  return props.columns
    .filter(col => !col.slot)
    .map(col => ({
      dataField: col.field,
      caption: col.title,
      width: col.width,
      minWidth: col.minWidth,
      fixed: !!col.fixed,
      fixedPosition: col.fixed === 'right' ? 'right' as const : undefined,
      alignment: col.align,
      sortOrder: col.sortOrder,
      allowSorting: col.sortable !== false,
      customizeText: col.formatter
        ? (cellInfo: any) => col.formatter!(cellInfo.value, cellInfo.data)
        : undefined,
    }))
})

const slotColumns = computed(() => props.columns.filter(col => !!col.slot))

function onRowClick(e: any) {
  if (e.rowType === 'data') {
    emit('row-click', e.data, e)
  }
}

function onSelectionChanged(e: any) {
  emit('selection-change', e.selectedRowsData ?? [])
}

function onRowExpanded(e: any) {
  emit('expand', e.key)
}

function onRowCollapsed(e: any) {
  emit('collapse', e.key)
}

// Expose instance methods
function getInstance() {
  return treeListRef.value?.instance
}

function getSelectedRows(): any[] {
  return getInstance()?.getSelectedRowsData() ?? []
}

function expandAll() {
  const inst = getInstance()
  inst?.forEachNode((node: any) => {
    inst.expandRow(node.key)
  })
}

function collapseAll() {
  const inst = getInstance()
  inst?.forEachNode((node: any) => {
    inst.collapseRow(node.key)
  })
}

function refresh() {
  getInstance()?.refresh()
}

defineExpose({
  getInstance,
  getSelectedRows,
  expandAll,
  collapseAll,
  refresh,
})
</script>

<style scoped>
.df-tree-table {
  width: 100%;
}
</style>
