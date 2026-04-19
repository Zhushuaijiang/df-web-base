<template>
  <ul class="df-dropdown-menu">
    <slot />
  </ul>
</template>

<script setup lang="ts">
defineOptions({ name: 'DfDropdownMenu' })
</script>

<style scoped>
.df-dropdown-menu { list-style: none; margin: 0; padding: 0; }
</style>
