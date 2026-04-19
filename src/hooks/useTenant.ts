import { inject, computed } from 'vue'
import { DF_UI_KEY } from '../install'

/**
 * 租户上下文组合式函数
 * 封装 DfUIOptions.tenant，提供响应式的租户/分院信息
 */
export function useTenant() {
  const dfui = inject(DF_UI_KEY)
  if (!dfui) {
    throw new Error('[useTenant] DfUIOptions 未注入')
  }

  return {
    /** 当前租户ID */
    tenantId: computed(() => dfui.tenant.getTenantId()),
    /** 当前分院ID */
    branchId: computed(() => dfui.tenant.getBranchId()),
  }
}
