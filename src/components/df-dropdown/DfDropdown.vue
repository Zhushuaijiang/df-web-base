<template>
  <div class="df-dropdown" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div ref="triggerRef" class="df-dropdown__trigger" @click="onClickTrigger">
      <slot />
    </div>
    <teleport to="body">
      <transition name="df-zoom-in-top">
        <div v-if="visible" ref="menuRef" class="df-dropdown__menu" :style="menuStyle" @click="onMenuClick">
          <slot name="dropdown" />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onBeforeUnmount, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  trigger?: 'hover' | 'click'
  placement?: 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end'
  hideOnClick?: boolean
  splitButton?: boolean
  disabled?: boolean
}>(), {
  trigger: 'hover',
  placement: 'bottom-end',
  hideOnClick: true,
  splitButton: false,
  disabled: false,
})

const emit = defineEmits<{
  command: [cmd: string | number | object]
  'visible-change': [val: boolean]
}>()

defineOptions({ name: 'DfDropdown' })

const visible = ref(false)
const triggerRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()
const menuStyle = ref<Record<string, string>>({})
let hoverTimer: ReturnType<typeof setTimeout> | null = null

function updatePosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  const isTop = props.placement.startsWith('top')
  const top = isTop ? `${rect.top + window.scrollY}px` : `${rect.bottom + window.scrollY}px`
  const left = props.placement.endsWith('end') ? `${rect.right}px` : props.placement.endsWith('start') ? `${rect.left}px` : `${rect.left + rect.width / 2}px`
  const transform = isTop ? 'translateY(-100%)' : ''
  const transformX = props.placement.endsWith('end') ? 'translateX(-100%)' : props.placement.endsWith('start') ? '' : 'translateX(-50%)'
  menuStyle.value = { position: 'absolute', top, left, transform: `${transform} ${transformX}`.trim(), zIndex: '2050' }
}

function show() {
  if (props.disabled) return
  visible.value = true
  emit('visible-change', true)
  nextTick(updatePosition)
}

function hide() {
  visible.value = false
  emit('visible-change', false)
}

function onMouseEnter() { if (props.trigger === 'hover') { if (hoverTimer) clearTimeout(hoverTimer); show() } }
function onMouseLeave() { if (props.trigger === 'hover') { hoverTimer = setTimeout(hide, 150) } }
function onClickTrigger() { if (props.trigger === 'click') visible.value ? hide() : show() }

function onMenuClick(_e: MouseEvent) {
  // close on click inside if hideOnClick
  if (props.hideOnClick) hide()
}

function handleCommand(cmd: string | number | object) {
  emit('command', cmd)
  if (props.hideOnClick) hide()
}

provide('dfDropdown', { handleCommand })

function onDocClick(e: MouseEvent) {
  if (props.trigger === 'click' && triggerRef.value && !triggerRef.value.contains(e.target as Node) && menuRef.value && !menuRef.value.contains(e.target as Node)) {
    hide()
  }
}

if (typeof document !== 'undefined') document.addEventListener('click', onDocClick)
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('click', onDocClick) })
</script>

<style scoped>
.df-dropdown { display: inline-flex; position: relative; }
.df-dropdown__trigger { cursor: pointer; outline: none; }
</style>
<style>
.df-dropdown__menu { background: var(--df-color-bg-surface, #fff); border: 1px solid var(--df-color-border, #e4e7ed); border-radius: var(--df-radius-sm, 4px); box-shadow: var(--df-shadow-md, 0 2px 12px 0 rgba(0,0,0,.1)); padding: 4px 0; min-width: 120px; }
.df-zoom-in-top-enter-active, .df-zoom-in-top-leave-active { transition: all .2s cubic-bezier(.23,1,.32,1); transform-origin: center top; }
.df-zoom-in-top-enter-from, .df-zoom-in-top-leave-to { opacity: 0; transform: scaleY(0); }
</style>
