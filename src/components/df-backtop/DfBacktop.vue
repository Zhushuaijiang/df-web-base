<template>
  <transition name="df-fade-in">
    <div v-if="visible" class="df-backtop" :style="positionStyle" @click.stop="scrollToTop">
      <slot>
        <i class="dx-icon-chevronup" />
      </slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, shallowRef } from 'vue'

const props = withDefaults(defineProps<{
  visibilityHeight?: number
  right?: number
  bottom?: number
  target?: string
}>(), {
  visibilityHeight: 200,
  right: 40,
  bottom: 40,
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

defineOptions({ name: 'DfBacktop' })

const visible = ref(false)
const el = shallowRef<HTMLElement | Window>(window)

const positionStyle = computed(() => ({ right: `${props.right}px`, bottom: `${props.bottom}px` }))

function onScroll() {
  const scrollTop = el.value instanceof Window ? document.documentElement.scrollTop : el.value.scrollTop
  visible.value = scrollTop >= props.visibilityHeight
}

function scrollToTop(e: MouseEvent) {
  const target = el.value instanceof Window ? document.documentElement : el.value
  target.scrollTo({ top: 0, behavior: 'smooth' })
  emit('click', e)
}

onMounted(() => {
  if (props.target) {
    const found = document.querySelector(props.target) as HTMLElement | null
    if (found) el.value = found
  }
  const t = el.value instanceof Window ? window : el.value
  t.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  const t = el.value instanceof Window ? window : el.value
  t.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.df-backtop {
  position: fixed; z-index: 5; cursor: pointer;
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--df-color-bg-surface, #fff); color: var(--df-color-primary, #409eff);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); font-size: 20px;
  transition: background .3s;
}
.df-backtop:hover { background: var(--df-color-primary, #409eff); color: #fff; }
.df-fade-in-enter-active, .df-fade-in-leave-active { transition: opacity .3s; }
.df-fade-in-enter-from, .df-fade-in-leave-to { opacity: 0; }
</style>
