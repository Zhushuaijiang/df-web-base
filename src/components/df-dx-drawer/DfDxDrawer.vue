<template>
  <div class="df-dx-drawer">
    <DxDrawer
      ref="dxRef"
      :opened="modelValue"
      :position="position"
      :reveal-mode="revealMode"
      :template="template"
      :width="width"
      :min-size="minSize"
      :max-size="maxSize"
      :height="height"
      :opened-state-mode="openedStateMode"
      :close-on-outside-click="closeOnOutsideClick"
      :shading="shading"
      @value-changed="onOpenedChanged"
    >
      <template #panel>
        <slot name="panel" />
      </template>
      <slot />
    </DxDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxDrawer } from 'devextreme-vue/drawer'

/**
 * DfDxDrawer — 基于 DevExtreme DxDrawer 封装的抽屉面板
 *
 * 与 DfDrawer（基于 DxPopup）区别：
 * - DfDxDrawer：真正的侧边抽屉，支持 shrink/overlap/push 三种打开模式
 * - DfDrawer：基于 DxPopup + 滑动动画实现，适合简单侧边面板
 *
 * 推荐在需要侧边栏导航、主内容区联动时使用本组件
 */
defineOptions({ name: 'DfDxDrawer' })

/** @props */
const props = withDefaults(defineProps<{
  /** 抽屉打开状态（v-model） */
  modelValue?: boolean
  /** 抽屉出现位置 — 支持 top/bottom，DfDrawer 仅支持 left/right */
  position?: 'left' | 'right' | 'top' | 'bottom'
  /** 内容展示模式 — DxDrawer 独有：slide 滑入，expand 展开 */
  revealMode?: 'slide' | 'expand'
  template?: string
  width?: number | string
  /** 抽屉关闭时的最小保留宽度 — DxDrawer 独有，DfDrawer 无此功能 */
  minSize?: number
  maxSize?: number
  height?: number | string
  /** 打开模式 — DxDrawer 独有核心差异：shrink 压缩主内容 / overlap 覆盖 / push 推移 */
  openedStateMode?: 'shrink' | 'overlap' | 'push'
  closeOnOutsideClick?: boolean | ((e: Event) => boolean)
  shading?: boolean
}>(), {
  modelValue: false,
  position: 'left',
  revealMode: 'slide',
  minSize: 0,
  openedStateMode: 'shrink',
  closeOnOutsideClick: false,
  shading: false,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
}>()

const dxRef = ref()

function onOpenedChanged(e: { value: boolean }) {
  emit('update:modelValue', e.value)
}

function toggle() {
  emit('update:modelValue', !props.modelValue)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance, toggle })
</script>

<style scoped>
.df-dx-drawer {
  display: block;
  width: 100%;
}
</style>
