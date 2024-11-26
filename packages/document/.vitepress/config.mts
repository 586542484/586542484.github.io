import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 设置为false时，导航栏中标题将会被禁用
    siteTitle: 'WPS开放平台',

    /* nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ], */

    nav: [
      {
        text: 'My Menu',
        items: [
          {
            component: 'MyCustomComponent',
            // 可选的 props 传递给组件
            props: {
              title: 'My Custom Component'
            }
          }
        ]
      },
    ],

    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          {
            text: '介绍',
            link: '/guide/introduction/README', // 一级导航
          },
          {
            text: '基础用法',
            collapsed: true,
            items: [
              {
                text: '入门',
                link: '/guide/usage/basic', // 二级导航
              },
              {
                text: '进阶',
                link: '/guide/usage/advanced', // 二级导航
              },
            ],
          },
          {
            text: '常见问题',
            link: '/guide/FAQ', // 一级导航
          },
        ],
      },
      {
        text: '参考',
        collapsed: false,
        items: [
          {
            text: 'API 参考',
            collapsed: true,
            items: [
              {
                text: '基础 API',
                link: '/reference/api', // 二级导航
              },
              {
                text: 'CLI 参考',
                link: '/reference/cli', // 二级导航
              },
            ],
          },
        ],
      },
      {
        text: '示例',
        collapsed: false,
        items: [
          {
            text: 'Markdown Examples',
            link: '/example/markdown-examples', // 二级导航
          },
          {
            text: 'Runtime API Examples',
            link: '/example/api-examples',
          }
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    // 中文页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 本地搜索
    search: {
      provider:'local',
    }

  }
})
