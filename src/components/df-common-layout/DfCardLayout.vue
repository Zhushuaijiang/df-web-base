<template>
  <div
    class="df-card-layout"
    :class="[
      `df-card-layout--shadow-${shadow}`,
      {
        'df-card-layout--bordered': bordered,
        'df-card-layout--collapsed': isCollapsed,
      },
      cssClass,
    ]"
  >
    <div
      v-if="title || $slots.header || hasActions"
      class="df-card-layout__header"
      :class="{ 'df-card-layout__header--clickable': collapsible }"
      @click="onHeaderClick"
    >
      <div class="df-card-layout__header-left">
        <slot name="header">
          <span class="df-card-layout__title">{{ title }}</span>
        </slot>
      </div>
      <div class="df-card-layout__header-right">
        <span
          v-for="action in actions"
          :key="action.key"
          class="df-card-layout__action"
          @click.stop="emit('action', action.key)"
        >
          <i v-if="action.icon" :class="action.icon" />
          <span v-if="action.text">{{ action.text }}</span>
        </span>
        <span
          v-if="collapsible"
          class="df-card-layout__collapse-trigger"
          :class="{ 'df-card-layout__collapse-trigger--open': !isCollapsed }"
        >
          ▼
        </span>
      </div>
    </div>

    <div v-show="!isCollapsed" class="df-card-layout__body" :style="bodyStyle">
      <slot />
    </div>

    <div v-if="$slots.footer && !isCollapsed" class="df-card-layout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DfCardLayoutProps } from './types'

const props = withDefaults(defineProps<DfCardLayoutProps>(), {
  collapsible: false,
  defaultCollapsed: false,
  padding: 16,
  shadow: 'sm',
  bordered: true,
})

const emit = defineEmits<{
  action: [key: string]
  'update:collapsed': [value: boolean]
}>()

defineOptions({ name: 'DfCardLayout' })

const isCollapsed = ref(props.defaultCollapsed)

const hasActions = computed(() => props.actions && props.actions.length > 0)

const bodyStyle = computed(() => {
  const p = typeof props.padding === 'number' ? `${props.padding}px` : props.padding
  return { padding: p }
})

function onHeaderClick() {
  if (!props.collapsible) return
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}
</script>

<style scoped>
.df-card-layout {
  background: var(--df-color-bg-surface, #fff);
  border-radius: var(--df-radius-sm, 4px);
  overflow: hidden;
  transition: box-shadow var(--df-transition-fast, 0.15s ease);
}

.df-card-layout--bordered {
  border: 1px solid var(--df-color-border, #e3e3e3);
}

.df-card-layout--shadow-none { box-shadow: none; }
.df-card-layout--shadow-sm { box-shadow: var(--df-shadow-sm, 0 1px 2px rgba(26, 32, 48, 0.06)); }
.df-card-layout--shadow-md { box-shadow: var(--df-shadow-md, 0 4px 8px rgba(26, 32, 48, 0.08)); }
.df-card-layout--shadow-lg { box-shadow: var(--df-shadow-lg, 0 8px 24px rgba(26, 32, 48, 0.12)); }

.df-card-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--df-spacing-3, 12px) var(--df-spacing-4, 16px);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
  user-select: none;
}

.df-card-layout__header--clickable {
  cursor: pointer;
}

.df-card-layout__header--clickable:hover {
  background: var(--df-color-bg-active, #eff0f0);
}

.df-card-layout__header-left {
  display: flex;
  align-items: center;
  gap: var(--df-spacing-sm, 8px);
  min-width: 0;
  flex: 1;
}

.df-card-layout__title {
  font-size: var(--df-font-size-md, 14px);
  font-weight: var(--df-font-weight-semibold, 600);
  color: var(--df-color-text-primary, #1A1A1A);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.df-card-layout__header-right {
  display: flex;
  align-items: center;
  gap: var(--df-spacing-sm, 8px);
  flex-shrink: 0;
}

.df-card-layout__action {
  font-size: var(--df-font-size-sm, 13px);
  color: var(--df-color-primary, #2AA890);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.df-card-layout__action:hover {
  opacity: 0.8;
}

.df-card-layout__collapse-trigger {
  font-size: 10px;
  color: var(--df-color-text-secondary, #6B7790);
  transition: transform var(--df-transition-fast, 0.15s ease);
  display: inline-block;
}

.df-card-layout__collapse-trigger--open {
  transform: rotate(180deg);
}

.df-card-layout__body {
  /* padding set via :style */
}

.df-card-layout__footer {
  padding: var(--df-spacing-sm, 8px) var(--df-spacing-4, 16px);
  border-top: 1px solid var(--df-color-border-light, #f0f2f5);
}

/* collapsed state: hide bottom border on header */
.df-card-layout--collapsed .df-card-layout__header {
  border-bottom-color: transparent;
}
</style>
