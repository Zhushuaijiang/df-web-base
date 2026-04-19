<template>
  <div class="df-app-shell" :class="rootClasses">
    <!-- Mobile Overlay -->
    <div
      v-if="isMobile && !isSidebarCollapsed"
      class="df-app-shell__overlay"
      @click="onOverlayClick"
    />

    <!-- Sidebar -->
    <aside
      class="df-app-shell__sidebar"
      :class="{ 'df-app-shell__sidebar--mobile': isMobile }"
      :style="sidebarStyle"
    >
      <div class="df-app-shell__sidebar-header">
        <slot name="sidebarHeader" :collapsed="isSidebarCollapsed">
          <span v-show="!isSidebarCollapsed" class="df-app-shell__logo-text">{{ logo }}</span>
          <span v-show="isSidebarCollapsed" class="df-app-shell__logo-icon">{{ logoIcon }}</span>
        </slot>
      </div>
      <nav class="df-app-shell__sidebar-nav" role="navigation" aria-label="主导航">
        <slot name="sidebar" :collapsed="isSidebarCollapsed" />
      </nav>
      <div class="df-app-shell__sidebar-footer">
        <slot name="sidebarFooter" :collapsed="isSidebarCollapsed" />
      </div>
    </aside>

    <!-- Main area -->
    <div class="df-app-shell__main">
      <!-- Header -->
      <header class="df-app-shell__header">
        <div class="df-app-shell__header-left">
          <DxButton
            class="df-app-shell__toggle-btn"
            icon="menu"
            styling-mode="text"
            :aria-label="isSidebarCollapsed ? '展开菜单' : '收起菜单'"
            @click="toggleSidebar"
          />
          <slot name="headerLeft" />
        </div>
        <div class="df-app-shell__header-right">
          <slot name="headerRight" />
        </div>
      </header>

      <!-- Breadcrumb -->
      <div v-if="$slots.breadcrumb" class="df-app-shell__breadcrumb">
        <slot name="breadcrumb" />
      </div>

      <!-- Tab bar (keep-alive tabs) -->
      <div v-if="$slots.tabs" class="df-app-shell__tabs">
        <slot name="tabs" />
      </div>

      <!-- Content -->
      <main class="df-app-shell__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { DxButton } from 'devextreme-vue/button'

/**
 * DfAppShell — 应用外壳布局
 *
 * HIS 最通用布局：左侧导航栏 + 顶部蓝条 + 主内容区
 * 参考：Ant Design Pro Layout / Arco Design Layout
 *
 * 行业最佳实践：
 * - 响应式断点：移动端自动切换 overlay 模式
 * - 面包屑 + 多页签插槽（keep-alive）
 * - 键盘可访问：ARIA 标签
 * - 统一使用项目 design tokens
 */
defineOptions({ name: 'DfAppShell' })

const props = withDefaults(defineProps<{
  /** Logo 文字（展开时显示） */
  logo?: string
  /** Logo 图标（折叠时显示） */
  logoIcon?: string
  /** 侧边栏展开宽度(px) */
  sidebarWidth?: number
  /** 侧边栏折叠宽度(px) */
  sidebarCollapsedWidth?: number
  /** 侧边栏默认是否折叠 */
  defaultSidebarCollapsed?: boolean
  /** 顶部 header 高度(px) */
  headerHeight?: number
  /** 移动端断点(px)，窗口宽度低于此值进入移动模式 */
  mobileBreakpoint?: number
}>(), {
  logo: '',
  logoIcon: '◆',
  sidebarWidth: 220,
  sidebarCollapsedWidth: 64,
  defaultSidebarCollapsed: false,
  headerHeight: 50,
  mobileBreakpoint: 768,
})

const emit = defineEmits<{
  'sidebar-collapse': [collapsed: boolean]
  'breakpoint-change': [isMobile: boolean]
}>()

const isSidebarCollapsed = ref(props.defaultSidebarCollapsed)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

const isMobile = computed(() => windowWidth.value < props.mobileBreakpoint)

const sidebarWidth = computed(() =>
  isMobile.value ? props.sidebarWidth
    : isSidebarCollapsed.value ? props.sidebarCollapsedWidth
      : props.sidebarWidth,
)

