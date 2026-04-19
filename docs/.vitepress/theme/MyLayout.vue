<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <ThemeSelector />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ThemeSelector from './ThemeSelector.vue'
</script>
