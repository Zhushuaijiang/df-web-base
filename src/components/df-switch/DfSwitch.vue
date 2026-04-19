<template>
  <div class="df-switch" :class="rootClasses" @click.prevent="handleToggle">
    <DxSwitch
      :value="isActive"
      :disabled="disabled"
      :width="switchWidth"
      @value-changed="onValueChanged"
    />
    <span v-if="$slots.default || activeText || inactiveText" class="df-switch__label">
      <slot>{{ isActive ? activeText : inactiveText }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxSwitch } from 'devextreme-vue/switch'

export interface DfSwitchProps {
  /** 绑定值 */
  modelValue?: boolean | string | number
  /** 打开时的值 */
  activeValue?: boolean | string | number
  /** 关闭时的值 */
  inactiveValue?: boolean | string | number
  /** 打开时文本 */
  activeText?: string
  /** 关闭时文本 */
  inactiveText?: string
  /** 禁用 */
  disabled?: boolean
  /** 宽度 */
  width?: number
}

const props = withDefaults(defineProps<DfSwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
  activeText: '',
  inactiveText: '',
  disabled: false,
  width: 44,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  change: [value: boolean | string | number]
}>()

defineOptions({ name: 'DfSwitch' })

const isActive = computed(() => props.modelValue === props.activeValue)

const switchWidth = computed(() => props.width)

const rootClasses = computed(() => ({
  'df-switch--active': isActive.value,
  'df-switch--disabled': props.disabled,
}))

function handleToggle() {
  if (props.disabled) return
  const newVal = isActive.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

function onValueChanged(_e: any) {
  // 由 handleToggle 统一处理
}
</script>

<style scoped>
.df-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.df-switch--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.df-switch__label {
  font-size: var(--df-font-size-md, 14px);
  color: var(--df-color-text-primary, #333);
  user-select: none;
}
</style>
