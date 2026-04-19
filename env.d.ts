/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

interface Window {
  __POWERED_BY_QIANKUN__?: boolean
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string
  DfWebBase?: import('./src/types/plugin').DfWebBaseExports & {
    eventBus: typeof import('./src/event-bus')
  }
  DfYgtBiz?: any
  __QIANKUN_MAIN__?: any
  __debugMode?: boolean
}
