<script setup lang="ts">
import {
  ref, computed, useSlots, nextTick, shallowRef, markRaw,
  defineComponent, onErrorCaptured,
} from 'vue'
import * as Vue from 'vue'

defineProps<{
  title?: string
  description?: string
  vertical?: boolean
  /** 隐藏代码区(仅展示预览) */
  hideCode?: boolean
}>()

const slots = useSlots()
const showCode = ref(false)
const copySuccess = ref(false)
const codeEl = ref<HTMLElement>()

// ── 在线编辑状态 ──
const isEditing = ref(false)
const editableCode = ref('')
const originalCode = ref('')
const liveComponent = shallowRef<any>(null)
const compileError = ref('')
const renderError = ref('')
let compileTimer: ReturnType<typeof setTimeout> | null = null

// 捕获 live 组件渲染错误
onErrorCaptured((err) => {
  if (isEditing.value) {
    renderError.value = err instanceof Error ? err.message : String(err)
    liveComponent.value = null
    return false
  }
})

/** 从 #code 插槽中提取纯文本代码 */
function extractCodeText(): string {
  if (!codeEl.value) return ''
  const codeBlock = codeEl.value.querySelector('pre code')
  if (codeBlock) return codeBlock.textContent ?? ''
  const pre = codeEl.value.querySelector('pre')
  if (pre) return pre.textContent ?? ''
  return codeEl.value.textContent ?? ''
}

async function copyCode() {
  const text = isEditing.value ? editableCode.value.trim() : extractCodeText().trim()
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    copySuccess.value = true
    setTimeout(() => { copySuccess.value = false }, 2000)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;left:-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copySuccess.value = true
    setTimeout(() => { copySuccess.value = false }, 2000)
  }
}

// ── SFC 解析 ──
function parseSFC(code: string) {
  const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/)
  const scriptSetupMatch = code.match(/<script\s+setup[^>]*>([\s\S]*?)<\/script>/)

  if (templateMatch) {
    return {
      template: templateMatch[1].trim(),
      scriptSetup: scriptSetupMatch?.[1]?.trim() ?? '',
    }
  }
  // 无 <template> 标签 → 整段当模板
  return { template: code.trim(), scriptSetup: '' }
}

function processImports(script: string) {
  const lines = script.split('\n')
  const codeLines: string[] = []
  const vueImports: string[] = []

  for (const line of lines) {
    const vueMatch = line.match(/^\s*import\s+\{([^}]+)\}\s+from\s+['"]vue['"]/)
    if (vueMatch) {
      vueImports.push(...vueMatch[1].split(',').map(s => s.trim()).filter(Boolean))
    } else if (/^\s*import\s+/.test(line)) {
      // 跳过其它 import (组件已全局注册)
    } else {
      codeLines.push(line)
    }
  }
  return { code: codeLines.join('\n'), vueImports: [...new Set(vueImports)] }
}

function extractBindings(script: string): string[] {
  const bindings: string[] = []
  const varRegex = /(?:const|let|var)\s+(\w+)\s*=/g
  const fnRegex = /function\s+(\w+)\s*\(/g
  let m: RegExpExecArray | null
  while ((m = varRegex.exec(script))) bindings.push(m[1])
  while ((m = fnRegex.exec(script))) bindings.push(m[1])
  return [...new Set(bindings)]
}

// ── 在线编译 ──
function compileLive() {
  const code = editableCode.value.trim()
  if (!code) {
    liveComponent.value = null
    compileError.value = ''
    renderError.value = ''
    return
  }

  try {
    const { template, scriptSetup } = parseSFC(code)

    let component: ReturnType<typeof defineComponent>

    if (scriptSetup) {
      const { code: cleanScript, vueImports } = processImports(scriptSetup)
      const bindings = extractBindings(cleanScript)
      const destructure = vueImports.length
        ? `const { ${vueImports.join(', ')} } = __vue__;\n`
        : ''
      const setupBody = `${destructure}${cleanScript}\nreturn { ${bindings.join(', ')} }`
      const setupFn = new Function('__vue__', setupBody) as (v: typeof Vue) => Record<string, unknown>
      component = defineComponent({
        setup() { return setupFn(Vue) },
        template,
      })
    } else {
      component = defineComponent({ template })
    }

    liveComponent.value = markRaw(component)
    compileError.value = ''
    renderError.value = ''
  } catch (e: unknown) {
    compileError.value = e instanceof Error ? e.message : String(e)
  }
}

function debouncedCompile() {
  if (compileTimer) clearTimeout(compileTimer)
  compileTimer = setTimeout(compileLive, 600)
}

// ── 编辑模式切换 ──
function startEditing() {
  const code = extractCodeText().trim()
  originalCode.value = code
  editableCode.value = code
  isEditing.value = true
  showCode.value = true
  compileLive()
}

function stopEditing() {
  isEditing.value = false
  liveComponent.value = null
  compileError.value = ''
  renderError.value = ''
}

function resetCode() {
  editableCode.value = originalCode.value
  compileLive()
}

// Tab 键插入缩进
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const ta = e.target as HTMLTextAreaElement
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const before = editableCode.value.substring(0, start)
    const after = editableCode.value.substring(end)
    editableCode.value = before + '  ' + after
    nextTick(() => { ta.selectionStart = ta.selectionEnd = start + 2 })
  }
}

