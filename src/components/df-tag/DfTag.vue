<template>
  <transition :name="disableTransitions ? '' : 'df-zoom-in-center'">
    <span v-if="!closed" class="df-tag" :class="classes" :style="tagStyle" @click="$emit('click', $event)">
      <slot>{{ text }}</slot>
      <button
        v-if="closable"
        class="df-tag__close dx-icon-close"
        aria-label="close"
        @click.stop="handleClose"
        @keydown.enter.stop="handleKeyClose"
        @keydown.space.stop.prevent="handleKeyClose"
      />
    </span>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface DfTagProps {
  text?: string
  type?: '' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  closable?: boolean
  color?: string
  size?: 'large' | 'default' | 'small' | 'mini'
  effect?: 'dark' | 'light' | 'plain'
  hit?: boolean
  round?: boolean
  disableTransitions?: boolean
}

const props = withDefaults(defineProps<DfTagProps>(), {
  type: '',
  closable: false,
  size: 'default',
  effect: 'light',
  hit: false,
  round: false,
  disableTransitions: false,
})

const emit = defineEmits<{
  click: [e: MouseEvent]
  close: [e: MouseEvent]
}>()

defineOptions({ name: 'DfTag' })

const closed = ref(false)

const classes = computed(() => [
  props.type ? `df-tag--${props.type}` : '',
  `df-tag--${props.size}`,
  `df-tag--${props.effect}`,
  { 'df-tag--hit': props.hit, 'df-tag--round': props.round },
])

const tagStyle = computed(() =>
  props.color ? { backgroundColor: props.color, borderColor: props.color, color: '#fff' } : undefined,
)

function handleClose(e: MouseEvent) {
  closed.value = true
  emit('close', e)
}

function handleKeyClose(e: KeyboardEvent) {
  closed.value = true
  emit('close', e as unknown as MouseEvent)
}
</script>

<style scoped>
.df-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--df-spacing-xs, 4px);
  padding: var(--df-tag-padding, 0 8px);
  height: var(--df-tag-height, 22px);
  font-size: var(--df-tag-font-size, var(--df-font-size-xs, 12px));
  border-radius: var(--df-tag-radius, var(--df-radius-sm, 4px));
  border: 1px solid transparent;
  white-space: nowrap;
  cursor: default;
  box-sizing: border-box;
  line-height: 20px;
}

/* Size */
.df-tag--mini { height: 20px; line-height: 18px; padding: 0 var(--df-spacing-xs, 4px); font-size: 11px; }
.df-tag--small { height: var(--df-tag-height, 22px); line-height: 20px; padding: 0 6px; }
.df-tag--large { height: 28px; line-height: 26px; padding: 0 10px; font-size: var(--df-font-size-sm, 13px); }

/* Light effect (default) */
.df-tag--light { background: var(--df-color-primary-50, #E8F5F3); color: var(--df-color-primary, #2AA890); border-color: var(--df-color-primary-100, #C5E8E3); }
.df-tag--light.df-tag--success { background: var(--df-color-success-light, #F6FFED); color: var(--df-color-success, #52C41A); border-color: var(--df-color-success-border, #d9f7be); }
.df-tag--light.df-tag--warning { background: var(--df-color-warning-light, #FFFBE6); color: var(--df-color-warning, #FAAD14); border-color: var(--df-color-warning-border, #ffe58f); }
.df-tag--light.df-tag--danger { background: var(--df-color-error-light, #FFF2F0); color: var(--df-color-error, #F5222D); border-color: var(--df-color-error-border, #ffccc7); }
.df-tag--light.df-tag--info { background: var(--df-color-secondary-50, #F5F6F8); color: var(--df-color-secondary-500, #6B7790); border-color: var(--df-color-secondary-200, #D1D6E0); }
.df-tag--light.df-tag--primary { background: var(--df-color-primary-50, #E8F5F3); color: var(--df-color-primary, #2AA890); border-color: var(--df-color-primary-100, #C5E8E3); }

/* Dark effect */
.df-tag--dark { color: #fff; }
.df-tag--dark:not([class*="df-tag--success"]):not([class*="df-tag--warning"]):not([class*="df-tag--danger"]):not([class*="df-tag--info"]):not([class*="df-tag--primary"]) { background: var(--df-color-primary, #2AA890); }
.df-tag--dark.df-tag--success { background: var(--df-color-success, #52C41A); }
.df-tag--dark.df-tag--warning { background: var(--df-color-warning, #FAAD14); }
.df-tag--dark.df-tag--danger { background: var(--df-color-error, #F5222D); }
.df-tag--dark.df-tag--info { background: var(--df-color-secondary-500, #6B7790); }
.df-tag--dark.df-tag--primary { background: var(--df-color-primary, #2AA890); }

/* Plain effect */
.df-tag--plain { background: transparent; }
.df-tag--plain:not([class*="df-tag--success"]):not([class*="df-tag--warning"]):not([class*="df-tag--danger"]):not([class*="df-tag--info"]):not([class*="df-tag--primary"]) { color: var(--df-color-primary, #2AA890); border-color: var(--df-color-primary-200, #9EDAD1); }
.df-tag--plain.df-tag--success { color: var(--df-color-success, #52C41A); border-color: var(--df-color-success, #b7eb8f); }
.df-tag--plain.df-tag--warning { color: var(--df-color-warning, #FAAD14); border-color: var(--df-color-warning, #ffd666); }
.df-tag--plain.df-tag--danger { color: var(--df-color-error, #F5222D); border-color: var(--df-color-error, #ffa39e); }
.df-tag--plain.df-tag--info { color: var(--df-color-secondary-500, #6B7790); border-color: var(--df-color-secondary-200, #D1D6E0); }
.df-tag--plain.df-tag--primary { color: var(--df-color-primary, #2AA890); border-color: var(--df-color-primary, #2AA890); }

.df-tag--hit { border-color: currentColor; }
.df-tag--round { border-radius: var(--df-radius-full, 9999px); }

.df-tag__close {
  font-size: var(--df-font-size-xs, 12px);
  cursor: pointer;
  border-radius: 50%;
  line-height: 1;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
}
.df-tag__close:hover { background: currentColor; color: #fff; }

.df-zoom-in-center-enter-active,
.df-zoom-in-center-leave-active { transition: all var(--df-transition-fast, 150ms cubic-bezier(0.4, 0, 0.2, 1)); }
.df-zoom-in-center-enter-from,
.df-zoom-in-center-leave-to { opacity: 0; transform: scaleX(0); }
</style>
