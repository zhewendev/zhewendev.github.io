## Why

基于设计稿重新搭建博客基础页面体系。当前 AstroPaper 模板页面与产品设计稿不符，需要按照新的信息架构和视觉设计重构 9 个核心页面，建立统一的组件体系和交互模式。

## What Changes

- **首页重构**：新增 Hero 首屏区、双栏内容布局（最新文章 + 侧边栏）、改造 Footer
- **文章列表页**：新建 `/articles/` 页面，支持分类 Tab 筛选和 Pagefind 搜索
- **文章详情页**：双栏布局（正文 + 侧边栏 TOC），新增点赞/分享互动栏
- **专题列表页**：3 列网格卡片布局，支持置顶排序
- **专题详情页**：简化单栏布局，展示专题文章列表
- **随想列表页**：时间线布局 + 日历导航 + 标签过滤
- **书籍收藏页**：2 列卡片网格，Modal 弹窗展示详情和读书笔记
- **工具收藏页**：2 列卡片网格，Modal 弹窗展示详情
- **关于页**：个人信息卡片 + 「我在做的事」可配置卡片
- **Header 改造**：新增「收藏」下拉菜单（书籍/工具）
- **Footer 改造**：四列布局 + 扩展社交图标（8 个平台）
- **统一去除**：全站去除阅读量功能

## Capabilities

### New Capabilities
- `page-home`: 首页布局与 Hero 组件
- `page-articles`: 文章列表与分类筛选
- `page-article-detail`: 文章详情页与 TOC 组件
- `page-series`: 专题列表与详情页
- `page-thoughts`: 随想时间线与日历组件
- `page-books`: 书籍收藏与 Modal 详情
- `page-tools`: 工具收藏与 Modal 详情
- `page-about`: 关于页与可配置卡片
- `component-header`: Header 导航与下拉菜单
- `component-footer`: Footer 四列布局
- `component-pagination`: 统一分页器
- `component-card`: 文章/专题/书籍/工具卡片体系

### Modified Capabilities
- 无（基于全新设计稿实现，不涉及现有 spec 修改）

## Impact

- **新增文件**：约 25+ 个 Astro 组件和页面文件
- **配置文件**：`astro-paper.config.ts` 扩展导航和社交链接配置
- **Content Collections**：新增 Book、Tool、Thought、About 的 schema 定义
- **静态资源**：Hero 背景图、默认占位图、社交图标
- **依赖**：无新增外部依赖，使用现有 Tailwind + Pagefind 技术栈
