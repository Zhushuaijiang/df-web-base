<template>
  <span class="df-avatar" :class="classes" :style="sizeStyle">
    <img v-if="src && !hasError" :src="src" :alt="alt" @error="onError" />
    <i v-else-if="icon" :class="icon" />
    <slot v-else>{{ initials }}</slot>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'large' | 'default' | 'small' | number
  shape?: 'circle' | 'square'
  src?: string
  alt?: string
  icon?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}>(), {
  size: 'default',
  shape: 'circle',
  fit: 'cover',
})

const emit = defineEmits<{ error: [e: Event] }>()

defineOptions({ name: 'DfAvatar' })

const hasError = ref(false)

const SIZE_MAP: Record<string, number> = { large: 40, default: 32, small: 24 }
const numSize = computed(() => typeof props.size === 'number' ? props.size : SIZE_MAP[props.size] ?? 32)

const classes = computed(() => [
  `df-avatar--${props.shape}`,
  { 'df-avatar--icon': !!props.icon },
])

const sizeStyle = computed(() => ({
  width: `${numSize.value}px`,
  height: `${numSize.value}px`,
  fontSize: `${numSize.value * 0.45}px`,
}))

const initials = ''

function onError(e: Event) {
  hasError.value = true
  emit('error', e)
}
</script>

<style scoped>
.df-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  overflow: hidden; background: var(--df-color-text-disabled, #c0c4cc); color: #fff; font-weight: 500;
}
.df-avatar--circle { border-radius: 50%; }
.df-avatar--square { border-radius: var(--df-radius-sm, 4px); }
.df-avatar img { width: 100%; height: 100%; object-fit: v-bind(fit); }
.df-avatar--icon i { font-size: inherit; }
</style>
