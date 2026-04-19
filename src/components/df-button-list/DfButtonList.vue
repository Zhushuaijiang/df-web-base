<template>
  <div ref="containerRef" class="df-button-list" :class="{ [`df-button-list--${size}`]: size }">
    <!-- Visible buttons -->
    <template v-for="(btn, idx) in visibleButtons" :key="idx">
      <slot name="button" :item="btn" :index="idx">
        <button
          class="df-button-list__btn"
          :class="[`df-button-list__btn--${btn.type ?? 'default'}`, { 'is-disabled': btn.disabled }]"
          :disabled="btn.disabled"
          @click="handleClick(btn)"
        >
          <i v-if="btn.icon" :class="btn.icon" />
          {{ btn.label }}
        </button>
      </slot>
    </template>
    <!-- More dropdown -->
    <div v-if="overflowButtons.length" class="df-button-list__more" @click="toggleMore" @mouseleave="showMore = false">
      <button class="df-button-list__btn df-button-list__btn--default">
        {{ moreText }} <i class="dx-icon-chevrondown" />
      </button>
      <transition name="df-dropdown-fade">
        <ul v-show="showMore" class="df-button-list__dropdown">
          <li
            v-for="(btn, idx) in overflowButtons"
            :key="idx"
            class="df-button-list__dropdown-item"
            :class="{ 'is-disabled': btn.disabled }"
            @click.stop="handleOverflowClick(btn)"
          >
            <i v-if="btn.icon" :class="btn.icon" />
            {{ btn.label }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

export interface ButtonItem {
  label: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default' | 'text'
  icon?: string
  disabled?: boolean
  command?: string
  [key: string]: any
}

const props = withDefaults(defineProps<{
  buttons?: ButtonItem[]
  maxVisible?: number
  moreText?: string
  size?: 'large' | 'default' | 'small'
  autoCollapse?: boolean
}>(), {
  buttons: () => [],
  maxVisible: 3,
  moreText: '更多',
  size: 'default',
  autoCollapse: false,
})

const emit = defineEmits<{
  click: [item: ButtonItem]
  command: [command: string]
}>()

defineOptions({ name: 'DfButtonList' })

const containerRef = ref<HTMLElement>()
const showMore = ref(false)
const dynamicMax = ref(props.maxVisible)

const visibleButtons = computed(() => props.buttons.slice(0, dynamicMax.value))
const overflowButtons = computed(() => props.buttons.slice(dynamicMax.value))

function handleClick(btn: ButtonItem) {
  if (btn.disabled) return
  emit('click', btn)
  if (btn.command) emit('command', btn.command)
}

function handleOverflowClick(btn: ButtonItem) {
  if (btn.disabled) return
  showMore.value = false
  handleClick(btn)
}

function toggleMore() { showMore.value = !showMore.value }

// Auto-collapse: measure container width and adjust maxVisible
let ro: ResizeObserver | null = null

function recalculate() {
  if (!props.autoCollapse || !containerRef.value) return
  const containerWidth = containerRef.value.clientWidth
  const children = containerRef.value.querySelectorAll('.df-button-list__btn')
  let total = 0
  let fitCount = 0
  const moreWidth = 80 // reserve space for "more" button
  for (let i = 0; i < children.length && i < props.buttons.length; i++) {
    total += (children[i] as HTMLElement).offsetWidth + 8
    if (total + moreWidth < containerWidth) fitCount = i + 1
  }
  dynamicMax.value = Math.max(1, Math.min(fitCount, props.buttons.length))
}

onMounted(() => {
  if (props.autoCollapse && containerRef.value) {
    ro = new ResizeObserver(recalculate)
    ro.observe(containerRef.value)
    nextTick(recalculate)
  }
})

onBeforeUnmount(() => { ro?.disconnect() })

watch(() => props.maxVisible, v => {
  if (!props.autoCollapse) dynamicMax.value = v
})
</script>

<style scoped>
.df-button-list { display: inline-flex; align-items: center; gap: 8px; position: relative; }

.df-button-list__btn {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 6px 14px; border-radius: var(--df-radius-sm, 4px); font-size: var(--df-font-size-md, 14px);
  border: 1px solid var(--df-color-border, #dcdfe6); background: var(--df-color-bg-surface, #fff); color: var(--df-color-text-secondary, #606266);
  cursor: pointer; white-space: nowrap; transition: all .2s;
}
.df-button-list__btn:hover { color: var(--df-color-primary, #409eff); border-color: var(--df-color-primary, #409eff); }
.df-button-list__btn.is-disabled { color: var(--df-color-text-disabled, #c0c4cc); cursor: not-allowed; }

.df-button-list__btn--primary { background: var(--df-color-primary, #409eff); color: #fff; border-color: var(--df-color-primary, #409eff); }
.df-button-list__btn--primary:hover { opacity: .85; }
.df-button-list__btn--success { background: var(--df-color-success, #52C41A); color: #fff; border-color: var(--df-color-success, #52C41A); }
.df-button-list__btn--danger { background: var(--df-color-error, #F5222D); color: #fff; border-color: var(--df-color-error, #F5222D); }
.df-button-list__btn--warning { background: var(--df-color-warning, #FAAD14); color: #fff; border-color: var(--df-color-warning, #FAAD14); }
.df-button-list__btn--text { border: none; background: transparent; color: var(--df-color-primary, #409eff); padding: 6px 8px; }
.df-button-list__btn--text:hover { opacity: .7; }

.df-button-list--small .df-button-list__btn { padding: 4px 10px; font-size: 12px; }
.df-button-list--large .df-button-list__btn { padding: 8px 18px; font-size: 14px; }

.df-button-list__more { position: relative; }
.df-button-list__dropdown {
  position: absolute; top: calc(100% + 4px); right: 0; z-index: 2000;
  list-style: none; margin: 0; padding: 4px 0;
  min-width: 120px; background: var(--df-color-bg-surface, #fff); border-radius: var(--df-radius-sm, 4px);
  box-shadow: var(--df-shadow-md, 0 2px 12px rgba(0,0,0,.12)); border: 1px solid var(--df-color-border, #e4e7ed);
}
.df-button-list__dropdown-item {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; font-size: 14px; cursor: pointer; white-space: nowrap;
}
.df-button-list__dropdown-item:hover { background: var(--df-color-bg-secondary, #f5f7fa); color: var(--df-color-primary, #409eff); }
.df-button-list__dropdown-item.is-disabled { color: var(--df-color-text-disabled, #c0c4cc); cursor: not-allowed; }

.df-dropdown-fade-enter-active { transition: opacity .2s, transform .2s; }
.df-dropdown-fade-leave-active { transition: opacity .15s, transform .15s; }
.df-dropdown-fade-enter-from, .df-dropdown-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
