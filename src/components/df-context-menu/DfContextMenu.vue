<template>
  <Teleport to="body">
    <Transition name="df-context-menu-fade">
      <div
        v-if="visible"
        ref="menuRef"
        class="df-context-menu"
        :style="menuStyle"
        @contextmenu.prevent
      >
        <ul class="df-context-menu__list">
          <template v-for="(item, idx) in items" :key="item.command ?? idx">
            <li v-if="item.divided" class="df-context-menu__divider" />
            <li
              class="df-context-menu__item"
              :class="{
                'df-context-menu__item--disabled': item.disabled,
                'df-context-menu__item--has-icon': !!item.icon,
              }"
              @click="onItemClick(item)"
            >
              <i v-if="item.icon" :class="item.icon" class="df-context-menu__icon" />
              <span class="df-context-menu__label">{{ item.label }}</span>
              <span v-if="item.shortcut" class="df-context-menu__shortcut">{{ item.shortcut }}</span>
            </li>
          </template>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

export interface ContextMenuItem {
  label: string
  command?: string
  icon?: string
  shortcut?: string
  disabled?: boolean
  divided?: boolean
}

withDefaults(defineProps<{
  items?: ContextMenuItem[]
  trigger?: string
  appendToBody?: boolean
}>(), {
  items: () => [],
  trigger: 'contextmenu',
  appendToBody: true,
})

const emit = defineEmits<{
  select: [command: string, item: ContextMenuItem]
  show: []
  hide: []
}>()

defineOptions({ name: 'DfContextMenu' })

const visible = ref(false)
const position = ref({ x: 0, y: 0 })
const menuRef = ref<HTMLElement>()

const menuStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
}))

function show(x: number, y: number) {
  position.value = { x, y }
  visible.value = true
  emit('show')

  nextTick(() => {
    if (menuRef.value) {
      const rect = menuRef.value.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight

      if (rect.right > vw) {
        position.value = { ...position.value, x: vw - rect.width - 4 }
      }
      if (rect.bottom > vh) {
        position.value = { ...position.value, y: vh - rect.height - 4 }
      }
    }
  })
}

function hide() {
  if (visible.value) {
    visible.value = false
    emit('hide')
  }
}

function onItemClick(item: ContextMenuItem) {
  if (item.disabled) return
  const cmd = item.command ?? item.label
  emit('select', cmd, item)
  hide()
}

function onDocumentClick() {
  hide()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
  document.addEventListener('contextmenu', onDocumentClick, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick, true)
  document.removeEventListener('contextmenu', onDocumentClick, true)
})

defineExpose({ show, hide })
</script>

<style scoped>
.df-context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 150px;
  max-width: 280px;
  background: var(--df-color-bg-surface, #fff);
  border: 1px solid var(--df-color-border-light, #e4e7ed);
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  padding: 4px 0;
}

.df-context-menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.df-context-menu__item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--df-color-text-primary, #303133);
  cursor: pointer;
  gap: 8px;
  white-space: nowrap;
  transition: background-color 0.15s;
}

.df-context-menu__item:hover {
  background-color: var(--df-fill-color-light, #f5f7fa);
}

.df-context-menu__item--disabled {
  color: var(--df-color-text-disabled, #c0c4cc);
  cursor: not-allowed;
}

.df-context-menu__item--disabled:hover {
  background-color: transparent;
}

.df-context-menu__icon {
  font-size: 14px;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

.df-context-menu__label {
  flex: 1;
}

.df-context-menu__shortcut {
  font-size: 12px;
  color: var(--df-color-text-secondary, #909399);
  margin-left: 24px;
}

.df-context-menu__divider {
  height: 1px;
  background-color: var(--df-color-border-lighter, #ebeef5);
  margin: 4px 0;
}

.df-context-menu-fade-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.df-context-menu-fade-leave-active {
  transition: opacity 0.1s ease-in;
}

.df-context-menu-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.df-context-menu-fade-leave-to {
  opacity: 0;
}
</style>
