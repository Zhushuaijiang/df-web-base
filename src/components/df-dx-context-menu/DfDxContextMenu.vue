<template>
  <div class="df-dx-context-menu">
    <DxContextMenu
      ref="dxRef"
      :data-source="dataSource"
      :items="items"
      :visible="modelValue"
      :target="target"
      :position="position"
      :show-event="showEvent"
      :show-submenu-mode="showSubmenuMode"
      :orientation="orientation"
      :hover-state-enabled="hoverStateEnabled"
      :key-expr="keyExpr"
      :display-expr="displayExpr"
      :icon-field="iconField"
      @value-changed="onVisibleChanged"
      @item-click="$emit('item-click', $event)"
      @item-context-menu="$emit('item-context-menu', $event)"
      @showing="$emit('showing')"
      @shown="$emit('shown')"
      @hiding="$emit('hiding')"
      @hidden="$emit('hidden')"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxContextMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxContextMenu } from 'devextreme-vue/context-menu'

/**
 * DfDxContextMenu — 基于 DevExtreme DxContextMenu 封装的右键菜单
 *
 * 与纯 Vue 实现的 DfContextMenu 区别：
 * - DfDxContextMenu：完整 DevExtreme 功能，支持嵌套子菜单、动态数据源
 * - DfContextMenu：轻量纯 Vue 实现，适合简单菜单场景
 */
defineOptions({ name: 'DfDxContextMenu' })

/** @props */
withDefaults(defineProps<{
  /** DxContextMenu 独有：支持远程数据源绑定（OData、CustomStore 等） */
  dataSource?: any[] | Record<string, any>
  items?: any[]
  modelValue?: boolean
  /** 右键菜单触发的目标元素 — DxContextMenu 独有，纯 Vue 版通常通过 slot 触发 */
  target?: string | Element
  /** 菜单弹出位置 — DxContextMenu 独有，支持精确的 at/my/of 定位 */
  position?: Record<string, any>
  /** 触发显示的事件配置 — DxContextMenu 独有，如右键、悬停等 */
  showEvent?: string | Record<string, any>
  /** 子菜单展开模式 — DxContextMenu 独有，支持 onHover/onClick 及延迟配置 */
  showSubmenuMode?: Record<string, any>
  orientation?: 'horizontal' | 'vertical'
  hoverStateEnabled?: boolean
  keyExpr?: string
  displayExpr?: string | ((data: any) => string)
  iconField?: string
}>(), {
  modelValue: false,
  hoverStateEnabled: true,
  showSubmenuMode: () => ({ mode: 'onHover' }),
  orientation: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  'item-click': [e: any]
  'item-context-menu': [e: any]
  showing: []
  shown: []
  hiding: []
  hidden: []
}>()

const dxRef = ref()

function onVisibleChanged(e: { value: boolean }) {
  emit('update:modelValue', e.value)
}

function show() {
  emit('update:modelValue', true)
}

function hide() {
  emit('update:modelValue', false)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance, show, hide })
</script>

<style scoped>
.df-dx-context-menu {
  display: contents;
}
</style>
