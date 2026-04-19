<template>
  <div class="df-card" :class="shadowClass">
    <div v-if="$slots.header || header" class="df-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="df-card__body" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DfCardProps {
  header?: string
  bodyStyle?: Record<string, string> | string
  shadow?: 'always' | 'hover' | 'never'
}

const props = withDefaults(defineProps<DfCardProps>(), {
  shadow: 'always',
})

defineOptions({ name: 'DfCard' })

const shadowClass = computed(() => `df-card--${props.shadow}`)
</script>

<style scoped>
.df-card {
  border-radius: var(--df-radius-md, 8px);
  border: 1px solid var(--df-color-border, #e4e7ed);
  background: var(--df-color-bg-surface, #fff);
  overflow: hidden;
}
.df-card--always { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.df-card--hover { transition: box-shadow .3s; }
.df-card--hover:hover { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.df-card--never { box-shadow: none; }
.df-card__header {
  padding: 14px 20px;
  border-bottom: 1px solid var(--df-color-border, #e4e7ed);
  font-weight: 500;
}
.df-card__body { padding: 20px; }
</style>
