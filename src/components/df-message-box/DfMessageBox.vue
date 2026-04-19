<template>
  <transition name="df-msgbox-fade">
    <div v-if="visible" class="df-message-box__overlay" @click.self="handleWrapperClick">
      <div class="df-message-box" :class="{ 'df-message-box--center': center }" :style="{ width: typeof width === 'number' ? `${width}px` : width }">
        <!-- Header -->
        <div v-if="title" class="df-message-box__header">
          <span class="df-message-box__title">{{ title }}</span>
          <i v-if="showClose" class="dx-icon-close df-message-box__close" @click="handleAction('close')" />
        </div>
        <!-- Body -->
        <div class="df-message-box__body">
          <i v-if="iconClass" :class="iconClass" class="df-message-box__status" />
          <div class="df-message-box__message">
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message" />
          </div>
        </div>
        <!-- Prompt input -->
        <div v-if="showInput" class="df-message-box__input">
          <DxTextBox
            ref="inputRef"
            v-model:value="inputValue"
            :placeholder="inputPlaceholder"
            @enter-key="handleAction('confirm')"
          />
          <p v-if="inputErrorMessage && showInputError" class="df-message-box__errormsg">{{ inputErrorMessage }}</p>
        </div>
        <!-- Footer -->
        <div class="df-message-box__footer">
          <DxButton v-if="showCancelButton" :text="cancelButtonText" styling-mode="outlined" type="normal" @click="handleAction('cancel')" />
          <DxButton v-if="showConfirmButton" :text="confirmButtonText" type="default" styling-mode="contained" @click="handleAction('confirm')" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import { DxTextBox } from 'devextreme-vue/text-box'

export type MessageBoxAction = 'confirm' | 'cancel' | 'close'
export type MessageBoxType = 'alert' | 'confirm' | 'prompt'

export interface DfMessageBoxProps {
  title?: string
  message?: string
  type?: '' | 'success' | 'warning' | 'info' | 'error'
  boxType?: MessageBoxType
  showClose?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showInput?: boolean
  inputPlaceholder?: string
  inputType?: string
  inputValue?: string
  inputPattern?: RegExp
  inputValidator?: (val: string) => boolean | string
  inputErrorMessage?: string
  dangerouslyUseHTMLString?: boolean
  center?: boolean
  width?: string | number
  callback?: (action: MessageBoxAction, val?: string) => void
}

const props = withDefaults(defineProps<DfMessageBoxProps>(), {
  title: '提示',
  message: '',
  type: '',
  boxType: 'alert',
  showClose: true,
  showCancelButton: false,
  showConfirmButton: true,
  cancelButtonText: '取消',
  confirmButtonText: '确定',
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showInput: false,
  inputType: 'text',
  inputPlaceholder: '',
  inputValue: '',
  inputErrorMessage: '输入的数据不合法!',
  dangerouslyUseHTMLString: false,
  center: false,
  width: 420,
})

defineOptions({ name: 'DfMessageBox' })

const visible = ref(false)
const inputRef = ref<InstanceType<typeof DxTextBox>>()
const inputValue = ref(props.inputValue)
const showInputError = ref(false)

const ICON_MAP: Record<string, string> = {
  success: 'dx-icon-check', warning: 'dx-icon-warning', info: 'dx-icon-info', error: 'dx-icon-close',
}
const iconClass = computed(() => props.type ? ICON_MAP[props.type] : '')

function handleWrapperClick() {
  if (props.closeOnClickModal) handleAction('close')
}

function handleAction(action: MessageBoxAction) {
  if (action === 'confirm' && props.showInput) {
    if (props.inputPattern && !props.inputPattern.test(inputValue.value)) {
      showInputError.value = true
      return
    }
    if (props.inputValidator) {
      const result = props.inputValidator(inputValue.value)
      if (result === false || typeof result === 'string') {
        showInputError.value = true
        return
      }
    }
  }
  visible.value = false
  props.callback?.(action, inputValue.value)
}

onMounted(() => {
  visible.value = true
  if (props.showInput) {
    nextTick(() => inputRef.value?.instance?.focus())
  }
})

defineExpose({ visible, inputValue })
</script>

<style scoped>
.df-message-box__overlay { position: fixed; inset: 0; z-index: 2001; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; }
.df-message-box { background: var(--df-color-bg-surface, #fff); border-radius: var(--df-dialog-radius, 12px); box-shadow: var(--df-shadow-dialog, 0 6px 30px rgba(0,0,0,.12)); overflow: hidden; }
.df-message-box__header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px 8px; }
.df-message-box__title { font-size: 16px; font-weight: 700; color: var(--df-color-text-primary, #303133); }
.df-message-box__close { cursor: pointer; font-size: 16px; color: var(--df-color-text-placeholder, #B3BAC9); }
.df-message-box__close:hover { color: var(--df-color-primary, #409eff); }
.df-message-box__body { display: flex; align-items: flex-start; gap: 10px; padding: 10px 20px; }
.df-message-box__status { font-size: 24px; }
.df-message-box__message { font-size: 14px; color: var(--df-color-text-primary, #606266); line-height: 1.5; }
.df-message-box__message p { margin: 0; }
.df-message-box__input { padding: 4px 20px 16px; }
.df-message-box__errormsg { color: var(--df-color-error, #f56c6c); font-size: var(--df-font-size-xs, 12px); margin: 4px 0 0; }
.df-message-box__footer { display: flex; justify-content: flex-end; gap: 10px; padding: 8px 20px 16px; }
.df-message-box--center .df-message-box__body { justify-content: center; }
.df-message-box--center .df-message-box__footer { justify-content: center; }

.df-msgbox-fade-enter-active { transition: opacity .3s; }
.df-msgbox-fade-leave-active { transition: opacity .2s; }
.df-msgbox-fade-enter-from, .df-msgbox-fade-leave-to { opacity: 0; }
</style>
