<template>
  <div class="df-timeline-layout" :class="{ 'df-timeline-layout--stacked': isStacked }">
    <!-- Detail Panel (left) -->
    <div class="df-timeline-layout__detail" :style="detailStyle">
      <div v-if="$slots.detailHeader" class="df-timeline-layout__detail-header">
        <slot name="detailHeader" />
      </div>
      <div class="df-timeline-layout__detail-body">
        <slot name="detail" />
      </div>
    </div>

    <!-- Timeline (right) -->
    <div class="df-timeline-layout__timeline">
      <div v-if="$slots.timelineHeader" class="df-timeline-layout__timeline-header">
        <slot name="timelineHeader" />
      </div>
      <div class="df-timeline-layout__timeline-body">
        <slot name="timeline" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/**
 * DfTimelineLayout — 时间轴+详情布局
 *
 * 行业最佳实践：
 * - 响应式：窄屏自动改为上下堆叠
 * - 可配置分隔比例
 * - 统一 design tokens
 */
defineOptions({ name: 'DfTimelineLayout' })

const props = withDefaults(defineProps<{
  /** 详情面板宽度 (桌面端) */
  detailWidth?: string
  /** 响应式：窗口宽度低于此值时改为上下堆叠 */
  stackBreakpoint?: number
}>(), {
  detailWidth: '55%',
  stackBreakpoint: 768,
})

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const isStacked = computed(() => windowWidth.value < props.stackBreakpoint)
const detailStyle = computed(() =>
  isStacked.value ? { width: '100%' } : { width: props.detailWidth },
)

function onResize() { windowWidth.value = window.innerWidth }

onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))
</script>

<style scoped>
.df-timeline-layout {
  display: flex;
  height: 100%;
  width: 100%;
  gap: var(--df-spacing-4, 16px);
}

.df-timeline-layout--stacked {
  flex-direction: column;
}

.df-timeline-layout__detail {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--df-color-bg-surface, #fff);
  border-radius: var(--df-radius-md, 8px);
  border: 1px solid var(--df-color-border-light, #f0f2f5);
  overflow: hidden;
  transition: width var(--df-transition-normal, 0.25s ease);
}

.df-timeline-layout--stacked .df-timeline-layout__detail {
  max-height: 45%;
}

.df-timeline-layout__detail-header {
  flex-shrink: 0;
  padding: var(--df-spacing-3, 12px) var(--df-spacing-4, 16px);
  background: var(--df-color-primary, #1890ff);
  color: #fff;
  font-size: var(--df-font-size-md, 14px);
  font-weight: var(--df-font-weight-semibold, 600);
}

.df-timeline-layout__detail-body {
  flex: 1;
  overflow: auto;
  padding: var(--df-spacing-4, 16px);
}

.df-timeline-layout__timeline {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--df-color-bg-surface, #fff);
  border-radius: var(--df-radius-md, 8px);
  border: 1px solid var(--df-color-border-light, #f0f2f5);
  overflow: hidden;
}

.df-timeline-layout__timeline-header {
  flex-shrink: 0;
  padding: var(--df-spacing-3, 12px) var(--df-spacing-4, 16px);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
  font-size: var(--df-font-size-md, 14px);
  font-weight: var(--df-font-weight-semibold, 600);
  color: var(--df-color-text-primary, #1A1A1A);
}

.df-timeline-layout__timeline-body {
  flex: 1;
  overflow: auto;
  padding: var(--df-spacing-4, 16px);
}

@media print {
  .df-timeline-layout {
    flex-direction: column;
    height: auto;
  }
  .df-timeline-layout__detail {
    width: 100% !important;
    max-height: none;
    border: none;
  }
  .df-timeline-layout__timeline {
    border: none;
  }
}
</style>
