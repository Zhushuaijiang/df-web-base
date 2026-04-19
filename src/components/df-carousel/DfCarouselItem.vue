<template>
  <div
    class="df-carousel-item"
    :class="{ 'is-active': isActive }"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, getCurrentInstance } from 'vue'
import type { Ref } from 'vue'

withDefaults(defineProps<{
  name?: string
  label?: string
}>(), {
  name: '',
  label: '',
})

defineOptions({ name: 'DfCarouselItem' })

const carousel = inject<{ activeIndex: Ref<number> }>('dfCarousel')
const instance = getCurrentInstance()

const selfIndex = computed(() => {
  const parent = instance?.parent
  if (!parent?.subTree?.children) return 0
  const siblings = Array.isArray(parent.subTree.children)
    ? parent.subTree.children
    : []
  return siblings.indexOf(instance?.vnode) ?? 0
})

const isActive = computed(() => {
  return carousel?.activeIndex.value === selfIndex.value
})

const itemStyle = computed(() => ({
  flexShrink: 0,
  width: '100%',
  height: '100%',
}))
</script>

<style scoped>
.df-carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
