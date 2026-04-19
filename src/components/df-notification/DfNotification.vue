<template>
  <transition name="df-notification-fade" @after-leave="onAfterLeave">
    <div
      v-show="visible"
      class="df-notification"
      :class="[`df-notification--${type}`, `df-notification--${position}`]"
      :style="posStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i v-if="showIcon" :class="iconClass" class="df-notification__icon" />
      <div class="df-notification__group">
        <div v-if="title" class="df-notification__title">{{ title }}</div>
        <div class="df-notification__content">
          <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
          <p v-else v-html="message" />
        </div>
      </div>
      <i v-if="showClose" class="dx-icon-close df-notification__close" @click="close" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export type NotificationType = 'success' | 'warning' | 'info' | 'error' | ''
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface DfNotificationProps {
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  position?: NotificationPosition
  showClose?: boolean
  showIcon?: boolean
  dangerouslyUseHTMLString?: boolean
  offset?: number
  onClick?: () => void
  onClose?: () => void
  id?: string
}

const props = withDefaults(defineProps<DfNotificationProps>(), {
  title: '',
  message: '',
  type: 'info',
  duration: 4500,
  position: 'top-right',
  showClose: true,
  showIcon: true,
  dangerouslyUseHTMLString: false,
  offset: 16,
})

defineOptions({ name: 'DfNotification' })

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const ICON_MAP: Record<string, string> = {
  success: 'dx-icon-check',
  warning: 'dx-icon-warning',
  info: 'dx-icon-info',
  error: 'dx-icon-close',
}

const iconClass = computed(() => props.type ? ICON_MAP[props.type] : '')

const posStyle = computed(() => {
  const isTop = props.position.startsWith('top')
  const isRight = props.position.endsWith('right')
  return {
    [isTop ? 'top' : 'bottom']: `${props.offset}px`,
    [isRight ? 'right' : 'left']: '16px',
  }
})

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(close, props.duration)
  }
}

function clearTimer() {
  if (timer) { clearTimeout(timer); timer = null }
}

function close() { visible.value = false }

function onAfterLeave() { props.onClose?.() }

onMounted(() => {
  visible.value = true
  startTimer()
})

onBeforeUnmount(clearTimer)

defineExpose({ close, visible })
</script>

<style scoped>
.df-notification {
  position: fixed; z-index: 9999;
  display: flex; align-items: flex-start; gap: 12px;
  width: 330px; padding: var(--df-spacing-3, 12px) var(--df-spacing-5, 20px);
  background: var(--df-color-bg-surface, #fff); border-radius: var(--df-radius-md, 8px);
  box-shadow: var(--df-shadow-lg, 0 8px 24px rgba(26,32,48,0.12));
  border: 1px solid var(--df-color-border, #E8EBF0);
  overflow: hidden;
  transition: transform .3s, opacity .3s;
}

.df-notification__icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
.df-notification--success .df-notification__icon { color: var(--df-color-success, #52C41A); }
.df-notification--warning .df-notification__icon { color: var(--df-color-warning, #FAAD14); }
.df-notification--info .df-notification__icon { color: var(--df-color-info, #1890FF); }
.df-notification--error .df-notification__icon { color: var(--df-color-error, #F5222D); }

.df-notification__group { flex: 1; min-width: 0; }
.df-notification__title { font-size: var(--df-font-size-md, 15px); font-weight: var(--df-font-weight-bold, 700); color: var(--df-color-text-primary, #1A1A1A); margin-bottom: 6px; }
.df-notification__content { font-size: var(--df-font-size-md, 14px); color: var(--df-color-text-secondary, #6B7790); line-height: 1.5; }
.df-notification__content p { margin: 0; }

.df-notification__close { font-size: var(--df-font-size-md, 14px); cursor: pointer; color: var(--df-color-text-placeholder, #B3BAC9); flex-shrink: 0; margin-top: 2px; }
.df-notification__close:hover { color: var(--df-color-text-secondary, #6B7790); }

/* Position-based slide animations */
.df-notification--top-right, .df-notification--bottom-right {
  right: 16px;
}
.df-notification--top-left, .df-notification--bottom-left {
  left: 16px;
}

.df-notification-fade-enter-active { transition: transform .3s ease-out, opacity .3s; }
.df-notification-fade-leave-active { transition: transform .3s ease-in, opacity .3s; }

.df-notification--top-right.df-notification-fade-enter-from,
.df-notification--bottom-right.df-notification-fade-enter-from {
  transform: translateX(100%); opacity: 0;
}
.df-notification--top-right.df-notification-fade-leave-to,
.df-notification--bottom-right.df-notification-fade-leave-to {
  transform: translateX(100%); opacity: 0;
}
.df-notification--top-left.df-notification-fade-enter-from,
.df-notification--bottom-left.df-notification-fade-enter-from {
  transform: translateX(-100%); opacity: 0;
}
.df-notification--top-left.df-notification-fade-leave-to,
.df-notification--bottom-left.df-notification-fade-leave-to {
  transform: translateX(-100%); opacity: 0;
}
</style>
