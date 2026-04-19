<template>
  <span class="df-breadcrumb-item">
    <span class="df-breadcrumb-item__inner" :class="{ 'is-link': to || $attrs.onClick }" @click="handleClick">
      <slot />
    </span>
    <span v-if="separatorIcon" class="df-breadcrumb-item__separator"><i :class="separatorIcon" /></span>
    <span v-else class="df-breadcrumb-item__separator">{{ separator }}</span>
  </span>
</template>

<script setup lang="ts">
import { inject } from 'vue'

defineProps<{ to?: string | Record<string, unknown>; replace?: boolean }>()

const emit = defineEmits<{ click: [] }>()

defineOptions({ name: 'DfBreadcrumbItem' })

const bc = inject<{ separator: string; separatorIcon?: string }>('dfBreadcrumb', { separator: '/' })
const separator = bc.separator
const separatorIcon = bc.separatorIcon

function handleClick() {
  emit('click')
}
</script>

<style scoped>
.df-breadcrumb-item { display: inline-flex; align-items: center; }
.df-breadcrumb-item__inner { color: var(--df-color-text-secondary, #606266); }
.df-breadcrumb-item__inner.is-link { color: var(--df-color-text-primary, #303133); cursor: pointer; }
.df-breadcrumb-item__inner.is-link:hover { color: var(--df-color-primary, #409eff); }
.df-breadcrumb-item__separator { margin: 0 8px; color: var(--df-color-text-placeholder, #c0c4cc); font-weight: 700; }
.df-breadcrumb-item:last-child .df-breadcrumb-item__inner { color: var(--df-color-text-secondary, #909399); cursor: default; }
.df-breadcrumb-item:last-child .df-breadcrumb-item__separator { display: none; }
</style>
