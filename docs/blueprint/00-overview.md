---
version: 1.0.0
last_updated: 2026-07-05
---

# 定位

个人知识平台——以内容为首的个人知识型网站，强调长期写作、结构化知识、优雅阅读与可持续维护。

## 存在的理由

平衡博客的两个极端：既非空洞的作品集，也非混乱的知识库。它同时充当：个人知识库、数字名片、长期写作平台、个人品牌网站。

## 范围

- **是**：围绕内容（而非技术）的静态网站，帮助发现、消费和理解内容。
- **不是**：CMS、社交平台、论坛、在线编辑器、笔记应用、数字花园、仪表盘。任何功能若不能强化内容发布或知识组织，即不属于本项目。

## 模块

- **当前**：首页、文章、专题、收藏、随想、友链、关于。
- **未来（不影响当前实现）**：AI 搜索、项目展示、订阅通讯、知识图谱。

## 原则与理念

所有设计/工程决策遵循以下优先级：

1. 内容优于装饰（内容优先，设计为阅读服务）
2. 可维护性优于奇技淫巧（架构优先，长期可维护）
3. 简单优于复杂（优雅简洁，避免视觉噪音与过度工程）
4. 一致性优于个性化
5. 文档优于假设

同时坚持 **AI 原生**（文档与命名同时面向人类和 AI）和 **渐进式演进**（只构建当前所需，不提前过度设计）。

## 架构

内容 → 内容集合 (Content Collections) → 功能模块 (Feature Modules) → 共享基础设施 (Shared Infrastructure)。
业务逻辑归属功能模块，可复用能力归属基础设施。

## 技术栈

- 框架：Astro v7（SSG 模式），基于 AstroPaper 主题
- 语言：TypeScript（strict 模式）
- 样式：Tailwind CSS v4 + `@tailwindcss/typography`
- 内容：Markdown / MDX + Content Collections
- 搜索：Pagefind
- 字体：Google Sans Code（Astro Fonts API）
- 代码高亮：Shiki（双主题：min-light / night-owl）
- 部署：GitHub Pages（GitHub Actions）
- 包管理：pnpm

## 成功标准

愉悦的写作体验、舒适的阅读体验、可持续的工程架构、最低维护成本、清晰且 AI 友好的文档、卓越的性能与 SEO。

## 开发工作流

路线图 → 规格说明 → 实现 → 评审 → 合并。实现永远不先于规格说明。

## 文档地图

| 文档 | 用途 |
| :--- | :--- |
| 00-overview（本文件） | 整体理解 |
| 01-information-architecture | 导航与页面结构 |
| 02-content-model | 内容集合定义 |
| 03-content-workflow | 内容工作流 |
| 04-technical-architecture | 技术架构 |
| 05-design-system | 视觉语言 |
| 06-engineering-guidelines | 工程指南 |
| 07-design-tokens | 设计参数（Design Token） |
| 08-seo-spec | SEO 规格（Meta、OG、结构化数据） |
