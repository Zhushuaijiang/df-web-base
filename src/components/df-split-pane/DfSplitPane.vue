<template>
  <div
    ref="containerRef"
    class="df-split-pane"
    :class="[`df-split-pane--${direction}`, { 'df-split-pane--dragging': isDragging }]"
  >
    <div class="df-split-pane__first" :style="firstStyle">
      <slot name="first" />
    </div>

    <div
      class="df-split-pane__splitter"
      @mousedown="onMouseDown"
    >
      <div class="df-split-pane__splitter-bar" />
    </div>

    <div class="df-split-pane__second" :style="secondStyle">
      <slot name="second" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
  defaultRatio?: number
  min?: number
  max?: number
  splitterSize?: number
}>(), {
  direction: 'horizontal',
  defaultRatio: 0.5,
  min: 0.1,
  max: 0.9,
  splitterSize: 6,
})

const emit = defineEmits<{
  resize: [ratio: number]
}>()

defineOptions({ name: 'DfSplitPane' })

const containerRef = ref<HTMLElement>()
const ratio = ref(props.defaultRatio)
const isDragging = ref(false)

const firstStyle = computed(() => {
  const percent = `${ratio.value * 100}%`
  return props.direction === 'horizontal'
    ? { width: percent, height: '100%' }
    : { height: percent, width: '100%' }
})

const secondStyle = computed(() => {
  const percent = `${(1 - ratio.value) * 100}%`
  return props.direction === 'horizontal'
    ? { width: percent, height: '100%' }
    : { height: percent, width: '100%' }
})

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  isDragging.value = true
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value || !containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  let newRatio: number

  if (props.direction === 'horizontal') {
    newRatio = (e.clientX - rect.left) / rect.width
  } else {
    newRatio = (e.clientY - rect.top) / rect.height
  }

  newRatio = Math.max(props.min, Math.min(props.max, newRatio))
  ratio.value = newRatio
  emit('resize', newRatio)
}

function onMouseUp() {
  isDragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})

defineExpose({ ratio })
</script>

<style scoped>
.df-split-pane {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.df-split-pane--horizontal {
  flex-direction: row;
}

.df-split-pane--vertical {
  flex-direction: column;
}

.df-split-pane__first,
.df-split-pane__second {
  overflow: auto;
  min-width: 0;
  min-height: 0;
}

.df-split-pane__splitter {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--df-color-bg-page, #f2f3f5);
  transition: background-color 0.2s;
  z-index: 1;
}

.df-split-pane--horizontal .df-split-pane__splitter {
  width: v-bind('`${splitterSize}px`');
  cursor: col-resize;
}

.df-split-pane--vertical .df-split-pane__splitter {
  height: v-bind('`${splitterSize}px`');
  cursor: row-resize;
}

.df-split-pane__splitter:hover,
.df-split-pane--dragging .df-split-pane__splitter {
  background: var(--df-color-primary-light-9, #ecf5ff);
}

.df-split-pane__splitter-bar {
  border-radius: 2px;
  background: var(--df-color-border, #dcdfe6);
  transition: background-color 0.2s;
}

.df-split-pane--horizontal .df-split-pane__splitter-bar {
  width: 2px;
  height: 30px;
}

.df-split-pane--vertical .df-split-pane__splitter-bar {
  height: 2px;
  width: 30px;
}

.df-split-pane__splitter:hover .df-split-pane__splitter-bar,
.df-split-pane--dragging .df-split-pane__splitter-bar {
  background: var(--df-color-primary, #1890ff);
}

/* Prevent text selection during drag */
.df-split-pane--dragging {
  user-select: none;
}
</style>
