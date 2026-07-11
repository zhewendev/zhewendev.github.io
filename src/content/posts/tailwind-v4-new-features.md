---
author: Zhewen
pubDatetime: 2026-01-20T14:30:00Z
modDatetime: 2026-01-20T14:30:00Z
title: "Tailwind CSS v4 新特性详解"
description: Tailwind CSS v4 带来了重大更新，包括基于 CSS 的配置、改进的性能和新的特性。本文详细解读这些变化。
featured: true
draft: false
tags:
  - Tailwind CSS
  - CSS
  - 前端
readingTime: "6 min read"
---

Tailwind CSS v4 是一次重大更新，带来了许多令人兴奋的新特性。本文将详细介绍这些变化以及如何从 v3 迁移。

## 基于 CSS 的配置

Tailwind v4 最大的变化是配置方式。不再需要 `tailwind.config.js`，而是直接在 CSS 文件中配置：

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

### 自定义主题

```css
@theme {
  /* 颜色 */
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;

  /* 字体 */
  --font-display: "Poppins", sans-serif;

  /* 间距 */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
}
```

## 性能提升

Tailwind v4 使用新的引擎，构建速度提升了 10 倍以上：

| 项目大小 | v3 构建时间 | v4 构建时间 |
| -------- | ----------- | ----------- |
| 小型项目 | ~500ms      | ~50ms       |
| 大型项目 | ~3000ms     | ~200ms      |

## 新的 @apply 语法

```css
.btn {
  @apply rounded-lg px-4 py-2 font-medium;
  @apply bg-blue-500 text-white;
  @apply transition-colors hover:bg-blue-600;
}
```

## 容器查询支持

原生支持容器查询：

```html
<div class="@container">
  <div class="@md:grid-cols-2 @lg:grid-cols-3">
    <!-- 内容 -->
  </div>
</div>
```

## 渐变 API 改进

更直观的渐变语法：

```html
<div class="bg-linear-to-r from-blue-500 to-purple-500">
  <!-- 内容 -->
</div>
```

## 迁移指南

从 v3 迁移到 v4 的主要步骤：

1. 更新依赖
2. 迁移配置文件到 CSS
3. 更新自定义插件
4. 测试和验证

## 总结

Tailwind CSS v4 是一个重要的里程碑，它简化了配置流程，大幅提升了性能，并带来了许多实用的新特性。对于新项目，建议直接使用 v4；现有项目可以逐步迁移。
