<template>
  <div class="df-divider" :class="classes" role="separator">
    <div v-if="$slots.default && direction === 'horizontal'" class="df-divider__text" :style="{ [contentPosition]: '20px' }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
  contentPosition?: 'left' | 'center' | 'right'
  borderStyle?: 'solid' | 'dashed' | 'dotted'
}>(), {
  direction: 'horizontal',
  contentPosition: 'center',
  borderStyle: 'solid',
})

defineOptions({ name: 'DfDivider' })

const classes = computed(() => [
  `df-divider--${props.direction}`,
  { 'df-divider--with-text': !!useSlots().default },
])

import { useSlots } from 'vue'
</script>

<style scoped>
.df-divider--horizontal {
  display: flex; align-items: center; margin: 16px 0;
  border-top: 1px v-bind(borderStyle) var(--df-color-border, #dcdfe6);
}
.df-divider--horizontal.df-divider--with-text { border-top: none; }
.df-divider--horizontal.df-divider--with-text::before,
.df-divider--horizontal.df-divider--with-text::after {
  content: ''; flex: 1; border-top: 1px v-bind(borderStyle) var(--df-color-border, #dcdfe6);
}
.df-divider__text { padding: 0 16px; font-size: 14px; color: var(--df-color-text-primary, #303133); white-space: nowrap; }
.df-divider--vertical { display: inline-block; width: 1px; height: 1em; margin: 0 8px; vertical-align: middle; border-left: 1px v-bind(borderStyle) var(--df-color-border, #dcdfe6); }
</style>
