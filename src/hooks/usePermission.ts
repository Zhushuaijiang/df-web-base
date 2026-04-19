import { inject } from 'vue'
import { DF_UI_KEY } from '../install'

/**
 * 权限判断组合式函数
 * 封装 DfUIOptions.permission，提供便捷的模板内权限检查
 */
export function usePermission() {
  const dfui = inject(DF_UI_KEY)
  if (!dfui) {
    throw new Error('[usePermission] DfUIOptions 未注入')
  }

  return {
    /** 检查单个权限 */
    has: (code: string) => dfui.permission.check(code),
    /** 检查是否拥有所有权限 */
    hasAll: (codes: string[]) => dfui.permission.checkAll(codes),
    /** 检查是否拥有任一权限 */
    hasAny: (codes: string[]) => dfui.permission.checkAny(codes),
  }
}
