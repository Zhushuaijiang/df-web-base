<template>
  <div class="theme-selector">
    <label for="dx-theme">DevExtreme 主题：</label>
    <select id="dx-theme" v-model="currentTheme" @change="switchTheme">
      <option v-for="t in themes" :key="t.value" :value="t.value">
        {{ t.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const themes = [
  { label: 'Generic · Light', value: 'dx.light' },
  { label: 'Generic · Dark', value: 'dx.dark' },
  { label: 'Generic · Contrast', value: 'dx.contrast' },
  { label: 'Material · Blue Light', value: 'dx.material.blue.light' },
  { label: 'Material · Blue Dark', value: 'dx.material.blue.dark' },
  { label: 'Material · Purple Light', value: 'dx.material.purple.light' },
  { label: 'Material · Purple Dark', value: 'dx.material.purple.dark' },
  { label: 'Material · Teal Light', value: 'dx.material.teal.light' },
  { label: 'Material · Teal Dark', value: 'dx.material.teal.dark' },
  { label: 'Material · Lime Light', value: 'dx.material.lime.light' },
  { label: 'Material · Lime Dark', value: 'dx.material.lime.dark' },
  { label: 'Material · Saffron Light', value: 'dx.material.saffron.light' },
  { label: 'Material · Saffron Dark', value: 'dx.material.saffron.dark' },
  { label: 'Fluent · Blue Light', value: 'dx.fluent.blue.light' },
  { label: 'Fluent · Blue Dark', value: 'dx.fluent.blue.dark' },
  { label: 'Carmine (Legacy)', value: 'dx.carmine' },
  { label: 'Dark Moon (Legacy)', value: 'dx.darkmoon' },
  { label: 'Soft Blue (Legacy)', value: 'dx.softblue' },
  { label: 'Stone (Legacy)', value: 'dx.stone' },
  { label: 'Green Mist (Legacy)', value: 'dx.greenmist' },
  { label: 'Contrast Black', value: 'dx.contrastblackwhitemedium' },
  { label: 'Contrast White', value: 'dx.contrastwhiteblackmedium' },
]

const currentTheme = ref('dx.light')

let themeLink: HTMLLinkElement | null = null

onMounted(() => {
  // 创建动态主题 link 标签
  themeLink = document.createElement('link')
  themeLink.rel = 'stylesheet'
  themeLink.id = 'dx-theme-link'
  document.head.appendChild(themeLink)
  switchTheme()
})

function switchTheme() {
  if (!themeLink) return
  const cssName = currentTheme.value
  themeLink.href = `https://cdn3.devexpress.com/jslib/25.2.3/css/${cssName}.css`
}
</script>

<style scoped>
.theme-selector {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  margin-right: 12px;
}

.theme-selector label {
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.theme-selector select {
  padding: 2px 6px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
}
</style>
