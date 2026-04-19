<template>
  <div class="df-dx-tabs">
    <DxTabs
      ref="dxRef"
      :data-source="dataSource"
      :items="items"
      :selected-index="modelValue"
      :selected-item-key="selectedItemKey"
      :key-expr="keyExpr"
      :scroll-by-content="scrollByContent"
      :show-nav-buttons="showNavButtons"
      :icon-position="iconPosition"
      :orientation="orientation"
      :styling-mode="stylingMode"
      :selection-mode="selectionMode"
      @selection-changed="onSelectionChanged"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxTabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxTabs } from 'devextreme-vue/tabs'

/**
 * DfDxTabs — 基于 DevExtreme DxTabs 封装的标签页导航
 *
 * 与 DfTabs（基于 DxTabPanel）区别：
 * - DfDxTabs：纯标签导航条，不含面板内容区，需配合其他容器使用
 * - DfTabs：标签面板组件（DxTabPanel），每个标签自带内容区
 */
defineOptions({ name: 'DfDxTabs' })

/** @props */
withDefaults(defineProps<{
  /** DxTabs 独有：支持远程数据源绑定 */
  dataSource?: any[]
  items?: any[]
  /** 当前选中标签索引（v-model） */
  modelValue?: number
  /** DxTabs 独有：按 key 选中，与 modelValue 互斥 */
  selectedItemKey?: any
  keyExpr?: string
  /** DxTabs 独有：允许通过内容区域滚动来切换标签 */
  scrollByContent?: boolean
  /** DxTabs 独有：显示左右导航箭头 */
  showNavButtons?: boolean
  iconPosition?: 'top' | 'start' | 'end' | 'bottom'
  orientation?: 'horizontal' | 'vertical'
  stylingMode?: 'primary' | 'secondary'
  /** DxTabs 独有：单选/多选标签，DfTabs 不支持多选 */
  selectionMode?: 'single' | 'multiple'
}>(), {
  scrollByContent: true,
  showNavButtons: false,
  iconPosition: 'start',
  orientation: 'horizontal',
  stylingMode: 'primary',
  selectionMode: 'single' as const,
})

const emit = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

const dxRef = ref()

function onSelectionChanged(e: any) {
  const idx = e.component?.option('selectedIndex') ?? 0
  emit('update:modelValue', idx)
  emit('change', idx)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-dx-tabs {
  display: block;
}
</style>
