/**
 * df-web-base 共享常量
 */

/** DxDataGrid 默认分页选项 */
export const DEFAULT_PAGE_SIZES = [20, 50, 100] as const

/** DxDataGrid 默认每页行数 */
export const DEFAULT_PAGE_SIZE = 20

/** 字典缓存时长（毫秒） */
export const DICT_CACHE_TTL = 5 * 60 * 1000

/** stateStoring 保存延迟（毫秒） */
export const STATE_SAVE_DELAY = 1000

/** 脱敏占位符 */
export const MASK_CHAR = '*'

/** 日期格式 */
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/** qiankun 子应用名称 */
export const APP_NAME = 'df-web-base'

/** EventBus 内置事件名 */
export const BUS_EVENTS = {
  GLOBAL_STATE_CHANGE: 'globalState:change',
  GLOBAL_STATE_SET: 'globalState:set',
  TENANT_CHANGE: 'tenant:change',
  PERMISSION_REFRESH: 'permission:refresh',
  DICT_CACHE_CLEAR: 'dict:cache:clear',
  THEME_CHANGE: 'theme:change',
} as const
