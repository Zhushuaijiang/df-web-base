import { createApp } from 'vue'
import DfMessageBoxVue from './DfMessageBox.vue'
import type { DfMessageBoxProps, MessageBoxAction } from './DfMessageBox.vue'

export type MessageBoxOptions = Omit<DfMessageBoxProps, 'callback'>

function createMessageBox(options: MessageBoxOptions): Promise<{ action: MessageBoxAction; value?: string }> {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const app = createApp(DfMessageBoxVue, {
      ...options,
      callback: (action: MessageBoxAction, value?: string) => {
        app.unmount()
        container.remove()
        if (action === 'confirm') {
          resolve({ action, value })
        } else {
          reject({ action })
        }
      },
    })

    app.mount(container)
  })
}

function DfMessageBox(options: MessageBoxOptions | string) {
  const opts: MessageBoxOptions = typeof options === 'string' ? { message: options } : options
  return createMessageBox(opts)
}

DfMessageBox.alert = (message: string, title?: string, options?: Partial<MessageBoxOptions>) =>
  createMessageBox({ ...options, message, title: title ?? '提示', boxType: 'alert', showCancelButton: false })

DfMessageBox.confirm = (message: string, title?: string, options?: Partial<MessageBoxOptions>) =>
  createMessageBox({ ...options, message, title: title ?? '提示', boxType: 'confirm', showCancelButton: true })

DfMessageBox.prompt = (message: string, title?: string, options?: Partial<MessageBoxOptions>) =>
  createMessageBox({ ...options, message, title: title ?? '提示', boxType: 'prompt', showCancelButton: true, showInput: true })

export { DfMessageBox }
export type { MessageBoxAction, DfMessageBoxProps } from './DfMessageBox.vue'
