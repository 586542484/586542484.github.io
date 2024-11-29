---
title: 主标题
creator: 创建作者名
updateAuthor: 更新作者名
createDate: 2024-11-27 9:30
updateDate: 2024-11-27 10.30
description: 文档描述
---

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>
<!-- 内容区域 -->

<!-- 头部信息区域，如标题、时间、作者、信息等等 -->
# {{ frontmatter.title }}
文档由 {{ frontmatter.creator }} 于 {{frontmatter.createDate}} 创建，由 {{ frontmatter.updateAuthor }} 于 {{frontmatter.updateDate}} 更新
{{frontmatter.description}}

<!-- 主内容区域，用户自己填写修改 -->
## 标题1
内容11111111111
