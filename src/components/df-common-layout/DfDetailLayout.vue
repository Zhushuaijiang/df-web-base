<template>
  <div class="df-detail-layout" :class="`df-detail-layout--${density}`">
    <!-- Header -->
    <div class="df-detail-layout__header">
      <div class="df-detail-layout__header-left">
        <button v-if="showBackButton" class="df-detail-layout__back" @click="emit('back')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <slot name="header">
          <h2 class="df-detail-layout__title">{{ title }}</h2>
          <span v-if="subtitle" class="df-detail-layout__subtitle">{{ subtitle }}</span>
          <slot name="statusTags" />
        </slot>
      </div>
      <div v-if="visibleActions.length || $slots.headerActions" class="df-detail-layout__actions">
        <slot name="headerActions">
          <DfButton
            v-for="action in visibleActions"
            :key="action.key"
            class="df-detail-layout__action-btn"
            :type="action.type || 'default'"
            :size="density === 'compact' ? 'small' : 'default'"
            :icon="action.icon"
            :disabled="action.disabled"
            @click="emit('action', action.key)"
          >
            {{ action.text }}
          </DfButton>
        </slot>
      </div>
    </div>

    <!-- Tab bar (if tabs exist) -->
    <div v-if="hasTabs" class="df-detail-layout__tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="df-detail-layout__tab"
        :class="{ 'df-detail-layout__tab--active': currentTab === tab.key }"
        @click="onTabClick(tab.key)"
      >
        <i v-if="tab.icon" :class="tab.icon" />
        {{ tab.title }}
      </button>
    </div>

    <!-- Toolbar (filters, search) -->
    <div v-if="$slots.toolbar" class="df-detail-layout__toolbar">
      <slot name="toolbar" />
    </div>

    <!-- Main Body -->
    <div class="df-detail-layout__body">
      <template v-if="splitLayout">
        <DfSplitPane :default-ratio="splitRatio" direction="horizontal">
          <template #first>
            <slot name="left" />
          </template>
          <template #second>
            <slot name="right" />
          </template>
        </DfSplitPane>
      </template>
      <template v-else-if="hasTabs">
        <template v-for="tab in tabs" :key="tab.key">
          <div
            v-if="!tab.lazy || visitedTabs.has(tab.key)"
            v-show="currentTab === tab.key"
            class="df-detail-layout__tab-pane"
          >
            <slot :name="`tab-${tab.key}`" :active="currentTab === tab.key" />
          </div>
        </template>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>

    <!-- Footer (sticky) -->
    <div v-if="$slots.footer" class="df-detail-layout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DfButton from '../df-button/DfButton.vue'
import DfSplitPane from '../df-split-pane/DfSplitPane.vue'
import type { DfDetailLayoutProps } from './types'

/**
 * DfDetailLayout — 详情/编辑页布局
 *
 * 基于联众医共体 HIS 真实界面分析：
 * - 详情页通常以弹窗形式呈现（90%×80%）
 * - 全页模式用于 360 视图、个人摘要等
 * - 表单区域使用 2/3 列栅格，标签右对齐
 * - 行间距 24px+，内容区内边距 16-24px
 * - 操作按钮右对齐，主按钮蓝色
 *
 * UI 规范要点：
 * - 规范 4: 容器内边距 8px
 * - 规范 17: 表单 gutter 12px
 * - 规范 21: 常规行高 22px
 * - 规范 25: 右侧按钮组，最重要的放最右边
 */
defineOptions({ name: 'DfDetailLayout' })

const props = withDefaults(defineProps<DfDetailLayoutProps>(), {
  splitLayout: false,
  splitRatio: 0.6,
  showBackButton: true,
  density: 'compact',
})

const emit = defineEmits<{
  back: []
  'tab-change': [tabKey: string]
  action: [actionKey: string]
  'update:activeTab': [tabKey: string]
}>()

const hasTabs = computed(() => props.tabs && props.tabs.length > 0)
const visibleActions = computed(() => props.actions ?? [])

const currentTab = ref(props.activeTab ?? props.tabs?.[0]?.key ?? '')
const visitedTabs = ref(new Set<string>([currentTab.value]))

watch(() => props.activeTab, (val) => {
  if (val != null) {
    currentTab.value = val
    visitedTabs.value = new Set([...visitedTabs.value, val])
  }
})

watch(() => props.tabs, (tabs) => {
  if (!tabs?.length) {
    currentTab.value = ''
    visitedTabs.value = new Set()
    return
  }

  const nextTabKey = props.activeTab && tabs.some(tab => tab.key === props.activeTab)
    ? props.activeTab
    : tabs[0]?.key ?? ''

  if (!tabs.some(tab => tab.key === currentTab.value)) {
    currentTab.value = nextTabKey
  }

  if (currentTab.value) {
    visitedTabs.value = new Set([...visitedTabs.value, currentTab.value])
  }
}, { deep: true, immediate: true })

function onTabClick(key: string) {
  currentTab.value = key
  visitedTabs.value = new Set([...visitedTabs.value, key])
  emit('tab-change', key)
  emit('update:activeTab', key)
}

defineExpose({
  currentTab,
  switchTab: onTabClick,
})
</script>

<style scoped>
.df-detail-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: var(--df-color-bg-surface, #fff);
}

/* ═══ Density: compact（医疗 HIS 默认） ═══
 *
 * 参考真实 HIS 截图度量：
 * - Header: 标题 + 操作按钮共存，需要足够高度
 * - Tab: 扁平贴合 header，底部 2px 指示线
 * - Body: 承载表单/表格，20px 内边距
 * - Footer: 操作按钮右对齐
 */
