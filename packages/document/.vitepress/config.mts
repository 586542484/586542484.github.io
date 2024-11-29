import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "文档站",
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

    // 单侧边栏
    /* sidebar: [
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
    ], */

    // 多侧边栏
    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/guide/': [
        {
          text: '归档',
          items: [
            {text: '文章目录', link: '/guide/archives'},
          ],
        },
        {
          text: '指南',
          items: [
            {
              text: '介绍',
              link: '/guide/introduction/README',
            },
            {
              text: '基础用法',
              collapsed: true,
              items: [
                {
                  text: '入门',
                  link: '/guide/usage/basic',
                },
                {
                  text: '进阶',
                  link: '/guide/usage/advanced',
                }
              ],
            },
            {
              text: '常见问题',
              link: '/guide/problem/FAQ',
            },
          ]
        }
      ],

      // 当用户位于 `reference` 目录时，会显示此侧边栏
      '/reference/': [
        {
          text: 'API 参考',
          collapsed: true,
          items: [
            {
              text: '基础 API',
              link: '/reference/api',
            },
            {
              text: 'CLI 参考',
              link: '/reference/cli',
            },
          ],
        },
      ],

      // 当用户位于 `example` 目录时，会显示此侧边栏
      '/example/': [
        {
          text: '示例',
          items: [
            {
              text: 'Markdown Examples',
              link: '/example/markdown-examples',
            },
            {
              text: 'Runtime API Examples',
              link: '/example/api-examples',
            }
          ],
        },
      ],

    },

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
      provider: 'local',
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/586542484/586542484.github.io/tree/feature_docs_lk/packages/document/:path',
      text: '在 GitHub 上编辑此页面'
    }

  }
})
