<template>
  <span
    ref="triggerRef"
    class="df-tooltip__trigger"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
  >
    <slot />
  </span>
  <DxTooltip
    :visible="isVisible"
    :target="triggerRef"
    :position="position"
    :show-event="(null as any)"
    :hide-event="(null as any)"
    :animation="{ show: { type: 'fade', from: 0, to: 1, duration: 200 }, hide: { type: 'fade', from: 1, to: 0, duration: 150 } }"
    :wrapper-attr="{ class: `df-tooltip df-tooltip--${effect}` }"
  >
    <template #content>
      <slot name="content">{{ content }}</slot>
    </template>
  </DxTooltip>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { DxTooltip } from 'devextreme-vue/tooltip'

export interface DfTooltipProps {
  /** 提示内容 */
  content?: string
  /** 弹出位置 */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** 主题 */
  effect?: 'dark' | 'light'
  /** 延迟显示(ms) */
  showDelay?: number
  /** 延迟隐藏(ms) */
  hideDelay?: number
  /** 是否禁用 */
  disabled?: boolean
}

const props = withDefaults(defineProps<DfTooltipProps>(), {
  content: '',
  position: 'top',
  effect: 'dark',
  showDelay: 200,
  hideDelay: 100,
  disabled: false,
})

defineOptions({ name: 'DfTooltip' })

const triggerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function clearTimers() {
  if (showTimer) { clearTimeout(showTimer); showTimer = null }
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
}

function onMouseEnter() {
  if (props.disabled || !props.content) return
  clearTimers()
  showTimer = setTimeout(() => {
    isVisible.value = true
  }, props.showDelay)
}

function onMouseLeave() {
  clearTimers()
  hideTimer = setTimeout(() => {
    isVisible.value = false
  }, props.hideDelay)
}

onBeforeUnmount(clearTimers)
</script>

<style scoped>
.df-tooltip__trigger {
  display: inline-flex;
}
</style>

<style>
/* 全局样式 — tooltip 渲染在 body 下 */
.df-tooltip--dark .dx-tooltip-content {
  background: var(--df-color-secondary-800, rgba(48, 48, 48, 0.95));
  color: #fff;
  border-radius: var(--df-radius-sm, 4px);
  padding: var(--df-spacing-1, 6px) var(--df-spacing-2, 10px);
  font-size: var(--df-font-size-sm, 13px);
  line-height: 1.4;
  max-width: 300px;
  word-break: break-word;
}

.df-tooltip--light .dx-tooltip-content {
  background: var(--df-color-bg-surface, #fff);
  color: var(--df-color-text-primary, #1A1A1A);
  border: 1px solid var(--df-color-border, #E8EBF0);
  border-radius: var(--df-radius-sm, 4px);
  padding: var(--df-spacing-1, 6px) var(--df-spacing-2, 10px);
  font-size: var(--df-font-size-sm, 13px);
  line-height: 1.4;
  max-width: 300px;
  box-shadow: var(--df-shadow-md, 0 2px 8px rgba(0, 0, 0, 0.12));
}
</style>
