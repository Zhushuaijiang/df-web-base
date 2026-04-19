import { ref, readonly } from 'vue'

export type NotificationType = 'success' | 'warning' | 'error' | 'info'

export interface DfNotification {
  id: number
  type: NotificationType
  message: string
  duration: number
}

let nextId = 0
const notifications = ref<DfNotification[]>([])

/**
 * 全局通知组合式函数
 * 跨微应用共享消息通知，基于 CSS 变量主题渲染
 */
export function useNotification() {
  function notify(type: NotificationType, message: string, duration = 3000) {
    const id = ++nextId
    const notification: DfNotification = { id, type, message, duration }
    notifications.value = [...notifications.value, notification]

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  function remove(id: number) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  function clearAll() {
    notifications.value = []
  }

  return {
    notifications: readonly(notifications),
    success: (msg: string, duration?: number) => notify('success', msg, duration),
    warning: (msg: string, duration?: number) => notify('warning', msg, duration),
    error: (msg: string, duration?: number) => notify('error', msg, duration),
    info: (msg: string, duration?: number) => notify('info', msg, duration),
    remove,
    clearAll,
  }
}
