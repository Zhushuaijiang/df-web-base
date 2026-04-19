<template>
  <div class="df-form-layout">
    <!-- Main Form Area -->
    <div ref="mainRef" class="df-form-layout__main" @scroll="onScroll">
      <template v-if="sections.length > 0">
        <DfCardLayout
          v-for="section in sections"
          :key="section.key"
          :title="section.title"
          :collapsible="section.collapsible ?? collapsible"
          :shadow="'none'"
          :bordered="true"
          :data-section-key="section.key"
          css-class="df-form-layout__section"
        >
          <template v-if="$slots[`section-header-${section.key}`]" #header>
            <slot :name="`section-header-${section.key}`" />
          </template>
          <slot :name="`section-${section.key}`" />
          <template v-if="$slots[`section-footer-${section.key}`]" #footer>
            <slot :name="`section-footer-${section.key}`" />
          </template>
        </DfCardLayout>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>

    <!-- Quick Navigation (right side) -->
    <div v-if="sections.length > 0 && showQuickNav" class="df-form-layout__quicknav">
      <div class="df-form-layout__quicknav-title">{{ quickNavTitle }}</div>
      <nav class="df-form-layout__quicknav-list">
        <a
          v-for="section in sections"
          :key="section.key"
          class="df-form-layout__quicknav-item"
          :class="{ 'df-form-layout__quicknav-item--active': activeSection === section.key }"
          @click="scrollToSection(section.key)"
        >
          {{ section.title }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DfCardLayout from './DfCardLayout.vue'
import type { FormSection } from './types'

/**
 * DfFormLayout — 分段表单布局
 *
 * 行业最佳实践：
 * - IntersectionObserver 追踪当前可见 section（Ant Design Anchor 模式）
 * - scroll-margin-top 精准定位
 * - 统一 design tokens
 */
defineOptions({ name: 'DfFormLayout' })

const props = withDefaults(defineProps<{
  /** 表单分组定义 */
  sections?: FormSection[]
  /** 是否显示右侧快速导航 */
  showQuickNav?: boolean
  /** 快速导航标题 */
  quickNavTitle?: string
  /** 分组是否可折叠 */
  collapsible?: boolean
}>(), {
  sections: () => [],
  showQuickNav: true,
  quickNavTitle: '导航',
  collapsible: false,
})

const mainRef = ref<HTMLElement>()
const activeSection = ref(props.sections[0]?.key ?? '')
let observer: IntersectionObserver | null = null

function scrollToSection(key: string) {
  activeSection.value = key
  const el = mainRef.value?.querySelector(`[data-section-key="${key}"]`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function onScroll() {
  // IntersectionObserver handles this, this is a no-op kept for extensibility
}

onMounted(() => {
  if (!mainRef.value || props.sections.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const key = (entry.target as HTMLElement).dataset.sectionKey
          if (key) activeSection.value = key
        }
      }
    },
    {
      root: mainRef.value,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0,
    },
  )

  const cards = mainRef.value.querySelectorAll('[data-section-key]')
  cards.forEach((card) => observer!.observe(card))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

defineExpose({ activeSection, scrollToSection })
</script>

<style scoped>
.df-form-layout {
  display: flex;
  gap: var(--df-spacing-4, 16px);
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.df-form-layout__main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--df-spacing-4, 16px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--df-spacing-4, 16px);
}

/* ─── Quick Navigation ─── */
.df-form-layout__quicknav {
  flex-shrink: 0;
  width: 180px;
  position: sticky;
  top: 0;
  align-self: flex-start;
  background: var(--df-color-bg-surface, #fff);
  border-radius: var(--df-radius-md, 8px);
  border: 1px solid var(--df-color-border-light, #f0f2f5);
  overflow: hidden;
  margin: var(--df-spacing-4, 16px);
}

.df-form-layout__quicknav-title {
  padding: var(--df-spacing-3, 12px) var(--df-spacing-4, 16px);
  font-size: var(--df-font-size-md, 14px);
  font-weight: var(--df-font-weight-semibold, 600);
  color: var(--df-color-text-primary, #1A1A1A);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
}

.df-form-layout__quicknav-list {
  padding: var(--df-spacing-sm, 8px) 0;
}

.df-form-layout__quicknav-item {
  display: block;
  padding: var(--df-spacing-sm, 8px) var(--df-spacing-4, 16px);
  font-size: var(--df-font-size-sm, 13px);
  color: var(--df-color-text-secondary, #6B7790);
  cursor: pointer;
  transition: all var(--df-transition-fast, 0.15s ease);
  text-decoration: none;
  border-left: 2px solid transparent;
}

.df-form-layout__quicknav-item:hover {
  color: var(--df-color-primary, #1890ff);
  background: var(--df-color-primary-50, #ecf5ff);
}

.df-form-layout__quicknav-item--active {
  color: var(--df-color-primary, #1890ff);
  font-weight: var(--df-font-weight-medium, 500);
  border-left-color: var(--df-color-primary, #1890ff);
  background: var(--df-color-primary-50, #ecf5ff);
}

/* ─── Section scroll offset ─── */
:deep(.df-form-layout__section) {
  width: 100%;
  flex: 0 0 auto;
  scroll-margin-top: var(--df-spacing-2, 8px);
}

/* ─── Responsive: hide quicknav on mobile ─── */
@media (max-width: 768px) {
  .df-form-layout__quicknav {
    display: none;
  }
}
</style>
