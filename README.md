# 私有云前端定制SDK

该单体仓库包含了前端定制相关的一些工程，通过 `pnpm workspace` 来进行管理

## 重要变更

### 工程拆分

将不同项目的定制能力拆分到不同的仓库来维护，通过git submodule的方式来关联

### 多框架支持

之前的版本只支持使用React开发插件，对于大量的Vue开发者来说不够友好，现在针对不同的框架抽象出了 `EcisRenderer`，屏蔽掉了不同框架之间差异，目前支持使用 `React16`、`Vue2` 来开发插件，未来也可以很方便地扩展其他框架，比如在不考虑IE的情况下支持 `React18`、`Vue3`

多框架支持导致sdk的初始化以及 `mount`、`append` 等API发生变化，目前针对旧写法做了兼容，对于已经构建好的存量插件还是可以直接工作的，但是如果要重新构建插件源代码，需要对源代码进行修改以适配新的API接口

## 项目目录

### packages

该目录中包含了三个用来发包的工程，分别为

- `jscore` - 前端定制能力公共核心库，`ecissdk` 以及前端定制能力工程需要依赖它
- `jssdk` - 前端定制SDK主工程，依赖 `jscore` 并且整合其他拆分的定制能力
- `sdkctr` - `jssdk` 通信模块

### demos

该目录中包含一些用来辅助开发的示例工程，分别为

- `kdocs-ablity` - 演示用的云文档定制能力工程，依赖 `jscore` 来导出各种定制节点
- `plugin-demo` - 演示用的插件工程，使用React进行开发，包含了各种插件能力的使用示例
- `plugin-vue2` - 演示用的插件工程，使用Vue2进行开发
- `react-demo` - 演示用的云文档工程，基于它来演示定制埋点以及插件应用
- `server-demo` - 演示用的服务端工程，主要用来模拟一些必要的接口，比如 `entry.json`、插件列表接口等等

### apps

该目录用来存放外部应用能力仓库，通过 `git submodule` 的方式来管理

## 版本发布

如果要发布 `packages` 下面的项目到公司 `npm` 仓库，只需执行 `pnpm publish` 即可，如

```bash
cd packages/jscore
pnpm publish
```

> 发布之前需要先 `login` 到公司 `npm` 仓库

## 本地调试

本地调试需要依次启动各个相关工程，参考顺序如下

**启动kdocs-ability**

`kdocs-ability` 作为jssdk的一部分，只需要将TypeScript代码编译为JavaScript，不需要单独使用webpack进行构建

```bash
cd demos/kdocs-ability
pnpm start
```

**启动jscore**

`jscore` 也不需要webpack编译

```bash
cd packages/jscore
pnpm start
```

**启动plugin-demo**

可以修改 `scripts/webpack.config.js` 来指定需要编译的示例插件

```bash
cd demos/plugin-demo
pnpm start
```

**启动plugin-vue2**

可以修改 `scripts/webpack.config.js` 来指定需要编译的示例插件

```bash
cd demos/plugin-vue2
pnpm start
```

**启动jssdk**

```bash
cd packages/jssdk
pnpm start
```

**启动server-demo**

修改 `data/plugins.json` 可以来指定加载的插件列表和权重，修改之后需要重启该服务

```bash
cd demos/server-demo
pnpm build
pnpm start
```

**启动react-demo**

最后一步启动云文档

```bash
cd demos/react-demo
pnpm start
```

## jssdk构建

### 创建应用工程

假设现在有两个定制应用，分别为

- `kdocs` - 云文档
- `opendoc` - 文档中台

那么首先需要为他们分别创建一个定制能力工程的仓库，如

- `kdocs-ability`
- `opendoc-ability`

工程模板参考 `demos/ability-tpl`，需要及时更新其中 `@ecis/jscore` 的版本，然后将它们添加为 `apps/` 下面的 `git submodule`

### 引入应用工程

jssdk已经配置好了别名路径

```json
{
  "baseUrl": ".",
  "paths": {
    "@apps/*": ["../../apps/*"]
  }
}

```

所以在 `src/EcisSdk.ts` 中使用下面的方式来导入即可

```ts
import { createNode } from '@ecis/jscore'

import Kdocs from '@apps/kdocs-ability'
import Opendoc from '@apps/opendoc-ability'

export default class EcisSdk {
  get kdocs() {
    return createNode(Kdocs)
  }
  get opendoc() {
    return createNode(Opendoc)
  }
}
```

因为外部能力工程如 `@apps/kdocs-ability` 它们依赖的 `@ecis/jscore` 是npm仓库中的版本，但是 `jssdk` 依赖的是本地workspace中的版本，为了在打包的时候让它们指向同一个版本，防止打包进去多个版本，在 `webpack.config.js` 中增加 `@ecis` 的别名

```js
resolve: {
  alias: {
    '@ecis': path.resolve(__dirname, '../../'),
    '@apps': path.resolve(__dirname, '../../../apps'),
    '@demos': path.resolve(__dirname, '../../../demos')
  }
}
```

这样不同工程中引入的 `@ecis/jscore` 都会被指向 `packages/jscore`

### 构建流程

- 克隆当前仓库
- 遍历拉取apps下面submodule仓库的代码
- 分别为submodule安装依赖，注意：使用pnpm为submodule安装依赖的时候，记得忽略掉workspace配置，这样可以让它从npm仓库拉取代码，否则pnpm可能会修改package.json文件，或者@ecis/jscore无法正确安装

  ```bash
  pnpm install --ignore-workspace
  pnpm build
  ```

- 编译jscore，进入 `packages/jscore` 目录，执行

  ```bash
  pnpm install
  pnpm build
  ```

- 构建jssdk，进入 `packages/jssdk` 目录，执行

  ```bash
  pnpm install
  pnpm build
  ```

> 如果 `@ecis/jscore` 更新了版本，那么相关的工程都需要同步升级，保证在构建的时候依赖的版本都是一致的
