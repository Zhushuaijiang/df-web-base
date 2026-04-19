import { createApp } from 'vue'
import DfMessageVue from './DfMessage.vue'
import type { DfMessageProps, MessageType } from './DfMessage.vue'

let seed = 0
const instances: Array<{ id: string; vm: any; el: HTMLDivElement; close: () => void }> = []

export type MessageOptions = string | Omit<DfMessageProps, 'id'>

function normalizeOptions(options: MessageOptions): Omit<DfMessageProps, 'id'> {
  return typeof options === 'string' ? { message: options } : { ...options }
}

function getVerticalOffset(idx: number, offset: number): number {
  let top = offset
  for (let i = 0; i < idx; i++) {
    const el = instances[i]?.el
    if (el) top += (el.offsetHeight || 48) + 16
  }
  return top
}

function updatePositions() {
  let offset = 20
  for (const inst of instances) {
    const component = inst.vm._instance?.exposed ?? inst.vm._instance?.proxy
    if (component && inst.el) {
      // re-position
      inst.el.style.top = `${offset}px`
      offset += (inst.el.offsetHeight || 48) + 16
    }
  }
}

function DfMessage(options: MessageOptions) {
  const opts = normalizeOptions(options)
  const id = `df-message-${++seed}`

  const container = document.createElement('div')
  document.body.appendChild(container)

  const idx = instances.length
  const verticalOffset = getVerticalOffset(idx, opts.offset ?? 20)

  const originalOnClose = opts.onClose
  opts.onClose = () => {
    originalOnClose?.()
    // Remove instance
    const i = instances.findIndex(inst => inst.id === id)
    if (i > -1) instances.splice(i, 1)
    app.unmount()
    container.remove()
    updatePositions()
  }

  const app = createApp(DfMessageVue, { ...opts, id, offset: verticalOffset })
  const vm = app.mount(container)

  const instance = { id, vm, el: container.firstElementChild as HTMLDivElement, close: () => (vm as any).close() }
  instances.push(instance)

  return { close: instance.close }
}

// Shorthand methods
const types: MessageType[] = ['success', 'warning', 'info', 'error']
for (const type of types) {
  ;(DfMessage as any)[type] = (options: MessageOptions) => {
    const opts = normalizeOptions(options)
    return DfMessage({ ...opts, type })
  }
}

DfMessage.closeAll = () => {
  for (const inst of [...instances]) inst.close()
}

export { DfMessage }
export type { DfMessageProps, MessageType } from './DfMessage.vue'
