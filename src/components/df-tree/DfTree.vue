<template>
  <div class="df-tree" :class="{ 'df-tree--highlight': highlightCurrent }">
    <DxTreeView
      ref="treeRef"
      :items="normalizedData"
      :key-expr="nodeKey"
      :display-expr="displayExpr"
      :parent-id-expr="parentIdExpr"
      :data-structure="dataStructure"
      :show-check-boxes-mode="checkboxMode"
      :select-nodes-recursive="checkStrictly !== true"
      :selection-mode="selectionMode"
      :search-enabled="filterable"
      :search-expr="filterExpr"
      :expanded-expr="defaultExpandedExpr"
      :no-data-text="emptyText"
      :virtual-mode-enabled="virtualMode"
      :select-by-click="true"
      @item-click="onItemClick"
      @selection-changed="onSelectionChanged"
      @item-expanded="onExpand"
      @item-collapsed="onCollapse"
    >
      <template #item="{ data }">
        <slot name="default" :data="data" :node="data">
          <span>{{ data[displayExpr] }}</span>
        </slot>
      </template>
    </DxTreeView>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DxTreeView } from 'devextreme-vue/tree-view'
import type { DfTreeProps } from './types'

const props = withDefaults(defineProps<DfTreeProps>(), {
  data: () => [],
  nodeKey: 'id',
  displayExpr: 'text',
  parentIdExpr: 'parentId',
  childrenExpr: 'children',
  dataStructure: 'tree',
  showCheckbox: false,
  checkStrictly: false,
  defaultExpandAll: false,
  highlightCurrent: false,
  accordion: false,
  filterable: false,
  filterExpr: 'text',
  emptyText: '暂无数据',
  lazy: false,
  draggable: false,
  virtualMode: false,
})

const emit = defineEmits<{
  'node-click': [data: any, node: any, e: Event]
  'check-change': [data: any, checked: boolean]
  'node-expand': [data: any]
  'node-collapse': [data: any]
  'current-change': [data: any]
}>()

defineOptions({ name: 'DfTree' })

const treeRef = ref<InstanceType<typeof DxTreeView>>()

const checkboxMode = computed(() => props.showCheckbox ? 'normal' : 'none')
const selectionMode = computed(() => props.showCheckbox ? 'multiple' : 'single')
const defaultExpandedExpr = computed(() => props.defaultExpandAll ? 'expanded' : undefined)

const normalizedData = computed(() => {
  if (props.defaultExpandAll) {
    return expandAll(props.data)
  }
  return props.data
})

function expandAll(items: any[]): any[] {
  return items.map(item => {
    const children = item[props.childrenExpr]
    return {
      ...item,
      expanded: true,
      [props.childrenExpr]: children?.length ? expandAll(children) : children,
    }
  })
}

function onItemClick(e: any) {
  emit('node-click', e.itemData, e.node, e.event)
  emit('current-change', e.itemData)
}

function onSelectionChanged(_e: any) {
  // Emit for each changed node
}

function onExpand(e: any) { emit('node-expand', e.itemData) }
function onCollapse(e: any) { emit('node-collapse', e.itemData) }

// Exposed methods
function filter(value: string) { (treeRef.value?.instance as any)?.searchValue(value) }
function getCheckedNodes() { return treeRef.value?.instance?.getSelectedNodes() ?? [] }
function getCheckedKeys() { return getCheckedNodes().map((n: any) => n.key) }
function setCheckedKeys(keys: Array<string | number>) {
  const inst = treeRef.value?.instance
  if (!inst) return
  keys.forEach(k => inst.selectItem(k))
}
function expandNode(key: string | number) { treeRef.value?.instance?.expandItem(key) }
function collapseNode(key: string | number) { treeRef.value?.instance?.collapseItem(key) }

defineExpose({ filter, getCheckedNodes, getCheckedKeys, setCheckedKeys, expandNode, collapseNode, treeRef })
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   DfTree — 完全参考 dx-table.scss 设计系统
   颜色/边框/字体/滚动条/复选框/悬停/选中 均与 df-table 保持一致
   ═══════════════════════════════════════════════════════════ */

