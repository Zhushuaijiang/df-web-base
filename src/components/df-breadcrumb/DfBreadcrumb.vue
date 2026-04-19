<template>
  <div class="df-breadcrumb" aria-label="Breadcrumb">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'

const props = withDefaults(defineProps<{
  separator?: string
  separatorIcon?: string
}>(), {
  separator: '/',
})

defineOptions({ name: 'DfBreadcrumb' })

provide('dfBreadcrumb', { separator: props.separator, separatorIcon: props.separatorIcon })
</script>

<style scoped>
.df-breadcrumb { display: flex; align-items: center; flex-wrap: wrap; font-size: 14px; line-height: 1; }
</style>
