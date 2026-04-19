<template>
  <ul class="df-timeline" :class="{ 'df-timeline--reverse': reverse }">
    <slot />
  </ul>
</template>

<script setup lang="ts">
defineProps<{ reverse?: boolean }>()
defineOptions({ name: 'DfTimeline' })
</script>

<style scoped>
.df-timeline { list-style: none; margin: 0; padding: 0; }
.df-timeline--reverse { display: flex; flex-direction: column-reverse; }
</style>
