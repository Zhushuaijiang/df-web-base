<template>
  <a class="df-link" :class="classes" :href="disabled ? undefined : href" v-bind="linkAttrs" @click="handleClick">
    <i v-if="icon" :class="icon" class="df-link__icon" />
    <span class="df-link__inner"><slot /></span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  underline?: boolean
  disabled?: boolean
  href?: string
  icon?: string
  target?: string
}>(), {
  type: 'default',
  underline: true,
  disabled: false,
  target: '_self',
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

defineOptions({ name: 'DfLink' })

const classes = computed(() => [
  `df-link--${props.type}`,
  { 'df-link--disabled': props.disabled, 'df-link--underline': props.underline && !props.disabled },
])

const linkAttrs = computed(() => props.href ? { target: props.target, rel: props.target === '_blank' ? 'noopener noreferrer' : undefined } : {})

function handleClick(e: MouseEvent) {
  if (props.disabled) { e.preventDefault(); return }
  emit('click', e)
}
</script>

<style scoped>
.df-link { display: inline-flex; align-items: center; gap: 4px; font-size: 14px; cursor: pointer; text-decoration: none; outline: none; }
.df-link--default { color: var(--df-color-text-primary, #606266); }
.df-link--primary { color: var(--df-color-primary, #409eff); }
.df-link--success { color: var(--df-color-success, #52C41A); }
.df-link--warning { color: var(--df-color-warning, #FAAD14); }
.df-link--danger { color: var(--df-color-error, #F5222D); }
.df-link--info { color: var(--df-color-info, #1890FF); }
.df-link--underline:hover { text-decoration: underline; }
.df-link--disabled { color: var(--df-color-text-disabled, #D1D6E0); cursor: not-allowed; }
.df-link__icon { font-size: 14px; }
</style>
