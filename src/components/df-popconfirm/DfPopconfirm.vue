<template>
  <DfPopover
    ref="popoverRef"
    trigger="click"
    :placement="placement"
    :width="width"
    effect="light"
    :visible="visible"
    @update:visible="v => visible = v"
  >
    <slot />
    <template #content>
      <div class="df-popconfirm">
        <div class="df-popconfirm__main">
          <i v-if="icon" :class="icon" class="df-popconfirm__icon" :style="{ color: iconColor }" />
          <span>{{ title }}</span>
        </div>
        <div class="df-popconfirm__action">
          <DxButton :text="cancelButtonText" styling-mode="outlined" type="normal" @click="handleCancel" />
          <DxButton :text="confirmButtonText" type="default" styling-mode="contained" @click="handleConfirm" />
        </div>
      </div>
    </template>
  </DfPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import DfPopover from '../df-popover/DfPopover.vue'

withDefaults(defineProps<{
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  cancelButtonType?: string
  icon?: string
  iconColor?: string
  hideIcon?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  width?: number | string
}>(), {
  title: '确定执行此操作吗？',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  confirmButtonType: 'primary',
  icon: 'dx-icon-warning',
  iconColor: '#e6a23c',
  hideIcon: false,
  placement: 'top',
  width: 220,
})

const emit = defineEmits<{ confirm: []; cancel: [] }>()

defineOptions({ name: 'DfPopconfirm' })

const visible = ref(false)

function handleConfirm() { visible.value = false; emit('confirm') }
function handleCancel() { visible.value = false; emit('cancel') }
</script>

<style scoped>
.df-popconfirm__main { display: flex; align-items: center; gap: 6px; font-size: 14px; margin-bottom: 12px; }
.df-popconfirm__icon { font-size: 16px; }
.df-popconfirm__action { display: flex; justify-content: flex-end; gap: 8px; }
</style>
