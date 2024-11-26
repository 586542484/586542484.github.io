// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyCustomComponent from '../components/MyCustomComponent.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('MyCustomComponent', MyCustomComponent)
  }
} satisfies Theme