const rootClasses = computed(() => ({
  'df-app-shell--sidebar-collapsed': isSidebarCollapsed.value,
  'df-app-shell--mobile': isMobile.value,
}))

const sidebarStyle = computed(() => {
  const w = sidebarWidth.value
  if (isMobile.value) {
    return {
      width: `${w}px`,
      transform: isSidebarCollapsed.value ? 'translateX(-100%)' : 'translateX(0)',
    }
  }
  return { width: `${w}px` }
})

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  emit('sidebar-collapse', isSidebarCollapsed.value)
}

function onOverlayClick() {
  isSidebarCollapsed.value = true
  emit('sidebar-collapse', true)
}

function onResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

defineExpose({
  isSidebarCollapsed,
  isMobile,
  toggleSidebar,
  expandSidebar: () => { isSidebarCollapsed.value = false; emit('sidebar-collapse', false) },
  collapseSidebar: () => { isSidebarCollapsed.value = true; emit('sidebar-collapse', true) },
})
</script>

<style scoped>
.df-app-shell {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* ─── Sidebar ─── */
.df-app-shell__sidebar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--df-app-shell-sidebar-bg, #001529);
  color: var(--df-app-shell-sidebar-text, rgba(255, 255, 255, 0.85));
  overflow: hidden;
  transition: width var(--df-transition-normal, 0.25s ease);
  z-index: var(--df-z-sticky, 200);
}

.df-app-shell__sidebar--mobile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: transform var(--df-transition-normal, 0.25s ease);
  box-shadow: var(--df-shadow-xl, 0 16px 48px rgba(26, 32, 48, 0.16));
}

.df-app-shell__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: calc(var(--df-z-sticky, 200) - 1);
  animation: df-fade-in var(--df-transition-fast, 0.15s ease);
}

@keyframes df-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.df-app-shell__sidebar-header {
  flex-shrink: 0;
  height: var(--df-app-shell-header-height, 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.df-app-shell__logo-text {
  font-size: var(--df-font-size-lg, 16px);
  font-weight: var(--df-font-weight-semibold, 600);
  white-space: nowrap;
  color: #fff;
}

.df-app-shell__logo-icon {
  font-size: var(--df-font-size-2xl, 20px);
}

.df-app-shell__sidebar-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.15) transparent;
}

.df-app-shell__sidebar-footer {
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* ─── Main area ─── */
.df-app-shell__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

/* ─── Header ─── */
.df-app-shell__header {
  flex-shrink: 0;
  height: var(--df-app-shell-header-height, 50px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--df-spacing-6, 24px);
  background: var(--df-app-shell-header-bg, #1890ff);
  color: var(--df-app-shell-header-text, #fff);
  box-shadow: var(--df-shadow-sm, 0 1px 2px rgba(26, 32, 48, 0.06));
  z-index: var(--df-z-sticky, 200);
}

.df-app-shell__header-left,
.df-app-shell__header-right {
  display: flex;
  align-items: center;
  gap: var(--df-spacing-3, 12px);
}

/* ─── Breadcrumb ─── */
.df-app-shell__breadcrumb {
  flex-shrink: 0;
  padding: var(--df-spacing-2, 8px) var(--df-spacing-4, 16px);
  background: var(--df-color-bg-surface, #fff);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
}

/* ─── Tabs ─── */
.df-app-shell__tabs {
  flex-shrink: 0;
  padding: 0 var(--df-spacing-4, 16px);
  background: var(--df-color-bg-surface, #fff);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
}

/* ─── Content ─── */
.df-app-shell__content {
  flex: 1;
  overflow: auto;
  background: var(--df-color-bg-page, #E9E9EC);
}

/* ─── Print ─── */
@media print {
  .df-app-shell__sidebar,
  .df-app-shell__header,
  .df-app-shell__breadcrumb,
  .df-app-shell__tabs {
    display: none !important;
  }
  .df-app-shell__main {
    width: 100%;
  }
  .df-app-shell__content {
    overflow: visible;
  }
}
</style>
