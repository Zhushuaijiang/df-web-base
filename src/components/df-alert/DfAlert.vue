<template>
  <transition name="df-alert-fade">
    <div v-if="visible" class="df-alert" :class="classes" role="alert">
      <i v-if="showIcon" class="df-alert__icon" :class="iconClass" />
      <div class="df-alert__content">
        <span v-if="title || $slots.title" class="df-alert__title" :class="{ 'df-alert__title--bold': description || $slots.default }">
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="description || $slots.default" class="df-alert__description">
          <slot>{{ description }}</slot>
        </p>
      </div>
      <i v-if="closable" class="df-alert__close dx-icon-close" @click="close">{{ closeText }}</i>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export type AlertType = 'success' | 'warning' | 'info' | 'error'

export interface DfAlertProps {
  title?: string
  description?: string
  type?: AlertType
  closable?: boolean
  closeText?: string
  showIcon?: boolean
  center?: boolean
  effect?: 'light' | 'dark'
}

const props = withDefaults(defineProps<DfAlertProps>(), {
  title: '',
  description: '',
  type: 'info',
  closable: true,
  closeText: '',
  showIcon: false,
  center: false,
  effect: 'light',
})

const emit = defineEmits<{ close: [e: MouseEvent] }>()

defineOptions({ name: 'DfAlert' })

const visible = ref(true)

const ICON_MAP: Record<string, string> = {
  success: 'dx-icon-check',
  warning: 'dx-icon-warning',
  info: 'dx-icon-info',
  error: 'dx-icon-close',
}

const classes = computed(() => [
  `df-alert--${props.type}`,
  `df-alert--${props.effect}`,
  { 'df-alert--center': props.center },
])

const iconClass = computed(() => ICON_MAP[props.type] ?? 'dx-icon-info')

function close(e: MouseEvent) {
  visible.value = false
  emit('close', e)
}
</script>

<style scoped>
.df-alert { display: flex; align-items: flex-start; padding: var(--df-spacing-sm, 8px) var(--df-spacing-md, 16px); border-radius: var(--df-radius-sm, 4px); gap: var(--df-spacing-sm, 8px); position: relative; }
.df-alert--center { justify-content: center; text-align: center; }

.df-alert--light.df-alert--success { background: var(--df-color-success-light, #F6FFED); color: var(--df-color-success, #52C41A); }
.df-alert--light.df-alert--warning { background: var(--df-color-warning-light, #FFFBE6); color: var(--df-color-warning, #FAAD14); }
.df-alert--light.df-alert--info { background: var(--df-color-info-light, #E6F7FF); color: var(--df-color-info, #1890FF); }
.df-alert--light.df-alert--error { background: var(--df-color-error-light, #FFF2F0); color: var(--df-color-error, #F5222D); }

.df-alert--dark.df-alert--success { background: var(--df-color-success, #52C41A); color: #fff; }
.df-alert--dark.df-alert--warning { background: var(--df-color-warning, #FAAD14); color: #fff; }
.df-alert--dark.df-alert--info { background: var(--df-color-info, #1890FF); color: #fff; }
.df-alert--dark.df-alert--error { background: var(--df-color-error, #F5222D); color: #fff; }

.df-alert__icon { font-size: var(--df-font-size-lg, 16px); line-height: 1.4; }
.df-alert__content { flex: 1; }
.df-alert__title { font-size: var(--df-font-size-sm, 13px); line-height: 1.4; }
.df-alert__title--bold { font-weight: var(--df-font-weight-bold, 700); font-size: var(--df-font-size-md, 14px); }
.df-alert__description { font-size: var(--df-font-size-xs, 12px); margin: var(--df-spacing-xs, 4px) 0 0; color: var(--df-color-text-secondary, #6B7790); }
.df-alert--dark .df-alert__description { color: rgba(255,255,255,.8); }
.df-alert__close { position: absolute; top: var(--df-spacing-sm, 8px); right: var(--df-spacing-3, 12px); cursor: pointer; font-size: var(--df-font-size-sm, 13px); opacity: .7; }
.df-alert__close:hover { opacity: 1; }

.df-alert-fade-enter-active, .df-alert-fade-leave-active { transition: opacity var(--df-transition-normal, 250ms); }
.df-alert-fade-enter-from, .df-alert-fade-leave-to { opacity: 0; }
</style>
