<template>
  <DxPopup
    :visible="modelValue"
    :title="title"
    :width="computedWidth"
    :height="computedHeight"
    :position="positionConfig"
    :show-title="showClose || !!title"
    :show-close-button="showClose"
    :shading="modal"
    :close-on-outside-click="wrapperClosable"
    :wrapper-attr="{ class: 'df-drawer' }"
    :animation="animationConfig"
    @hidden="onHidden"
    @showing="$emit('open')"
    @shown="$emit('opened')"
  >
    <template #content>
      <div class="df-drawer__body">
        <slot />
      </div>
      <div v-if="$slots.footer" class="df-drawer__footer">
        <slot name="footer" />
      </div>
    </template>
  </DxPopup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxPopup } from 'devextreme-vue/popup'

import type { DfDrawerProps, DrawerDirection } from './types'

const props = withDefaults(defineProps<DfDrawerProps>(), {
  modelValue: false,
  title: '',
  size: '30%',
  direction: 'rtl',
  modal: true,
  showClose: true,
  wrapperClosable: true,
  withHeader: true,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  open: []
  opened: []
  close: []
  closed: []
}>()

defineOptions({ name: 'DfDrawer' })

const isHorizontal = computed(() => props.direction === 'rtl' || props.direction === 'ltr')

const computedWidth = computed(() => isHorizontal.value ? props.size : '100%')
const computedHeight = computed(() => isHorizontal.value ? '100%' : props.size)

const POSITION_MAP: Record<DrawerDirection, Record<string, string>> = {
  rtl: { my: 'right top', at: 'right top', of: 'window' },
  ltr: { my: 'left top', at: 'left top', of: 'window' },
  ttb: { my: 'left top', at: 'left top', of: 'window' },
  btt: { my: 'left bottom', at: 'left bottom', of: 'window' },
}
const positionConfig = computed(() => POSITION_MAP[props.direction])

const ANIM_MAP: Record<DrawerDirection, Record<string, unknown>> = {
  rtl: { show: { type: 'slide', from: { left: '100%' }, to: { left: 0 }, duration: 300 }, hide: { type: 'slide', from: { left: 0 }, to: { left: '100%' }, duration: 300 } },
  ltr: { show: { type: 'slide', from: { left: '-100%' }, to: { left: 0 }, duration: 300 }, hide: { type: 'slide', from: { left: 0 }, to: { left: '-100%' }, duration: 300 } },
  ttb: { show: { type: 'slide', from: { top: '-100%' }, to: { top: 0 }, duration: 300 }, hide: { type: 'slide', from: { top: 0 }, to: { top: '-100%' }, duration: 300 } },
  btt: { show: { type: 'slide', from: { top: '100%' }, to: { top: 0 }, duration: 300 }, hide: { type: 'slide', from: { top: 0 }, to: { top: '100%' }, duration: 300 } },
}
const animationConfig = computed(() => ANIM_MAP[props.direction])

async function onHidden() {
  if (props.beforeClose) {
    const allow = await props.beforeClose()
    if (!allow) return
  }
  emit('update:modelValue', false)
  emit('close')
  emit('closed')
}
</script>

<style>
.df-drawer__body { flex: 1; overflow: auto; padding: 20px; }
.df-drawer__footer { padding: 12px 20px; border-top: 1px solid var(--df-color-border, #e4e7ed); display: flex; justify-content: flex-end; gap: 8px; }
</style>
