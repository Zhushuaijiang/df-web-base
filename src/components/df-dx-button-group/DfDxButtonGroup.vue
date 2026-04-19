<template>
  <div class="df-dx-button-group">
    <DxButtonGroup
      ref="dxRef"
      :data-source="dataSource"
      :items="items"
      :selected-item-keys="selectedItemKeys"
      :key-expr="keyExpr"
      :selection-mode="selectionMode"
      :styling-mode="stylingMode"
      :disabled="disabled"
      @selection-changed="$emit('selection-changed', $event)"
      @item-click="$emit('item-click', $event)"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxButtonGroup } from 'devextreme-vue/button-group'

/**
 * DfDxButtonGroup — 基于 DevExtreme DxButtonGroup 封装的按钮组
 *
 * 与纯 Vue 实现的 DfButtonGroup 区别：
 * - DfDxButtonGroup：支持单选/多选模式、数据源绑定、选中状态管理
 * - DfButtonGroup：轻量纯 Vue 实现，仅做布局排列
 */
defineOptions({ name: 'DfDxButtonGroup' })

/** @props */
withDefaults(defineProps<{
  /** DxButtonGroup 独有：支持远程数据源绑定，纯 Vue 版仅支持 items */
  dataSource?: any[]
  items?: any[]
  /** DxButtonGroup 独有：受控选中项的 key 列表，支持双向绑定 */
  selectedItemKeys?: any[]
  keyExpr?: string
  /** DxButtonGroup 独有：选择模式 — 纯 Vue 版无选中状态管理 */
  selectionMode?: 'single' | 'multiple' | 'none'
  stylingMode?: 'contained' | 'outlined' | 'text'
  disabled?: boolean
}>(), {
  selectionMode: 'single',
  stylingMode: 'contained',
  disabled: false,
})

defineEmits<{
  'selection-changed': [e: any]
  'item-click': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-dx-button-group {
  display: inline-block;
}
</style>
