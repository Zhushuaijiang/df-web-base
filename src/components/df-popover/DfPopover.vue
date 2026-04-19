<template>
  <span ref="triggerRef" class="df-popover-trigger" @mouseenter="onEnter" @mouseleave="onLeave" @click="onClick" @focus="onFocus" @blur="onBlur">
    <slot />
  </span>
  <teleport to="body">
    <transition name="df-fade">
      <div v-if="visible" ref="popoverRef" class="df-popover" :class="[`df-popover--${effect}`]" :style="popoverStyle" role="tooltip"
        @mouseenter="onPopoverEnter" @mouseleave="onPopoverLeave">
        <div v-if="title" class="df-popover__title">{{ title }}</div>
        <div class="df-popover__content"><slot name="content">{{ content }}</slot></div>
        <div class="df-popover__arrow" />
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  trigger?: 'hover' | 'click' | 'focus' | 'manual'
  title?: string
  content?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  width?: string | number
  effect?: 'dark' | 'light'
  visible?: boolean
  offset?: number
  popperClass?: string
}>(), {
  trigger: 'hover',
  placement: 'top',
  effect: 'light',
  offset: 8,
})

const emit = defineEmits<{ 'update:visible': [val: boolean] }>()

defineOptions({ name: 'DfPopover' })

const visible = ref(props.visible ?? false)
const triggerRef = ref<HTMLElement>()
const popoverRef = ref<HTMLElement>()
const popoverStyle = ref<Record<string, string>>({})
let timer: ReturnType<typeof setTimeout> | null = null

function show() { visible.value = true; emit('update:visible', true); nextTick(updatePos) }
function hide() { visible.value = false; emit('update:visible', false) }
function toggle() { visible.value ? hide() : show() }

function updatePos() {
  if (!triggerRef.value) return
  const r = triggerRef.value.getBoundingClientRect()
  const s: Record<string, string> = { position: 'absolute', zIndex: '2060' }
  if (props.width) s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  const off = props.offset
  switch (props.placement) {
    case 'top': s.left = `${r.left + r.width / 2}px`; s.top = `${r.top + window.scrollY - off}px`; s.transform = 'translate(-50%, -100%)'; break
    case 'bottom': s.left = `${r.left + r.width / 2}px`; s.top = `${r.bottom + window.scrollY + off}px`; s.transform = 'translateX(-50%)'; break
    case 'left': s.left = `${r.left - off}px`; s.top = `${r.top + window.scrollY + r.height / 2}px`; s.transform = 'translate(-100%, -50%)'; break
    case 'right': s.left = `${r.right + off}px`; s.top = `${r.top + window.scrollY + r.height / 2}px`; s.transform = 'translateY(-50%)'; break
  }
  popoverStyle.value = s
}

function onEnter() { if (props.trigger === 'hover') { if (timer) clearTimeout(timer); show() } }
function onLeave() { if (props.trigger === 'hover') timer = setTimeout(hide, 200) }
function onPopoverEnter() { if (props.trigger === 'hover' && timer) clearTimeout(timer) }
function onPopoverLeave() { if (props.trigger === 'hover') timer = setTimeout(hide, 200) }
function onClick() { if (props.trigger === 'click') toggle() }
function onFocus() { if (props.trigger === 'focus') show() }
function onBlur() { if (props.trigger === 'focus') hide() }

function onDocClick(e: MouseEvent) {
  if (props.trigger === 'click' && visible.value) {
    if (!triggerRef.value?.contains(e.target as Node) && !popoverRef.value?.contains(e.target as Node)) hide()
  }
}
if (typeof document !== 'undefined') document.addEventListener('click', onDocClick, true)
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('click', onDocClick, true) })
</script>

<style scoped>
.df-popover-trigger { display: inline-flex; }
</style>
<style>
.df-popover { border-radius: var(--df-radius-base, 6px); padding: var(--df-spacing-3, 12px); font-size: var(--df-font-size-md, 14px); line-height: 1.4; word-break: break-all; box-shadow: var(--df-shadow-md, 0 4px 8px rgba(26,32,48,0.08)); }
.df-popover--light { background: var(--df-color-bg-surface, #fff); border: 1px solid var(--df-color-border, #E8EBF0); color: var(--df-color-text-secondary, #6B7790); }
.df-popover--dark { background: var(--df-color-secondary-800, #2B3343); color: #fff; border: none; }
.df-popover__title { font-weight: var(--df-font-weight-bold, 700); font-size: var(--df-font-size-md, 14px); margin-bottom: var(--df-spacing-sm, 8px); color: var(--df-color-text-primary, #1A1A1A); }
.df-popover--dark .df-popover__title { color: #fff; }
.df-fade-enter-active, .df-fade-leave-active { transition: opacity .2s; }
.df-fade-enter-from, .df-fade-leave-to { opacity: 0; }
</style>
