<template>
  <DxPopup
    :visible="isVisible"
    :title="title"
    :width="computedWidth"
    :height="computedHeight"
    :show-close-button="showCloseButton"
    :drag-enabled="dragEnabled"
    :close-on-outside-click="effectiveCloseOnOutside"
    :shading="true"
    :wrapper-attr="wrapperAttr"
    shading-color="rgba(0, 0, 0, 0.5)"
    role="dialog"
    aria-modal="true"
    @hidden="onHidden"
    @shown="onShown"
  >
    <template #content>
      <div class="df-dialog__body" @keydown.tab="trapFocus">
        <span v-if="title" id="df-dialog-title" class="sr-only">{{ title }}</span>
        <slot />
      </div>
      <div v-if="$slots.footer || showDefaultFooter" class="df-dialog__footer">
        <slot name="footer">
          <button class="df-dialog__btn df-dialog__btn--default" @click="onCancel">
            {{ cancelText }}
          </button>
          <button
            class="df-dialog__btn df-dialog__btn--primary"
            :disabled="confirmLoading"
            @click="onConfirm"
          >
            <DfLoading v-if="confirmLoading" :loading="true" />
            {{ confirmText }}
          </button>
        </slot>
      </div>
    </template>
  </DxPopup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxPopup } from 'devextreme-vue/popup'
import DfLoading from '../df-loading/DfLoading.vue'

import type { DfDialogProps } from './types'

const props = withDefaults(defineProps<DfDialogProps>(), {
  modelValue: undefined,
  visible: undefined,
  title: '',
  size: 'md',
  showCloseButton: true,
  dragEnabled: true,
  closeOnOutsideClick: undefined,
  closeOnClickModal: undefined,
  showDefaultFooter: true,
  confirmText: '确定',
  cancelText: '取消',
  confirmLoading: false,
  customClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:visible': [value: boolean]
  confirm: []
  cancel: []
  close: []
  shown: []
}>()

defineOptions({ name: 'DfDialog' })

/** 兼容 v-model 和 v-model:visible 两种用法 */
const isVisible = computed(() => props.modelValue ?? props.visible ?? false)

/** 合并 closeOnOutsideClick 和 closeOnClickModal（向后兼容） */
const effectiveCloseOnOutside = computed(() => {
  if (props.closeOnOutsideClick !== undefined) return props.closeOnOutsideClick
  if (props.closeOnClickModal !== undefined) return props.closeOnClickModal
  return false
})

const SIZE_MAP: Record<string, { width: number | string; height: number | string }> = {
  sm: { width: 480, height: 'auto' },
  md: { width: '90%', height: '80vh' },
  lg: { width: 960, height: '80vh' },
  xl: { width: 1200, height: '85vh' },
  fullscreen: { width: '100vw', height: '100vh' },
}

const computedWidth = computed(() => props.width ?? SIZE_MAP[props.size]?.width ?? 680)
const computedHeight = computed(() => props.height ?? SIZE_MAP[props.size]?.height ?? 'auto')

const wrapperAttr = computed(() => {
  const attrs: Record<string, string> = {
    class: ['df-dialog', props.customClass].filter(Boolean).join(' '),
  }
  if (props.title) {
    attrs['aria-labelledby'] = 'df-dialog-title'
  }
  return attrs
})

function setVisible(val: boolean) {
  emit('update:modelValue', val)
  emit('update:visible', val)
}

function onHidden() {
  setVisible(false)
  emit('close')
}

function onConfirm() {
  emit('confirm')
}

function onCancel() {
  setVisible(false)
  emit('cancel')
}

function onShown() {
  emit('shown')
}

/** Basic focus trap: keep Tab cycling inside the dialog body */
function trapFocus(e: KeyboardEvent) {
  const container = (e.currentTarget as HTMLElement)
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
  )
  if (focusable.length === 0) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}
</script>

<style scoped>
.df-dialog__body {
  flex: 1;
  overflow: auto;
  padding: var(--df-spacing-md, 16px);
}

.df-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--df-spacing-sm, 8px);
  padding: var(--df-spacing-sm, 8px) var(--df-spacing-md, 16px);
  border-top: 1px solid var(--df-color-border, #e0e0e0);
}

.df-dialog__btn {
  padding: 6px 20px;
  border-radius: var(--df-radius-sm, 4px);
  font-size: var(--df-font-size-md, 14px);
  cursor: pointer;
  border: 1px solid var(--df-color-border, #e0e0e0);
  transition: all var(--df-transition-fast, 150ms);
  position: relative;
}

.df-dialog__btn--default {
  background: var(--df-color-bg-surface, #fff);
  color: var(--df-color-text-primary, #333);
}

.df-dialog__btn--default:hover {
  border-color: var(--df-color-primary, #1976d2);
  color: var(--df-color-primary, #1976d2);
}

.df-dialog__btn--primary {
  background: var(--df-color-primary, #1976d2);
  color: var(--df-color-primary-contrast, #fff);
  border-color: var(--df-color-primary, #1976d2);
}

.df-dialog__btn--primary:hover {
  background: var(--df-color-primary-dark, #1565c0);
}

.df-dialog__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
