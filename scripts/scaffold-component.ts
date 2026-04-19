/**
 * 组件脚手架 — AI 新建组件时运行
 *
 * 用法: npx tsx scripts/scaffold-component.ts df-xxx-name
 *
 * 生成:
 *   src/components/df-xxx-name/
 *     ├── DfXxxName.vue       (组件)
 *     ├── types.ts            (Props/Emits 类型)
 *     └── index.ts            (导出)
 *   docs/components/xxx-name.md (文档)
 *
 * 并自动追加到 src/components/index.ts
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

// ─── helpers ───
function kebabToPascal(kebab: string): string {
  return kebab.replace(/(^|-)(\w)/g, (_, _sep, c) => c.toUpperCase())
}

function kebabToLabel(kebab: string): string {
  const noPrefix = kebab.replace(/^df-/, '')
  return noPrefix
    .split('-')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function writeIfNotExists(filePath: string, content: string) {
  if (fs.existsSync(filePath)) {
    console.log(`  SKIP (exists): ${filePath}`)
    return false
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf-8')
  console.log(`  CREATE: ${filePath}`)
  return true
}

// ─── main ───
const input = process.argv[2]
if (!input) {
  console.error('用法: npx tsx scripts/scaffold-component.ts <component-name>')
  console.error('示例: npx tsx scripts/scaffold-component.ts df-patient-card')
  process.exit(1)
}

const kebabName = input.startsWith('df-') ? input : `df-${input}`
const pascalName = kebabToPascal(kebabName)
const label = kebabToLabel(kebabName)
const docSlug = kebabName.replace(/^df-/, '')

const __filename = new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const projectRoot = path.resolve(path.dirname(__filename), '..')
const compDir = path.join(projectRoot, 'src', 'components', kebabName)
const docsDir = path.join(projectRoot, 'docs', 'components')

ensureDir(compDir)

// ─── types.ts ───
writeIfNotExists(path.join(compDir, 'types.ts'), `
/**
 * ${pascalName} 类型定义
 */

export interface ${pascalName}Props {
  /** TODO: 添加 Props */
}

export interface ${pascalName}Emits {
  // TODO: 添加 Events
}
`)

// ─── Component.vue ───
writeIfNotExists(path.join(compDir, `${pascalName}.vue`), `
<template>
  <div class="${kebabName}">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ${pascalName}Props } from './types'

defineOptions({ name: '${pascalName}' })

const props = withDefaults(defineProps<${pascalName}Props>(), {
  // TODO: defaults
})

defineExpose({})
</script>

<style scoped>
.${kebabName} {
  /* TODO: styles */
}
</style>
`)

// ─── index.ts ───
writeIfNotExists(path.join(compDir, 'index.ts'), `
export { default as ${pascalName} } from './${pascalName}.vue'
export * from './types'
`)

// ─── docs ───
writeIfNotExists(path.join(docsDir, `${docSlug}.md`), `
# ${pascalName} ${label}

${label}组件。

## 基础用法

<DemoBlock title="${label}">
<div class="demo-frame demo-frame--h400">
  <${kebabName}>
    <span class="demo-empty">TODO: 示例内容</span>
  </${kebabName}>
</div>
<template #code>

\`\`\`vue
<${pascalName}>
  <!-- TODO -->
</${pascalName}>
\`\`\`

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| — | — | — | TODO |

### Events

| 事件 | 回调参数 | 说明 |
|------|---------|------|
| — | — | TODO |

### Slots

| 插槽 | 说明 |
|------|------|
| default | 默认内容 |

---

## 导入

\`\`\`typescript
import { ${pascalName} } from 'df-web-base'
import type { ${pascalName}Props } from 'df-web-base'
\`\`\`
`)

// ─── 追加到 src/components/index.ts ───
const indexPath = path.join(projectRoot, 'src', 'components', 'index.ts')
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf-8')
  const exportLine = `export { ${pascalName} } from './${kebabName}'`
  if (!content.includes(exportLine)) {
    fs.appendFileSync(indexPath, `${exportLine}\n`, 'utf-8')
    console.log(`  APPEND: ${exportLine}`)
  } else {
    console.log(`  SKIP (already exported): ${pascalName}`)
  }
}

console.log(`\nDone! ${pascalName} scaffold created.`)
console.log(`Next steps:`)
console.log(`  1. Edit src/components/${kebabName}/${pascalName}.vue`)
console.log(`  2. Edit src/components/${kebabName}/types.ts`)
console.log(`  3. Edit docs/components/${docSlug}.md`)
console.log(`  4. Run: npm run check:quick`)
