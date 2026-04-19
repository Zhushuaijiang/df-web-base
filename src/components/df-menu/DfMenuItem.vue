<template>
  <li
    class="df-menu-item"
    :class="{ 'is-active': isActive, 'is-disabled': disabled }"
    role="menuitem"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon" class="df-menu-item__icon" />
    <span v-if="!menu?.props.collapse" class="df-menu-item__title">
      <slot />
    </span>
    <slot v-else name="title" />
  </li>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

const props = withDefaults(defineProps<{
  index: string
  icon?: string
  disabled?: boolean
  route?: string | object
}>(), {
  disabled: false,
})

defineOptions({ name: 'DfMenuItem' })

const menu = inject<any>('dfMenu')
const submenu = inject<any>('dfSubmenu', null)

const isActive = computed(() => menu?.activeIndex.value === props.index)

const indexPath = computed(() => {
  const path: string[] = []
  if (submenu?.index) path.push(submenu.index)
  path.push(props.index)
  return path
})

function handleClick() {
  if (props.disabled) return
  menu?.handleSelect(props.index, indexPath.value)
}
</script>

<style scoped>
.df-menu-item {
  display: flex; align-items: center; gap: 8px;
  padding: 0 20px; height: 48px; cursor: pointer;
  white-space: nowrap; transition: background .2s, color .2s;
  list-style: none;
}

.df-menu-item:hover { background: #ecf5ff; }
.df-menu-item.is-active {
  color: var(--df-color-primary, #409eff);
  font-weight: 600;
}
.df-menu-item.is-disabled {
  color: #c0c4cc; cursor: not-allowed; pointer-events: none;
}
.df-menu-item__icon { font-size: 18px; width: 24px; text-align: center; }
</style>
