<template>
  <li class="df-submenu" :class="{ 'is-opened': isOpen, 'is-disabled': disabled }">
    <div class="df-submenu__title" @click="toggle">
      <i v-if="icon" :class="icon" class="df-submenu__icon" />
      <span v-if="!menu?.props.collapse" class="df-submenu__text">
        <slot name="title" />
      </span>
      <i v-if="!menu?.props.collapse" class="dx-icon-chevrondown df-submenu__arrow" :class="{ 'is-rotated': isOpen }" />
    </div>
    <transition name="df-submenu-expand">
      <ul v-show="isOpen && !menu?.props.collapse" class="df-submenu__list" role="menu">
        <slot />
      </ul>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { inject, computed, provide } from 'vue'

const props = withDefaults(defineProps<{
  index: string
  icon?: string
  disabled?: boolean
}>(), {
  disabled: false,
})

defineOptions({ name: 'DfSubmenu' })

const menu = inject<any>('dfMenu')
const parentSubmenu = inject<any>('dfSubmenu', null)

const indexPath = computed(() => {
  const path: string[] = []
  if (parentSubmenu?.index) path.push(parentSubmenu.index)
  path.push(props.index)
  return path
})

const isOpen = computed(() => menu?.openedMenus.value.includes(props.index) ?? false)

function toggle() {
  if (props.disabled) return
  if (isOpen.value) {
    menu?.handleClose(props.index, indexPath.value)
  } else {
    menu?.handleOpen(props.index, indexPath.value)
  }
}

provide('dfSubmenu', { index: props.index })
</script>

<style scoped>
.df-submenu { list-style: none; }
.df-submenu__title {
  display: flex; align-items: center; gap: 8px;
  padding: 0 20px; height: 48px; cursor: pointer;
  transition: background .2s;
}
.df-submenu__title:hover { background: #ecf5ff; }
.df-submenu__icon { font-size: 18px; width: 24px; text-align: center; }
.df-submenu__text { flex: 1; }
.df-submenu__arrow { font-size: 12px; transition: transform .3s; margin-left: auto; }
.df-submenu__arrow.is-rotated { transform: rotate(180deg); }

.df-submenu__list {
  list-style: none; margin: 0; padding: 0;
  background: #f5f7fa;
}
.df-submenu__list :deep(.df-menu-item) { padding-left: 44px; }
.df-submenu.is-disabled { color: #c0c4cc; pointer-events: none; }

.df-submenu-expand-enter-active,
.df-submenu-expand-leave-active { transition: max-height .3s ease, opacity .3s; overflow: hidden; }
.df-submenu-expand-enter-from,
.df-submenu-expand-leave-to { max-height: 0; opacity: 0; }
.df-submenu-expand-enter-to,
.df-submenu-expand-leave-from { max-height: 500px; opacity: 1; }
</style>