.df-detail-layout--compact {
  --d-header-h: 46px;
  --d-header-px: 20px;
  --d-header-gap: 12px;
  --d-title-size: 14px;
  --d-tab-h: 40px;
  --d-tab-px: 20px;
  --d-tab-font: 13px;
  --d-body-pad: 20px;
  --d-toolbar-pad: 10px 20px;
  --d-footer-h: 52px;
  --d-footer-py: 0;
  --d-footer-px: 20px;
  --d-btn-h: 30px;
  --d-btn-px: 16px;
  --d-border: var(--df-color-border-light, #e8e8ec);
}

/* ═══ Density: default（通用后台） ═══ */
.df-detail-layout--default {
  --d-header-h: 56px;
  --d-header-px: 24px;
  --d-header-gap: 14px;
  --d-title-size: 16px;
  --d-tab-h: 44px;
  --d-tab-px: 24px;
  --d-tab-font: 14px;
  --d-body-pad: 24px;
  --d-toolbar-pad: 12px 24px;
  --d-footer-h: 56px;
  --d-footer-py: 0;
  --d-footer-px: 24px;
  --d-btn-h: 32px;
  --d-btn-px: 20px;
  --d-border: var(--df-color-border-light, #e8e8ec);
}

/* ─── Header ─── */
.df-detail-layout__header {
  flex-shrink: 0;
  height: var(--d-header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--d-header-px);
  background: var(--df-color-bg-surface, #fff);
  border-bottom: 1px solid var(--d-border);
}

.df-detail-layout__header-left {
  display: flex;
  align-items: center;
  gap: var(--d-header-gap);
  min-width: 0;
  flex: 1;
}

/* 返回按钮：纯图标，无文字无边框，hover 出底色 */
.df-detail-layout__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--df-radius-sm, 4px);
  background: transparent;
  color: var(--df-color-text-secondary, #6B7790);
  cursor: pointer;
  flex-shrink: 0;
  transition: all var(--df-transition-fast, 0.15s ease);
}

.df-detail-layout__back:hover {
  color: var(--df-color-primary, #2AA890);
  background: var(--df-color-primary-50, #E8F5F3);
}

.df-detail-layout__title {
  font-size: var(--d-title-size);
  font-weight: var(--df-font-weight-semibold, 600);
  color: var(--df-color-text-primary, #1A1A1A);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.df-detail-layout__subtitle {
  font-size: var(--df-font-size-xs, 12px);
  color: var(--df-color-text-placeholder, #B3BAC9);
  white-space: nowrap;
}

.df-detail-layout__actions {
  display: flex;
  align-items: center;
  gap: var(--df-spacing-sm, 8px);
  flex-shrink: 0;
  min-width: 0;
}

.df-detail-layout__action-btn {
  flex: 0 0 auto;
  min-width: 64px;
}

.df-detail-layout__action-btn :deep(.dx-button) {
  height: var(--d-btn-h);
  min-height: var(--d-btn-h);
  box-sizing: border-box;
  border-radius: var(--df-radius-sm, 4px);
}

.df-detail-layout__action-btn :deep(.dx-button-content) {
  height: var(--d-btn-h);
  min-height: var(--d-btn-h);
  padding: 0 var(--d-btn-px);
  border-radius: var(--df-radius-sm, 4px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  line-height: 1;
  white-space: nowrap;
}

.df-detail-layout__action-btn :deep(.df-button__content) {
  min-height: 100%;
  line-height: 1;
}

/* ─── Tab Bar ─── */
.df-detail-layout__tab-bar {
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  gap: var(--df-spacing-sm, 8px);
  height: var(--d-tab-h);
  background: var(--df-color-bg-surface, #fff);
  border-bottom: 1px solid var(--d-border);
  padding: 0 var(--d-header-px);
}

.df-detail-layout__tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  gap: var(--df-spacing-xs, 4px);
  padding: 0 12px;
  height: 100%;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  font-size: var(--d-tab-font);
  color: var(--df-color-text-secondary, #6B7790);
  cursor: pointer;
  transition: all var(--df-transition-fast, 0.15s ease);
  margin-bottom: -1px;
  white-space: nowrap;
}

.df-detail-layout__tab:hover {
  color: var(--df-color-primary, #2AA890);
}

.df-detail-layout__tab--active {
  color: var(--df-color-primary, #2AA890);
  border-bottom-color: var(--df-color-primary, #2AA890);
  font-weight: var(--df-font-weight-medium, 500);
}

/* ─── Toolbar ─── */
.df-detail-layout__toolbar {
  flex-shrink: 0;
  padding: var(--d-toolbar-pad);
  background: var(--df-color-bg-surface, #fff);
  border-bottom: 1px solid var(--d-border);
  display: flex;
  align-items: center;
  gap: var(--df-spacing-sm, 8px);
  flex-wrap: wrap;
}

/* ─── Body ─── */
.df-detail-layout__body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: var(--d-body-pad);
}

.df-detail-layout__body > :deep(.df-split-pane) {
  height: 100%;
}

.df-detail-layout__tab-pane {
  width: 100%;
  min-height: 100%;
}

/* ─── Footer ─── */
.df-detail-layout__footer {
  flex-shrink: 0;
  height: var(--d-footer-h);
  padding: var(--d-footer-py) var(--d-footer-px);
  box-sizing: border-box;
  background: var(--df-color-bg-surface, #fff);
  border-top: 1px solid var(--d-border);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--df-spacing-sm, 8px);
}

.df-detail-layout__footer > :deep(*) {
  flex: 0 0 auto;
}

/* ─── Print ─── */
@media print {
  .df-detail-layout__header,
  .df-detail-layout__tab-bar,
  .df-detail-layout__toolbar,
  .df-detail-layout__footer {
    display: none !important;
  }
  .df-detail-layout__body {
    overflow: visible;
    padding: 0;
  }
}
</style>
