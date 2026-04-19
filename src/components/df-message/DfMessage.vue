<template>
  <transition name="df-message-fade" @after-leave="onAfterLeave">
    <div v-show="visible" class="df-message" :class="classes" :style="posStyle" role="alert" @mouseenter="clearTimer" @mouseleave="startTimer">
      <i v-if="showIcon" :class="iconClass" class="df-message__icon" />
      <div class="df-message__content">
        <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
        <p v-else v-html="message" />
      </div>
      <i v-if="showClose" class="dx-icon-close df-message__close" @click="close" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export interface DfMessageProps {
  message?: string
  type?: MessageType
  duration?: number
  showClose?: boolean
  showIcon?: boolean
  center?: boolean
  dangerouslyUseHTMLString?: boolean
  offset?: number
  grouping?: boolean
  onClose?: () => void
  id?: string
}

const props = withDefaults(defineProps<DfMessageProps>(), {
  message: '',
  type: 'info',
  duration: 3000,
  showClose: false,
  showIcon: true,
  center: false,
  dangerouslyUseHTMLString: false,
  offset: 20,
})

defineOptions({ name: 'DfMessage' })

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const ICON_MAP: Record<MessageType, string> = {
  success: 'dx-icon-check',
  warning: 'dx-icon-warning',
  info: 'dx-icon-info',
  error: 'dx-icon-close',
}

const classes = computed(() => [
  `df-message--${props.type}`,
  { 'df-message--center': props.center },
])

const iconClass = computed(() => ICON_MAP[props.type])
const posStyle = computed(() => ({ top: `${props.offset}px` }))

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(close, props.duration)
  }
}

function clearTimer() {
  if (timer) { clearTimeout(timer); timer = null }
}

function close() {
  visible.value = false
}

function onAfterLeave() {
  props.onClose?.()
}

onMounted(() => {
  visible.value = true
  startTimer()
})

onBeforeUnmount(clearTimer)

defineExpose({ close, visible })
</script>

<style scoped>
.df-message {
  position: fixed; left: 50%; transform: translateX(-50%); z-index: 9999;
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; border-radius: var(--df-radius-sm, 4px);
  min-width: 300px; max-width: 80vw;
  box-shadow: var(--df-shadow-md, 0 4px 8px rgba(26,32,48,0.08));
  pointer-events: all;
  transition: top .3s;
}

.df-message--center { justify-content: center; }
.df-message--success { background: var(--df-color-success-light, #F6FFED); border: 1px solid var(--df-color-success-border, #d9f7be); color: var(--df-color-success, #52C41A); }
.df-message--warning { background: var(--df-color-warning-light, #FFFBE6); border: 1px solid var(--df-color-warning-border, #ffe58f); color: var(--df-color-warning, #FAAD14); }
.df-message--info { background: var(--df-color-info-light, #E6F7FF); border: 1px solid var(--df-color-info-border, #91d5ff); color: var(--df-color-info, #1890FF); }
.df-message--error { background: var(--df-color-error-light, #FFF2F0); border: 1px solid var(--df-color-error-border, #ffccc7); color: var(--df-color-error, #F5222D); }

.df-message__icon { font-size: 16px; }
.df-message__content { flex: 1; font-size: 14px; line-height: 1.4; }
.df-message__content p { margin: 0; }
.df-message__close { font-size: 14px; cursor: pointer; opacity: .6; }
.df-message__close:hover { opacity: 1; }

.df-message-fade-enter-active { transition: opacity .3s, transform .3s; }
.df-message-fade-leave-active { transition: opacity .3s, transform .3s; }
.df-message-fade-enter-from { opacity: 0; transform: translateX(-50%) translateY(-100%); }
.df-message-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(-100%); }
</style>
