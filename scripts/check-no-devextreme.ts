/**
 * CI 脚本：检查子应用 package.json 中是否包含 devextreme 依赖
 * DevExtreme 由 df-web-base 统一提供版本，子应用禁止自行安装
 */
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }
const dxDeps = Object.keys(allDeps).filter((k) => k.startsWith('devextreme'))

if (dxDeps.length > 0) {
  console.error(`❌ 子应用禁止安装 DevExtreme，请移除: ${dxDeps.join(', ')}`)
  console.error('DevExtreme 由 df-web-base 统一提供，通过 window.DfWebBase 使用')
  process.exit(1)
}

console.log('✅ DevExtreme 依赖检查通过')
