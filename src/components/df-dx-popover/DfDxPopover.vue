<template>
  <div class="df-dx-popover">
    <DxPopover
      ref="dxRef"
      :visible="modelValue"
      :target="target"
      :position="position"
      :width="width"
      :height="height"
      :shading="shading"
      :show-title="showTitle"
      :title="title"
      :animation="animation"
      :container="container"
      :close-on-outside-click="closeOnOutsideClick"
      :defer-rendering="deferRendering"
      @value-changed="onVisibleChanged"
      @showing="$emit('showing')"
      @shown="$emit('shown')"
      @hiding="$emit('hiding')"
      @hidden="$emit('hidden')"
    >
      <slot />
    </DxPopover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxPopover } from 'devextreme-vue/popover'

/**
 * DfDxPopover — 基于 DevExtreme DxPopover 封装的气泡卡片
 *
 * 与纯 Vue 实现的 DfPopover 区别：
 * - DfDxPopover：完整 DevExtreme 功能，支持动画、定位、模板等高级特性
 * - DfPopover：轻量纯 Vue 实现，适合简单场景
 *
 * 推荐在需要复杂定位、动画或 Dx 生态集成时使用本组件
 */
defineOptions({ name: 'DfDxPopover' })

/** @props */
withDefaults(defineProps<{
  /** 气泡卡片可见状态（v-model） */
  modelValue?: boolean
  /** 气泡定位的目标元素或 CSS 选择器 — DxPopover 独有，纯 Vue 版不支持精确锚点定位 */
  target?: string | Element
  /** 气泡相对于目标的定位配置 — DxPopover 独有，支持 at/my/of/collision 等复杂定位 */
  position?: Record<string, any>
  width?: number | string
  height?: number | string
  /** 是否显示遮罩层 */
  shading?: boolean
  showTitle?: boolean
  title?: string
  /** 动画配置 — DxPopover 独有，支持 show/hide 的 duration/easing/from/to */
  animation?: Record<string, any>
  /** 弹出层容器 — DxPopover 独有，控制渲染挂载点 */
  container?: string | Element
  closeOnOutsideClick?: boolean | ((e: Event) => boolean)
  deferRendering?: boolean
}>(), {
  modelValue: false,
  shading: false,
  showTitle: false,
  closeOnOutsideClick: true,
  deferRendering: true,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
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
.df-dx-popover {
  display: contents;
}
</style>
