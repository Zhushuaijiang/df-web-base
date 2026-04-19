<template>
  <div class="df-dx-menu">
    <DxMenu
      ref="dxRef"
      :data-source="dataSource"
      :items="items"
      :orientation="orientation"
      :show-submenu-mode="showSubmenuMode"
      :adaptivity-enabled="adaptivityEnabled"
      :hover-state-enabled="hoverStateEnabled"
      :key-expr="keyExpr"
      :display-expr="displayExpr"
      :icon-field="iconField"
      @item-click="$emit('item-click', $event)"
      @item-context-menu="$emit('item-context-menu', $event)"
      @selection-changed="$emit('selection-changed', $event)"
      @submenu-hidden="$emit('submenu-hidden', $event)"
      @submenu-showing="$emit('submenu-showing', $event)"
      @submenu-shown="$emit('submenu-shown', $event)"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxMenu } from 'devextreme-vue/menu'

/**
 * DfDxMenu — 基于 DevExtreme DxMenu 封装的导航菜单
 *
 * 与纯 Vue 实现的 DfMenu 区别：
 * - DfDxMenu：完整 DevExtreme 功能，支持自适应折叠、动态数据源、子菜单模式
 * - DfMenu：轻量纯 Vue 实现，支持 DfMenuItem/DfSubmenu 声明式用法
 */
defineOptions({ name: 'DfDxMenu' })

/** @props */
withDefaults(defineProps<{
  /** DxMenu 独有：支持远程数据源绑定（OData、CustomStore 等），纯 Vue 版仅支持 items */
  dataSource?: any[] | Record<string, any>
  items?: any[]
  orientation?: 'horizontal' | 'vertical'
  /** 子菜单展开模式 — DxMenu 独有，支持 onHover/onClick 及延迟配置 */
  showSubmenuMode?: Record<string, any>
  /** 自适应折叠 — DxMenu 独有，窄屏自动折叠为汉堡菜单 */
  adaptivityEnabled?: boolean
  hoverStateEnabled?: boolean
  keyExpr?: string
  displayExpr?: string | ((data: any) => string)
  iconField?: string
}>(), {
  orientation: 'horizontal',
  showSubmenuMode: () => ({ mode: 'onHover' }),
  adaptivityEnabled: false,
  hoverStateEnabled: true,
})

defineEmits<{
  'item-click': [e: any]
  'item-context-menu': [e: any]
  'selection-changed': [e: any]
  'submenu-hidden': [e: any]
  'submenu-showing': [e: any]
  'submenu-shown': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-dx-menu {
  display: block;
}
</style>
