<template>
  <div class="df-input" :class="rootClasses">
    <!-- 前置内容 -->
    <div v-if="$slots.prepend" class="df-input__prepend">
      <slot name="prepend" />
    </div>

    <div class="df-input__wrapper">
      <!-- 前缀图标 -->
      <span v-if="prefixIcon || $slots.prefix" class="df-input__prefix">
        <slot name="prefix">
          <i v-if="prefixIcon" :class="prefixIcon" />
        </slot>
      </span>

      <!-- 文本域模式 -->
      <DxTextArea
        v-if="type === 'textarea'"
        :value="(modelValue as any)"
        :placeholder="placeholder"
        :read-only="readonly"
        :disabled="disabled"
        :max-length="maxlength"
        :height="textareaHeight"
        :auto-resize-enabled="autosize !== false"
        class="df-input__inner"
        @value-changed="onValueChanged"
        @focus-in="onFocus"
        @focus-out="onBlur"
      />

      <!-- 普通输入模式 -->
      <DxTextBox
        v-else
        :value="(modelValue as any)"
        :placeholder="placeholder"
        :read-only="readonly"
        :disabled="disabled"
        :max-length="maxlength"
        :mode="(inputMode as any)"
        :show-clear-button="clearable"
        class="df-input__inner"
        @value-changed="onValueChanged"
        @focus-in="onFocus"
        @focus-out="onBlur"
        @enter-key="$emit('enter')"
      />

      <!-- 后缀图标 / 密码切换 / 字数统计 -->
      <span v-if="showSuffix" class="df-input__suffix">
        <button
          v-if="showPassword && type === 'password'"
          type="button"
          class="df-input__password-toggle"
          :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
          tabindex="0"
          @click="togglePasswordVisible"
        >
          <i :class="passwordVisible ? 'dx-icon-eyeopen' : 'dx-icon-eyeclose'" />
        </button>
        <span v-if="showWordLimit && maxlength" class="df-input__count">
          {{ currentLength }}/{{ maxlength }}
        </span>
        <slot name="suffix">
          <i v-if="suffixIcon" :class="suffixIcon" />
        </slot>
      </span>
    </div>

    <!-- 后置内容 -->
    <div v-if="$slots.append" class="df-input__append">
      <slot name="append" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxTextBox } from 'devextreme-vue/text-box'
import { DxTextArea } from 'devextreme-vue/text-area'

import type { DfInputProps } from './types'
import type { DxValueChangedEvent } from '../../types/devextreme'

const props = withDefaults(defineProps<DfInputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'default',
  placeholder: '请输入',
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
  showWordLimit: false,
  autosize: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  focus: [e: Event]
  blur: [e: Event]
  enter: []
}>()

defineOptions({ name: 'DfInput' })

const focused = ref(false)
const passwordVisible = ref(false)

const rootClasses = computed(() => [
  `df-input--${props.size}`,
  {
    'df-input--disabled': props.disabled,
    'df-input--textarea': props.type === 'textarea',
    'df-input--focused': focused.value,
    'df-input--prefix': !!props.prefixIcon,
    'df-input--suffix': showSuffix.value,
  },
])

const inputMode = computed(() => {
  if (props.type === 'password' && !passwordVisible.value) return 'password'
  if (props.type === 'number') return 'text'
  return 'text'
})

const textareaHeight = computed(() => {
  if (typeof props.autosize === 'object' && props.autosize.minRows) {
    return props.autosize.minRows * 24 + 12
  }
  return undefined
})

const showSuffix = computed(
  () =>
    !!(props.suffixIcon || (props.showPassword && props.type === 'password') || (props.showWordLimit && props.maxlength)),
)

const currentLength = computed(() => String(props.modelValue ?? '').length)

function onValueChanged(e: DxValueChangedEvent) {
  const val: string | number = (e.value as string | number) ?? ''
  emit('update:modelValue', val)
  emit('input', val)
  emit('change', val)
}

function onFocus(e: { event?: Event }) {
  focused.value = true
  emit('focus', e.event ?? new Event('focus'))
}

function onBlur(e: { event?: Event }) {
  focused.value = false
  emit('blur', e.event ?? new Event('blur'))
}

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}
</script>

<style scoped>
.df-input {
  display: inline-flex;
  align-items: stretch;
  width: 100%;
  font-size: var(--df-font-size-md, 14px);
}

.df-input__wrapper {
  flex: 1;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.df-input__inner {
  width: 100%;
}

.df-input__prefix,
.df-input__suffix {
  display: inline-flex;
  align-items: center;
  color: var(--df-color-text-placeholder, #999);
  padding: 0 4px;
}

.df-input__prefix {
  position: absolute;
  left: 8px;
  z-index: 1;
}

.df-input__suffix {
  position: absolute;
  right: 8px;
  z-index: 1;
  gap: 4px;
}

.df-input__password-toggle {
  cursor: pointer;
  font-size: 16px;
  background: none;
  border: none;
  padding: 0;
  line-height: 1;
  color: inherit;
}

.df-input__password-toggle:hover {
  color: var(--df-color-primary, #1976d2);
}

.df-input__count {
  font-size: var(--df-font-size-xs, 12px);
  color: var(--df-color-text-secondary, #999);
}

.df-input__prepend,
.df-input__append {
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  background: var(--df-color-bg-light, #f5f5f5);
  border: 1px solid var(--df-color-border, #e0e0e0);
  color: var(--df-color-text-secondary, #666);
  white-space: nowrap;
  box-sizing: border-box;
}

.df-input__prepend {
  border-right: none;
  border-radius: var(--df-radius-sm, 4px) 0 0 var(--df-radius-sm, 4px);
}

.df-input__append {
  border-left: none;
  border-radius: 0 var(--df-radius-sm, 4px) var(--df-radius-sm, 4px) 0;
}

.df-input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
