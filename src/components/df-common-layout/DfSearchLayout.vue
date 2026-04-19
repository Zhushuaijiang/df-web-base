<template>
  <div class="df-search-layout">
    <!-- Search Area -->
    <div
      class="df-search-layout__search"
      :class="{ 'df-search-layout__search--has-border': !isCollapsed }"
    >
      <div v-show="!isCollapsed" class="df-search-layout__search-body">
        <slot name="search" />
      </div>

      <div class="df-search-layout__search-bar">
        <div class="df-search-layout__search-actions">
          <slot name="searchActions" :collapsed="isCollapsed" :loading="loading">
            <DxButton
              type="default"
              styling-mode="contained"
              :disabled="loading"
              @click="handleSearch"
            >
              <span v-if="loading" class="df-search-layout__spinner" />
              {{ searchText }}
            </DxButton>
            <DxButton
              type="normal"
              styling-mode="outlined"
              :disabled="loading"
              @click="handleReset"
            >
              {{ resetText }}
            </DxButton>
          </slot>
        </div>

        <span
          v-if="collapsible"
          class="df-search-layout__toggle"
          @click="toggleCollapse"
        >
          {{ isCollapsed ? '展开' : '收起' }}
          <span
            class="df-search-layout__toggle-icon"
            :class="{ 'df-search-layout__toggle-icon--up': !isCollapsed }"
          >▼</span>
        </span>
      </div>
    </div>

    <!-- Toolbar -->
    <div v-if="$slots.toolbar" class="df-search-layout__toolbar">
      <slot name="toolbar" />
    </div>

    <!-- Content (Table) -->
    <div class="df-search-layout__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import type { DfSearchLayoutProps } from './types'

const props = withDefaults(defineProps<DfSearchLayoutProps>(), {
  collapsible: true,
  defaultCollapsed: false,
  searchText: '查询',
  resetText: '重置',
  loading: false,
})

const emit = defineEmits<{
  search: []
  reset: []
}>()

defineOptions({ name: 'DfSearchLayout' })

const isCollapsed = ref(props.defaultCollapsed)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function handleSearch() {
  emit('search')
}

function handleReset() {
  emit('reset')
}

defineExpose({
  /** 获取折叠状态 */
  isCollapsed,
  /** 展开搜索栏 */
  expand: () => { isCollapsed.value = false },
  /** 折叠搜索栏 */
  collapse: () => { isCollapsed.value = true },
})
</script>

<style scoped>
.df-search-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 0;
}

.df-search-layout__search {
  flex-shrink: 0;
  background: var(--df-color-bg-surface, #fff);
  border-radius: var(--df-radius-sm, 4px);
  margin-bottom: var(--df-spacing-sm, 8px);
}

.df-search-layout__search--has-border {
  border: 1px solid var(--df-color-border-light, #f0f2f5);
}

.df-search-layout__search-body {
  padding: var(--df-spacing-4, 16px) var(--df-spacing-4, 16px) 0;
}

.df-search-layout__search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--df-spacing-3, 12px) var(--df-spacing-4, 16px);
}

.df-search-layout__search-actions {
  display: flex;
  align-items: center;
  gap: var(--df-spacing-sm, 8px);
}

.df-search-layout__spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: df-spin 0.6s linear infinite;
}

@keyframes df-spin {
  to { transform: rotate(360deg); }
}

.df-search-layout__toggle {
  font-size: var(--df-font-size-sm, 13px);
  color: var(--df-color-primary, #1890ff);
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.df-search-layout__toggle:hover {
  opacity: 0.8;
}

.df-search-layout__toggle-icon {
  font-size: 10px;
  transition: transform var(--df-transition-fast, 0.15s ease);
  display: inline-block;
}

.df-search-layout__toggle-icon--up {
  transform: rotate(180deg);
}

.df-search-layout__toolbar {
  flex-shrink: 0;
  padding: var(--df-spacing-sm, 8px) 0;
}

.df-search-layout__content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
