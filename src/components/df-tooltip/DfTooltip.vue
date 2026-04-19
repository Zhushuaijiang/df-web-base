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

