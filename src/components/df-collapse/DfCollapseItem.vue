<template>
  <div class="df-collapse-item" :class="{ 'is-active': isActive, 'is-disabled': disabled }">
    <div class="df-collapse-item__header" role="tab" :aria-expanded="isActive" @click="handleClick">
      <slot name="title">{{ title }}</slot>
      <i class="df-collapse-item__arrow" :class="{ 'is-active': isActive }">▸</i>
    </div>
    <transition name="df-collapse">
      <div v-show="isActive" class="df-collapse-item__wrap" role="tabpanel">
        <div class="df-collapse-item__content"><slot /></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Ref } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  name?: string | number
  disabled?: boolean
}>(), { title: '', disabled: false })

defineOptions({ name: 'DfCollapseItem' })

const parent = inject<{ activeNames: Ref<Array<string | number>>; toggle: (n: string | number) => void }>('dfCollapse')!

const itemName = computed(() => props.name ?? 0)
const isActive = computed(() => parent.activeNames.value.includes(itemName.value))

function handleClick() {
  if (!props.disabled) parent.toggle(itemName.value)
}
</script>

<style scoped>
.df-collapse-item__header {
  display: flex; align-items: center; justify-content: space-between;
  height: 48px; padding: 0 16px; cursor: pointer; user-select: none;
  font-size: 14px; font-weight: 500; color: var(--df-color-text-primary, #303133);
  border-bottom: 1px solid var(--df-color-border, #e4e7ed);
  box-sizing: border-box;
}
.df-collapse-item.is-disabled .df-collapse-item__header { color: #bbb; cursor: not-allowed; }
.df-collapse-item__arrow { transition: transform .3s; font-size: 12px; }
.df-collapse-item__arrow.is-active { transform: rotate(90deg); }
.df-collapse-item__content { padding: 16px; font-size: 13px; color: var(--df-color-text-secondary, #606266); }

.df-collapse-enter-active, .df-collapse-leave-active { transition: all .3s ease-in-out; overflow: hidden; }
.df-collapse-enter-from, .df-collapse-leave-to { max-height: 0; opacity: 0; }
.df-collapse-enter-to, .df-collapse-leave-from { max-height: 500px; opacity: 1; }
</style>
