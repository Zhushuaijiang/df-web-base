import { createApp } from 'vue'
import DfNotificationVue from './DfNotification.vue'
import type { DfNotificationProps, NotificationType, NotificationPosition } from './DfNotification.vue'

let seed = 0

interface NotificationInstance {
  id: string
  vm: any
  el: HTMLDivElement
  position: NotificationPosition
  close: () => void
}

const instances: NotificationInstance[] = []

export type NotificationOptions = string | Omit<DfNotificationProps, 'id'>

function normalizeOptions(options: NotificationOptions): Omit<DfNotificationProps, 'id'> {
  return typeof options === 'string' ? { message: options } : { ...options }
}

function getVerticalOffset(position: NotificationPosition, offset: number): number {
  const filtered = instances.filter(i => i.position === position)
  let top = offset
  for (const inst of filtered) {
    top += (inst.el.firstElementChild?.clientHeight ?? 56) + 16
  }
  return top
}

function updatePositions(position: NotificationPosition) {
  const filtered = instances.filter(i => i.position === position)
  const isTop = position.startsWith('top')
  const prop = isTop ? 'top' : 'bottom'
  let offset = 16
  for (const inst of filtered) {
    const el = inst.el.firstElementChild as HTMLElement | null
    if (el) {
      el.style[prop] = `${offset}px`
      offset += (el.clientHeight || 56) + 16
    }
  }
}

function DfNotification(options: NotificationOptions) {
  const opts = normalizeOptions(options)
  const id = `df-notification-${++seed}`
  const position = opts.position ?? 'top-right'

  const container = document.createElement('div')
  document.body.appendChild(container)

  const verticalOffset = getVerticalOffset(position, opts.offset ?? 16)

  const originalOnClose = opts.onClose
  opts.onClose = () => {
    originalOnClose?.()
    const i = instances.findIndex(inst => inst.id === id)
    if (i > -1) instances.splice(i, 1)
    app.unmount()
    container.remove()
    updatePositions(position)
  }

  const app = createApp(DfNotificationVue, { ...opts, id, offset: verticalOffset })
  const vm = app.mount(container)

  const instance: NotificationInstance = {
    id,
    vm,
    el: container,
    position,
    close: () => (vm as any).close(),
  }
  instances.push(instance)

  return { close: instance.close }
}

const types: NotificationType[] = ['success', 'warning', 'info', 'error']
for (const type of types) {
  ;(DfNotification as any)[type] = (options: NotificationOptions) => {
    const opts = normalizeOptions(options)
    return DfNotification({ ...opts, type })
  }
}

DfNotification.closeAll = () => {
  for (const inst of [...instances]) inst.close()
}

export { DfNotification }
export type { DfNotificationProps, NotificationType, NotificationPosition } from './DfNotification.vue'
