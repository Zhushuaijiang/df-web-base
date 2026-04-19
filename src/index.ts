/**
 * df-web-base 包导出入口
 * 供 npm 安装模式（子应用独立开发 devDependency）使用
 */
export { install, createDfUI, DF_UI_KEY } from './install'
export * from './types'
export * from './components'
export * from './hooks'
export * from './utils'
export * from './constants'
export { registerDirectives } from './directives'
export * from './event-bus'
