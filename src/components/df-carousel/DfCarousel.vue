<template>
  <div
    class="df-carousel"
    :class="[`df-carousel--${direction}`, { 'df-carousel--card': type === 'card' }]"
    :style="{ height: typeof height === 'number' ? `${height}px` : height }"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <div class="df-carousel__container" :style="containerStyle">
      <slot />
    </div>

    <!-- Indicators -->
    <ul v-if="showIndicators" class="df-carousel__indicators" :class="`df-carousel__indicators--${indicatorPosition}`">
      <li
        v-for="(_, idx) in itemCount"
        :key="idx"
        class="df-carousel__indicator"
        :class="{ 'is-active': idx === activeIndex }"
        @click="goTo(idx)"
        @mouseenter="indicatorTrigger === 'hover' ? goTo(idx) : undefined"
      />
    </ul>

    <!-- Arrows -->
    <template v-if="showArrow !== 'never'">
      <button
        class="df-carousel__arrow df-carousel__arrow--left"
        :class="{ 'is-always': showArrow === 'always' }"
        @click="prev"
      >
        <i class="dx-icon-chevronleft" />
      </button>
      <button
        class="df-carousel__arrow df-carousel__arrow--right"
        :class="{ 'is-always': showArrow === 'always' }"
        @click="next"
      >
        <i class="dx-icon-chevronright" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, provide, watch, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  height?: string | number
  initialIndex?: number
  autoplay?: boolean
  interval?: number
  showIndicators?: boolean
  indicatorPosition?: 'inside' | 'outside' | 'none'
  indicatorTrigger?: 'click' | 'hover'
  showArrow?: 'always' | 'hover' | 'never'
  type?: 'default' | 'card'
  direction?: 'horizontal' | 'vertical'
  loop?: boolean
}>(), {
  height: '300px',
  initialIndex: 0,
  autoplay: true,
  interval: 3000,
  showIndicators: true,
  indicatorPosition: 'inside',
  indicatorTrigger: 'click',
  showArrow: 'hover',
  type: 'default',
  direction: 'horizontal',
  loop: true,
})

const emit = defineEmits<{
  change: [current: number, prev: number]
}>()

defineOptions({ name: 'DfCarousel' })

const slots = useSlots()
const activeIndex = ref(props.initialIndex)
const timer = ref<ReturnType<typeof setInterval>>()

const itemCount = computed(() => {
  const defaultSlot = slots.default?.()
  return defaultSlot ? defaultSlot.length : 0
})

const containerStyle = computed(() => {
  const isVertical = props.direction === 'vertical'
  const offset = -activeIndex.value * 100
  return {
    transform: isVertical ? `translateY(${offset}%)` : `translateX(${offset}%)`,
    transition: 'transform 0.4s ease',
    display: 'flex',
    flexDirection: isVertical ? 'column' as const : 'row' as const,
    height: '100%',
    width: isVertical ? '100%' : `${itemCount.value * 100}%`,
  }
})

function goTo(index: number) {
  const count = itemCount.value
  if (count === 0) return

  const prev = activeIndex.value
  let next = index

  if (props.loop) {
    next = ((index % count) + count) % count
  } else {
    next = Math.max(0, Math.min(index, count - 1))
  }

  if (next !== prev) {
    activeIndex.value = next
    emit('change', next, prev)
  }
}

function prev() {
  goTo(activeIndex.value - 1)
}

function next() {
  goTo(activeIndex.value + 1)
}

function startAutoplay() {
  if (props.autoplay && props.interval > 0) {
    timer.value = setInterval(() => next(), props.interval)
  }
}

function stopAutoplay() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = undefined
  }
}

function pause() {
  stopAutoplay()
}

function resume() {
  startAutoplay()
}

watch(() => props.autoplay, (val) => {
  val ? startAutoplay() : stopAutoplay()
})

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})

provide('dfCarousel', { activeIndex })

defineExpose({ prev, next, goTo, activeIndex })
</script>

<style scoped>
.df-carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--df-radius-sm, 4px);
}

.df-carousel__container {
  position: relative;
}

/* Indicators */
.df-carousel__indicators {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.df-carousel__indicators--inside {
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.df-carousel__indicators--outside {
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
}

.df-carousel__indicator {
  width: 30px;
  height: 3px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.df-carousel__indicators--outside .df-carousel__indicator {
  background: var(--df-color-border, #dcdfe6);
}

.df-carousel__indicator.is-active {
  background: var(--df-color-primary, #1890ff);
  width: 40px;
}

/* Arrows */
.df-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(31, 45, 61, 0.2);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s, background 0.2s;
}

.df-carousel:hover .df-carousel__arrow,
.df-carousel__arrow.is-always {
  opacity: 1;
}

.df-carousel__arrow:hover {
  background: rgba(31, 45, 61, 0.4);
}

.df-carousel__arrow--left {
  left: 12px;
}

.df-carousel__arrow--right {
  right: 12px;
}

/* Vertical */
.df-carousel--vertical .df-carousel__indicators {
  flex-direction: column;
  right: 12px;
  top: 50%;
  left: auto;
  bottom: auto;
  transform: translateY(-50%);
}

.df-carousel--vertical .df-carousel__indicator {
  width: 3px;
  height: 30px;
}

.df-carousel--vertical .df-carousel__indicator.is-active {
  width: 3px;
  height: 40px;
}
</style>
