<template>
  <div class="df-tree-grid-layout">
    <DfSplitPane
      direction="horizontal"
      :default-ratio="treeRatio"
      :min="treeMin"
      :max="treeMax"
    >
      <template #first>
        <div class="df-tree-grid-layout__tree-panel">
          <div v-if="$slots.treeHeader || title" class="df-tree-grid-layout__tree-header">
            <slot name="treeHeader">
              <span class="df-tree-grid-layout__tree-title">{{ title }}</span>
            </slot>
          </div>
          <div v-if="$slots.treeToolbar" class="df-tree-grid-layout__tree-toolbar">
            <slot name="treeToolbar" />
          </div>
          <div class="df-tree-grid-layout__tree-body">
            <slot name="tree" />
          </div>
        </div>
      </template>
      <template #second>
        <div class="df-tree-grid-layout__grid-panel">
          <div v-if="$slots.gridToolbar" class="df-tree-grid-layout__grid-toolbar">
            <slot name="gridToolbar" />
          </div>
          <div class="df-tree-grid-layout__grid-body">
            <slot />
          </div>
          <div v-if="$slots.pagination" class="df-tree-grid-layout__grid-footer">
            <slot name="pagination" />
          </div>
        </div>
      </template>
    </DfSplitPane>
  </div>
</template>

<script setup lang="ts">
import DfSplitPane from '../df-split-pane/DfSplitPane.vue'

/**
 * DfTreeGridLayout — 左树右表布局
 *
 * HIS 高频布局：左侧分类树/列表 + 右侧数据表格 + 可拖拽分隔条
 * 参考：标准字典、检查目录、检查项目、药品字典
 *
 * 行业最佳实践：
 * - 可配置拖拽范围 (treeMin/treeMax)
 * - 树面板自动滚动到选中项
 * - 统一使用项目 design tokens
 */
defineOptions({ name: 'DfTreeGridLayout' })

withDefaults(defineProps<{
  /** 面板标题 */
  title?: string
  /** 左侧树面板占比 0-1，默认 0.25 */
  treeRatio?: number
  /** 左侧面板最小占比 */
  treeMin?: number
  /** 左侧面板最大占比 */
  treeMax?: number
}>(), {
  treeRatio: 0.25,
  treeMin: 0.15,
  treeMax: 0.5,
})
</script>

<style scoped>
.df-tree-grid-layout {
  height: 100%;
  width: 100%;
  background: var(--df-color-bg-surface, #fff);
}

/* ─── Tree Panel ─── */
.df-tree-grid-layout__tree-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--df-color-bg-surface, #fff);
}

.df-tree-grid-layout__tree-header {
  flex-shrink: 0;
  padding: var(--df-spacing-3, 12px) var(--df-spacing-4, 16px);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
}

.df-tree-grid-layout__tree-title {
  font-size: var(--df-font-size-md, 14px);
  font-weight: var(--df-font-weight-semibold, 600);
  color: var(--df-color-text-primary, #1A1A1A);
}

.df-tree-grid-layout__tree-toolbar {
  flex-shrink: 0;
  padding: var(--df-spacing-sm, 8px) var(--df-spacing-3, 12px);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
}

.df-tree-grid-layout__tree-body {
  flex: 1;
  overflow: auto;
  padding: var(--df-spacing-sm, 8px);
}

/* ─── Grid Panel ─── */
.df-tree-grid-layout__grid-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--df-color-bg-surface, #fff);
}

.df-tree-grid-layout__grid-toolbar {
  flex-shrink: 0;
  padding: var(--df-spacing-3, 12px) var(--df-spacing-4, 16px);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
  display: flex;
  align-items: center;
  gap: var(--df-spacing-sm, 8px);
  flex-wrap: wrap;
}

.df-tree-grid-layout__grid-body {
  flex: 1;
  overflow: auto;
}

.df-tree-grid-layout__grid-footer {
  flex-shrink: 0;
  padding: var(--df-spacing-sm, 8px) var(--df-spacing-4, 16px);
  border-top: 1px solid var(--df-color-border-light, #f0f2f5);
  display: flex;
  justify-content: flex-end;
}

/* ─── Responsive: stack on mobile ─── */
@media (max-width: 768px) {
  .df-tree-grid-layout__tree-panel {
    max-height: 40vh;
    border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
  }
}

/* ─── Print ─── */
@media print {
  .df-tree-grid-layout__tree-toolbar,
  .df-tree-grid-layout__grid-toolbar,
  .df-tree-grid-layout__grid-footer {
    display: none !important;
  }
  .df-tree-grid-layout__tree-body,
  .df-tree-grid-layout__grid-body {
    overflow: visible;
  }
}
</style>
