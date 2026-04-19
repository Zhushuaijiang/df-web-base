<template>
  <div class="df-image" :style="containerStyle">
    <img v-if="loaded" :src="src" :alt="alt" :style="imgStyle" class="df-image__inner" @click="handlePreview" />
    <div v-else-if="loading" class="df-image__placeholder"><slot name="placeholder"><span>加载中...</span></slot></div>
    <div v-else-if="hasError" class="df-image__error"><slot name="error"><span>加载失败</span></slot></div>
    <!-- Preview overlay -->
    <teleport to="body">
      <transition name="df-fade">
        <div v-if="previewing" class="df-image-viewer" @click="previewing = false">
          <img :src="currentPreviewSrc" class="df-image-viewer__img" />
          <span class="df-image-viewer__close">&times;</span>
          <div v-if="previewSrcList.length > 1" class="df-image-viewer__nav" @click.stop>
            <DxButton icon="chevronprev" styling-mode="text" @click="prevPreview" />
            <DxButton icon="chevronnext" styling-mode="text" @click="nextPreview" />
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { DxButton } from 'devextreme-vue/button'

const props = withDefaults(defineProps<{
  src?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  alt?: string
  lazy?: boolean
  previewSrcList?: string[]
  zIndex?: number
  initialIndex?: number
}>(), {
  fit: 'fill',
  lazy: false,
  previewSrcList: () => [],
  zIndex: 2000,
  initialIndex: 0,
})

const emit = defineEmits<{ error: [e: Event]; load: [e: Event]; switch: [idx: number] }>()

defineOptions({ name: 'DfImage' })

const loading = ref(true)
const loaded = ref(false)
const hasError = ref(false)
const previewing = ref(false)
const previewIdx = ref(props.initialIndex)

const containerStyle = computed(() => ({}))
const imgStyle = computed(() => ({ objectFit: props.fit }))
const currentPreviewSrc = computed(() => props.previewSrcList[previewIdx.value] ?? props.src)

function loadImage() {
  if (!props.src) { loading.value = false; hasError.value = true; return }
  loading.value = true
  hasError.value = false
  const img = new Image()
  img.onload = (e) => { loading.value = false; loaded.value = true; emit('load', e) }
  img.onerror = (e) => { loading.value = false; hasError.value = true; emit('error', e as Event) }
  img.src = props.src
}

function handlePreview() {
  if (props.previewSrcList.length) {
    previewIdx.value = props.initialIndex
    previewing.value = true
  }
}

function prevPreview() { previewIdx.value = (previewIdx.value - 1 + props.previewSrcList.length) % props.previewSrcList.length; emit('switch', previewIdx.value) }
function nextPreview() { previewIdx.value = (previewIdx.value + 1) % props.previewSrcList.length; emit('switch', previewIdx.value) }

watch(() => props.src, () => { loaded.value = false; loadImage() })
onMounted(loadImage)
</script>

<style scoped>
.df-image { position: relative; display: inline-block; overflow: hidden; }
.df-image__inner { width: 100%; height: 100%; display: block; }
.df-image__placeholder, .df-image__error { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--df-color-bg-secondary, #f5f7fa); color: var(--df-color-text-disabled, #c0c4cc); font-size: var(--df-font-size-md, 14px); }

.df-image-viewer { position: fixed; inset: 0; z-index: v-bind(zIndex); background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; cursor: zoom-out; }
.df-image-viewer__img { max-width: 90vw; max-height: 90vh; object-fit: contain; }
.df-image-viewer__close { position: absolute; top: 40px; right: 40px; color: #fff; font-size: 40px; cursor: pointer; }
.df-image-viewer__nav { position: absolute; bottom: 30px; display: flex; gap: 20px; }

.df-fade-enter-active, .df-fade-leave-active { transition: opacity .3s; }
.df-fade-enter-from, .df-fade-leave-to { opacity: 0; }
</style>