function toggleCode() {
  showCode.value = !showCode.value
}

const hasCodeSlot = computed(() => !!slots.code)
const hasError = computed(() => compileError.value || renderError.value)
</script>

<template>
  <div class="demo-block" :class="{ 'demo-block--code-visible': showCode, 'demo-block--editing': isEditing }">
    <div v-if="title" class="demo-block__header">
      <p class="demo-block__title">
        {{ title }}
        <span v-if="isEditing" class="demo-block__editing-badge">编辑中</span>
      </p>
      <div class="demo-block__header-actions">
        <button
          v-if="hasCodeSlot"
          class="demo-block__icon-btn"
          :class="{ 'demo-block__icon-btn--success': copySuccess }"
          :title="copySuccess ? '已复制!' : '复制代码'"
          @click="copyCode"
        >
          <svg v-if="!copySuccess" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
        <button
          v-if="hasCodeSlot"
          class="demo-block__icon-btn"
          :class="{ 'demo-block__icon-btn--active': isEditing }"
          :title="isEditing ? '退出编辑' : '在线编辑'"
          @click="isEditing ? stopEditing() : startEditing()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </div>
    </div>
    <p v-if="description" class="demo-block__description">{{ description }}</p>

    <!-- 预览区: 编辑模式显示 live 组件, 否则显示原始插槽 -->
    <div class="demo-block__preview" :class="{ 'demo-block__preview--vertical': vertical }">
      <component v-if="isEditing && liveComponent" :is="liveComponent" />
      <slot v-if="!isEditing" />
      <div v-if="isEditing && !liveComponent && !hasError" class="demo-block__placeholder">
        修改代码后预览将显示在此
      </div>
    </div>

    <!-- 编译/渲染错误 -->
    <div v-if="isEditing && hasError" class="demo-block__error">
      <span class="demo-block__error-label">✕ 编译错误</span>
      {{ compileError || renderError }}
    </div>

    <div v-if="hasCodeSlot && !hideCode" class="demo-block__actions">
      <button class="demo-block__toggle" @click="toggleCode">
        <span class="demo-block__toggle-icon" :class="{ 'demo-block__toggle-icon--open': showCode }">&#9660;</span>
        {{ showCode ? '收起代码' : '展开代码' }}
      </button>
      <template v-if="isEditing">
        <button class="demo-block__action-btn" @click="compileLive">▶ 运行</button>
        <button class="demo-block__action-btn demo-block__action-btn--secondary" @click="resetCode">↩ 重置</button>
      </template>
      <button
        v-if="!title && !isEditing"
        class="demo-block__copy-inline"
        :class="{ 'demo-block__copy-inline--success': copySuccess }"
        @click="copyCode"
      >
        {{ copySuccess ? '✓ 已复制' : '复制' }}
      </button>
      <!-- 无标题 block 的编辑入口 -->
      <button
        v-if="!title && hasCodeSlot"
        class="demo-block__action-btn demo-block__action-btn--secondary"
        @click="isEditing ? stopEditing() : startEditing()"
      >
        {{ isEditing ? '退出编辑' : '✏ 编辑' }}
      </button>
    </div>

    <Transition name="demo-code">
      <div v-show="showCode" class="demo-block__code">
        <!-- 静态高亮代码 -->
        <div v-if="!isEditing" ref="codeEl">
          <slot name="code" />
        </div>
        <!-- 可编辑代码区 -->
        <textarea
          v-else
          v-model="editableCode"
          class="demo-block__textarea"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          @input="debouncedCompile"
          @keydown="handleKeydown"
        />
      </div>
    </Transition>
  </div>
</template>
