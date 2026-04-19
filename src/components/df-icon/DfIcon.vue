<template>
  <i
    class="df-icon"
    :class="[iconClass, { 'df-icon--clickable': clickable }]"
    :style="iconStyle"
    role="img"
    :aria-label="name"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** DevExtreme 图标名（不含 dx-icon- 前缀）或完整 class */
  name?: string
  size?: number | string
  color?: string
  clickable?: boolean
}>(), {
  name: '',
  clickable: false,
})

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

defineOptions({ name: 'DfIcon' })

const iconClass = computed(() => {
  if (!props.name) return ''
  // If name already contains 'dx-icon' or a custom class prefix, use as-is
  if (props.name.includes('dx-icon') || props.name.includes(' ')) {
    return props.name
  }
  return `dx-icon-${props.name}`
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.size) {
    const s = typeof props.size === 'number' ? `${props.size}px` : props.size
    style.fontSize = s
    style.width = s
    style.height = s
    style.lineHeight = s
  }
  if (props.color) {
    style.color = props.color
  }
  return style
})

function onClick(e: MouseEvent) {
  emit('click', e)
}
</script>

<style scoped>
.df-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  vertical-align: middle;
  transition: color 0.2s;
}

.df-icon--clickable {
  cursor: pointer;
}

.df-icon--clickable:hover {
  opacity: 0.8;
}
</style>
