---
title: 基础用法
titleTemplate: Vitepress
description: 本节将介绍如何快速配置和使用项目
layout: doc
navbar: "true"
sidebar: "true"
tags: blog
date: 
created: 2024-11-30T16:54
updated: 2024-11-30T01:16
---

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<!-- 头部信息区域，如标题、时间、作者、信息等等，根据frontmatter内容自动显示 -->
# {{ frontmatter.title }}
文档由 {{ frontmatter.creator }} 于 {{frontmatter.createDate}} 创建，由 {{ frontmatter.updateAuthor }} 于 {{frontmatter.updateDate}} 更新

{{frontmatter.description}}

<!-- 主内容区域，用户自己填写修改 -->
## 安装

```bash
npm install my-project
