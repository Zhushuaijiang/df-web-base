<template>
  <li class="df-menu-item-group">
    <div class="df-menu-item-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <ul class="df-menu-item-group__list">
      <slot />
    </ul>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()

defineOptions({ name: 'DfMenuItemGroup' })

</script>

<style scoped>
.df-menu-item-group { list-style: none; }
.df-menu-item-group__title {
  padding: 8px 20px 4px;
  font-size: 12px; color: var(--df-color-text-secondary, #909399);
  line-height: 1; white-space: nowrap;
}
.df-menu-item-group__list {
  list-style: none; margin: 0; padding: 0;
}
</style>
