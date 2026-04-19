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
</style>
