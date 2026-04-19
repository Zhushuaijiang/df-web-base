<template>
  <div class="df-dx-pagination">
    <DxPagination
      ref="dxRef"
      :page-count="pageCount"
      :page-index="modelValue"
      :page-size="pageSize"
      :show-page-size-selector="showPageSizeSelector"
      :show-info="showInfo"
      :show-navigation-buttons="showNavigationButtons"
      :allowed-page-sizes="allowedPageSizes"
      :visible="visible"
      @page-index-changed="onPageIndexChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxPagination } from 'devextreme-vue/pagination'

/**
 * DfDxPagination — 基于 DevExtreme DxPagination 封装的分页组件
 *
 * 与纯 Vue 实现的 DfPagination 区别：
 * - DfDxPagination：DevExtreme 原生分页，支持页码选择器、信息显示
 * - DfPagination：轻量纯 Vue 实现，UI 更贴近自研设计系统
 */
defineOptions({ name: 'DfDxPagination' })

/** @props */
withDefaults(defineProps<{
  /** 当前页索引（v-model） */
  modelValue?: number
  pageCount?: number
  pageSize?: number
  /** DxPagination 独有：显示每页条数选择器，纯 Vue 版不提供 */
  showPageSizeSelector?: boolean
  /** DxPagination 独有：显示分页信息（如 "第 1 页，共 5 页 (100 条记录)"） */
  showInfo?: boolean
  showNavigationButtons?: boolean
  /** DxPagination 独有：可选的每页条数列表，配合 showPageSizeSelector 使用 */
  allowedPageSizes?: (string | number)[]
  visible?: boolean
}>(), {
  modelValue: 0,
  pageCount: 1,
  pageSize: 20,
  showPageSizeSelector: false,
  showInfo: false,
  showNavigationButtons: true,
  visible: true,
})

const emit = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

const dxRef = ref()

function onPageIndexChanged(e: { component: any; element: any; event: Event; pageIndex: number }) {
  emit('update:modelValue', e.pageIndex)
  emit('change', e.pageIndex)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-dx-pagination {
  display: block;
}
</style>
