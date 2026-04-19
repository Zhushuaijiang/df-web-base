<template>
  <div class="df-tree-select" :class="{ 'df-tree-select--disabled': disabled, [`df-tree-select--${size}`]: size }">
    <DxDropDownBox
      ref="dropDownRef"
      :value="displayValue"
      :disabled="disabled"
      :read-only="readonly"
      :placeholder="placeholder"
      :show-clear-button="clearable"
      :width="width"
      :opened="opened"
      :display-expr="displayExpr"
      :value-expr="valueExpr"
      @opened="opened = true"
      @closed="opened = false"
    >
      <template #content>
        <DxTreeView
          ref="treeRef"
          :items="data"
          :key-expr="valueExpr"
          :display-expr="displayExpr"
          :parent-id-expr="parentIdExpr"
          :data-structure="dataStructure"
          :show-check-boxes-mode="multiple ? 'normal' : 'none'"
          :selection-mode="multiple ? 'multiple' : 'single'"
          :search-enabled="filterable"
          :select-nodes-recursive="checkStrictly !== true"
          :select-by-click="true"
          @item-click="onItemClick"
          @selection-changed="onSelectionChanged"
        />
      </template>
    </DxDropDownBox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DxDropDownBox } from 'devextreme-vue/drop-down-box'
import { DxTreeView } from 'devextreme-vue/tree-view'

const props = withDefaults(defineProps<{
  modelValue?: string | number | Array<string | number> | null
  data?: any[]
  valueExpr?: string
  displayExpr?: string
  parentIdExpr?: string
  dataStructure?: 'tree' | 'plain'
  multiple?: boolean
  checkStrictly?: boolean
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  filterable?: boolean
  collapseTags?: boolean
  size?: 'large' | 'default' | 'small'
  width?: string | number
}>(), {
  data: () => [],
  valueExpr: 'id',
  displayExpr: 'text',
  parentIdExpr: 'parentId',
  dataStructure: 'tree',
  multiple: false,
  checkStrictly: false,
  placeholder: '请选择',
  disabled: false,
  readonly: false,
  clearable: true,
  filterable: false,
  collapseTags: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: any]
  change: [val: any]
}>()

defineOptions({ name: 'DfTreeSelect' })

const opened = ref(false)
const treeRef = ref()
const dropDownRef = ref()

const displayValue = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.join(', ')
  }
  return props.modelValue ?? ''
})

function onItemClick(e: any) {
  if (!props.multiple) {
    const val = e.itemData[props.valueExpr]
    emit('update:modelValue', val)
    emit('change', val)
    opened.value = false
  }
}

function onSelectionChanged(_e: any) {
  if (props.multiple) {
    const nodes = treeRef.value?.instance?.getSelectedNodes() ?? []
    const keys = nodes.map((n: any) => n.key)
    emit('update:modelValue', keys)
    emit('change', keys)
  }
}

defineExpose({ treeRef, dropDownRef })
</script>

<style scoped>
.df-tree-select { display: inline-flex; }
.df-tree-select--disabled { opacity: 0.6; pointer-events: none; }
</style>
