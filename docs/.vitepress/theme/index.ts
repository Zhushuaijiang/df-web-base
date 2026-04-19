import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DemoBlock from './DemoBlock.vue'
import MyLayout from './MyLayout.vue'
import './demo-utilities.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // DevExtreme CSS + 组件注册仅在客户端执行
    if (!import.meta.env.SSR) {
      import('devextreme/dist/css/dx.common.css')
      import('devextreme/dist/css/dx.light.css')
      import('../../../src/components').then(({ registerGlobalComponents }) => {
        registerGlobalComponents(app)
      })
    }

    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
