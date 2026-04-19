<template>
  <div
    class="df-rate"
    :class="{
      'df-rate--disabled': disabled,
      'df-rate--readonly': readonly,
      [`df-rate--${size}`]: size,
    }"
    role="slider"
    :aria-valuenow="modelValue"
    :aria-valuemin="0"
    :aria-valuemax="max"
  >
    <span
      v-for="n in max"
      :key="n"
      class="df-rate__item"
      :class="{
        'is-active': n <= currentValue,
        'is-half-active': allowHalf && n - 0.5 === currentValue,
      }"
      :style="{ color: n <= currentValue ? activeColor : voidColor }"
      @click="onSelect(n)"
      @mouseenter="onHover(n)"
      @mouseleave="onHoverLeave"
    >
      <i :class="n <= currentValue ? activeIcon : voidIcon" class="df-rate__icon" />
      <i
        v-if="allowHalf"
        :class="activeIcon"
        class="df-rate__icon df-rate__icon--half"
        :style="{ color: n - 0.5 <= currentValue ? activeColor : 'transparent' }"
        @click.stop="onSelect(n - 0.5)"
      />
    </span>

    <span v-if="showText && texts.length" class="df-rate__text" :style="{ color: textColor }">
      {{ currentText }}
    </span>

    <span v-if="showScore" class="df-rate__score" :style="{ color: textColor }">
      {{ modelValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: number
  max?: number
  disabled?: boolean
  readonly?: boolean
  allowHalf?: boolean
  size?: 'large' | 'default' | 'small'
  activeColor?: string
  voidColor?: string
  activeIcon?: string
  voidIcon?: string
  showText?: boolean
  showScore?: boolean
  textColor?: string
  texts?: string[]
}>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  readonly: false,
  allowHalf: false,
  size: 'default',
  activeColor: '#FAAD14',
  voidColor: '#D1D6E0',
  activeIcon: 'dx-icon-favorites',
  voidIcon: 'dx-icon-favorites',
  showText: false,
  showScore: false,
  textColor: '#1A1A1A',
  texts: () => ['极差', '失望', '一般', '满意', '惊喜'],
})

const emit = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

defineOptions({ name: 'DfRate' })

const hoverValue = ref(-1)

const currentValue = computed(() => {
  return hoverValue.value >= 0 ? hoverValue.value : props.modelValue
})

const currentText = computed(() => {
  const idx = Math.ceil(currentValue.value) - 1
  return props.texts[idx] ?? ''
})

function onSelect(val: number) {
  if (props.disabled || props.readonly) return
  emit('update:modelValue', val)
  emit('change', val)
}

function onHover(val: number) {
  if (props.disabled || props.readonly) return
  hoverValue.value = val
}

function onHoverLeave() {
  hoverValue.value = -1
}
</script>

<style scoped>
.df-rate {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  line-height: 1;
}

.df-rate__item {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  transition: transform 0.15s;
}

.df-rate__item:hover {
  transform: scale(1.15);
}

.df-rate--disabled .df-rate__item,
.df-rate--readonly .df-rate__item {
  cursor: default;
}

.df-rate--disabled .df-rate__item:hover,
.df-rate--readonly .df-rate__item:hover {
  transform: none;
}

.df-rate__icon {
  font-size: 20px;
  transition: color 0.2s;
}

.df-rate__icon--half {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  overflow: hidden;
}

.df-rate--small .df-rate__icon {
  font-size: 16px;
}

.df-rate--large .df-rate__icon {
  font-size: 26px;
}

.df-rate__text,
.df-rate__score {
  margin-left: 8px;
  font-size: 14px;
  vertical-align: middle;
}

.df-rate--disabled {
  opacity: 0.6;
}
</style>