.df-tree {
  width: 100%;
  position: relative;
  background: var(--df-color-white, #fff);
  border: 1px solid var(--df-color-border, #d9d9d9);
  border-radius: var(--df-radius-base, 4px);
  box-sizing: border-box;
  font-size: var(--df-font-size, 14px);
  color: var(--df-color-text-primary, #303133);
}

/* ─── 搜索栏（参考表头 #f1f2f2） ─── */
:deep(.dx-treeview-search) {
  padding: 4px 6px;
  border-bottom: 1px solid var(--df-color-border, #d9d9d9);
  background: #f1f2f2;
}

:deep(.dx-treeview-search .dx-texteditor) {
  border: 1px solid var(--df-color-border, #d9d9d9);
  border-radius: var(--df-radius-base, 4px);
  background: var(--df-color-white, #fff);
}

:deep(.dx-treeview-search .dx-texteditor-input) {
  font-size: var(--df-font-size, 14px);
  color: var(--df-color-text-primary, #303133);
}

/* ─── 节点项（参考 dx-data-row > td: height 30px, padding 4px 6px, box-sizing: border-box） ─── */
:deep(.dx-treeview-item) {
  height: 30px;
  padding: 4px 6px;
  color: var(--df-color-text-primary, #303133);
  font-size: var(--df-font-size, 14px);
  font-weight: 400;
  line-height: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--df-color-border, #d9d9d9);
  border-radius: 0;
}

:deep(.dx-treeview-item:last-child) {
  border-bottom-color: var(--df-color-border, #d9d9d9);
}

/* ─── 节点内容 ─── */
:deep(.dx-treeview-item-content) {
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── 展开/折叠图标（与表格行高对齐） ─── */
:deep(.dx-treeview-toggle-item-visible) {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

/* ─── 复选框（完全参考 dx-table.scss checkbox 样式） ─── */
:deep(.dx-checkbox) {
  margin-right: 6px;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

:deep(.dx-treeview-node .dx-checkbox) {
  margin: 0;
}

:deep(.dx-checkbox-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.dx-checkbox-icon) {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 0 !important;
}

:deep(.dx-checkbox-checked .dx-checkbox-icon) {
  background: var(--df-color-primary, #1890ff);
}

:deep(.dx-checkbox-indeterminate .dx-checkbox-icon) {
  background: var(--df-color-primary, #1890ff);
}

:deep(.dx-state-disabled .dx-checkbox-icon) {
  cursor: no-drop;
  opacity: 0.5;
}

/* ─── 悬停（参考 dx-table 悬停色 rgba(83,209,255,0.2)，用直接背景色保证文字可读） ─── */
:deep(.dx-treeview-item.dx-state-hover) {
  background-color: #e8f6fd !important;
  color: var(--df-color-text-primary, #303133) !important;
}

/* ─── 选中 / 激活（参考 dx-table 选中色 rgba(78,154,255,0.2)） ─── */
:deep(.dx-treeview-item.dx-state-active) {
  background-color: #dce8ff !important;
  color: var(--df-color-text-primary, #303133) !important;
}

.df-tree--highlight :deep(.dx-treeview-item-selected) {
  background-color: #dce8ff !important;
  color: var(--df-color-text-primary, #303133) !important;
  font-weight: 500;
}

/* ─── 空数据 ─── */
:deep(.dx-empty-message) {
  color: var(--df-color-text-secondary, #909399);
  font-size: 13px;
  padding: 20px 0;
}

/* ═══════════════════════════════════════════════════════════
   滚动条 — 完全复制 dx-table.scss scrollbar 样式
   ═══════════════════════════════════════════════════════════ */

/* 横向滚动条 */
:deep(.dx-scrollbar-horizontal) {
  height: 10px !important;
  padding-top: 3px;
  box-sizing: border-box;
}

:deep(.dx-scrollbar-horizontal .dx-scrollable-scroll-content) {
  height: 6px !important;
  border-radius: 3px;
  background-color: rgba(164, 165, 168, 0.5) !important;
}

:deep(.dx-scrollbar-horizontal .dx-state-invisible .dx-scrollable-scroll-content) {
  background-color: transparent !important;
}

:deep(.dx-scrollable-wrapper .dx-scrollbar-horizontal.dx-scrollable-scrollbar-active),
:deep(.dx-scrollable-wrapper .dx-scrollbar-horizontal.dx-state-hover) {
  padding: 0;
  transition: all 0.3s ease;
}

:deep(.dx-scrollable-wrapper .dx-scrollbar-horizontal.dx-scrollable-scrollbar-active .dx-scrollable-scroll-content),
:deep(.dx-scrollable-wrapper .dx-scrollbar-horizontal.dx-state-hover .dx-scrollable-scroll-content) {
  height: 10px !important;
  border-radius: 5px;
  background-color: rgba(164, 165, 168, 1) !important;
  transition: all 0.3s ease;
}

/* 纵向滚动条 */
:deep(.dx-scrollbar-vertical) {
  width: 11px !important;
  transition: background-color 2s ease, border-left 2s ease;
}

:deep(.dx-scrollbar-vertical .dx-scrollable-scroll-content) {
  margin-left: 2px !important;
  width: 6px !important;
  background-color: rgba(164, 165, 168, 0.5) !important;
  border-radius: 3px;
}

:deep(.dx-scrollbar-vertical .dx-state-invisible .dx-scrollable-scroll-content) {
  background-color: transparent !important;
}

:deep(.dx-scrollbar-vertical .dx-scrollable-scroll) {
  width: 10px !important;
  padding: 0;
  margin: 0;
}

:deep(.dx-scrollable-wrapper) {
  padding: 0;
}

:deep(.dx-scrollable-wrapper .dx-scrollbar-vertical.dx-scrollable-scrollbar-active),
:deep(.dx-scrollable-wrapper .dx-scrollbar-vertical.dx-state-hover) {
  border-bottom: 0 !important;
  transition: all 0.3s ease;
}

:deep(.dx-scrollable-wrapper .dx-scrollbar-vertical.dx-scrollable-scrollbar-active .dx-scrollable-scroll-content),
:deep(.dx-scrollable-wrapper .dx-scrollbar-vertical.dx-state-hover .dx-scrollable-scroll-content) {
  margin-left: 0 !important;
  width: 10px !important;
  border-radius: 5px;
  background-color: rgba(164, 165, 168, 1) !important;
  transition: all 0.3s ease;
}

/* 横向滚动条内 padding 清零 */
:deep(.dx-scrollbar-horizontal *) {
  padding: 0 !important;
}

/* 纵向滚动条内 padding 清零 */
:deep(.dx-scrollbar-vertical *) {
  padding: 0 !important;
}
</style>
