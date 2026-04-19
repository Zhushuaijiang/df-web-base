<template>
  <div class="df-button-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DfButtonGroup' })
</script>

<style scoped>
.df-button-group { display: inline-flex; }
.df-button-group > :deep(.df-button) { border-radius: 0; margin-left: -1px; }
.df-button-group > :deep(.df-button:first-child) { border-radius: var(--df-radius-sm, 4px) 0 0 var(--df-radius-sm, 4px); margin-left: 0; }
.df-button-group > :deep(.df-button:last-child) { border-radius: 0 var(--df-radius-sm, 4px) var(--df-radius-sm, 4px) 0; }
.df-button-group > :deep(.df-button:only-child) { border-radius: var(--df-radius-sm, 4px); }
.df-button-group > :deep(.df-button:hover) { z-index: 1; }
.df-button-group > :deep(.df-button.is-active) { z-index: 1; }
</style>
