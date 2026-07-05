---
version: 1.1.0
last_updated: 2026-07-05
---

> 定义网站所有可执行的设计参数（Design Token），是 `05-design-system.md` 设计哲学的具体数值表达。
>
> AI agent 生成 UI 代码时应直接引用本文档中的数值，确保视觉一致性。

---

## 一、色彩 Token

### 1.1 语义色板

所有颜色通过 CSS 自定义属性定义于 `src/styles/theme.css`，通过 Tailwind v4 `@theme` 映射为工具类。

| Token | CSS 变量 | 亮色值 | 暗色值 | 用途 |
|------|---------|--------|--------|------|
| background | `--background` | `#fdfdfd` | `#212737` | 页面背景 |
| foreground | `--foreground` | `#282728` | `#eaedf3` | 正文文字 |
| accent | `--accent` | `#006cac` | `#ff6b01` | 品牌/链接/交互强调 |
| accent-foreground | `--accent-foreground` | `#ffffff` | `#ffffff` | 强调色上的文字 |
| muted | `--muted` | `#e6e6e6` | `#343f60` | 次要背景/代码背景 |
| muted-foreground | `--muted-foreground` | `#6b7280` | `#afb9ca` | 次要文字 |
| border | `--border` | `#ece9e9` | `#3a4256` | 边框/分隔线 |

### 1.2 状态色 Token

状态色目前仅在代码 diff 高亮中使用，尚未提取为独立 CSS 变量。后续如需在 UI 中使用状态色（如通知、表单校验），应优先扩展为语义变量。

| 语义 | 当前实现 | 建议变量名 |
|------|---------|-----------|
| 成功（success） | `bg-green-400/20`、`text-green-500` | `--success` / `--success-foreground` |
| 错误（error） | `bg-red-500/20`、`text-red-500` | `--error` / `--error-foreground` |
| 提示（info） | `bg-slate-400/20` | `--info` / `--info-foreground` |
| 警告（warning） | 暂未使用 | `--warning` / `--warning-foreground` |

### 1.3 选区颜色

文本选区颜色通过 Tailwind 工具类设置于 `Layout.astro` 的 `<body>` 元素：

| 属性 | 工具类 | 值 |
|------|--------|-----|
| 选区背景 | `selection:bg-accent/75` | accent 色 75% 透明度 |
| 选区文字 | `selection:text-accent-foreground` | accent 前景色 |

### 1.4 Accent 色使用说明

当前亮色 accent 为蓝色（`#006cac`），暗色 accent 为橙色（`#ff6b01`），属于"昼夜氛围区分"策略。

> **已知矛盾**：`05-design-system.md` §十二要求暗色模式"仅调整亮度、对比、视觉重心"，而蓝→橙是色相变更。若未来决定统一品牌色，应保持亮暗同色相，仅调整明度。

### 1.5 色彩使用规则

- 亮色/暗色模式通过 `data-theme` 属性切换，**禁止**在组件中硬编码颜色值。
- 所有颜色引用必须通过 CSS 变量或 Tailwind 语义类（如 `bg-background`、`text-foreground`、`text-accent`）。
- **border 永远保持中性色**，不承担强调职责。强调由 accent 负责。
- 品牌色仅用于链接、交互态、当前状态，禁止大面积使用。

---

## 二、字体 Token

### 2.1 字体族

项目当前仅配置了一个字体，同时用于正文和代码：

| Token | CSS 变量 | 值 | 回退 | 用途 |
|------|---------|-----|------|------|
| font-app | `--font-google-sans-code` | Google Sans Code | `monospace` | 全站默认字体（正文 + 代码） |

字体通过 Astro Fonts API 加载，配置于 `astro.config.ts`。

> **已知局限**：Google Sans Code 本质是等宽字体（fallback 为 `monospace`），适合代码场景，但用于中文长文正文会降低阅读体验。`05-design-system.md` §九要求"排版是最重要的视觉设计，减少阅读疲劳"。
>
> **建议（需代码变更）**：分离正文字体和代码字体——
> - 正文：添加阅读型字体（如 Noto Sans SC、Inter 等），通过新变量 `--font-body` 定义
> - 代码：保留 Google Sans Code，通过变量 `--font-code` 定义
> - `theme.css` 中 `--font-app` 映射为 `--font-body`，代码块 `.astro-code code` 映射为 `--font-code`

### 2.2 字重

| 字重 | 值 | 用途 |
|------|-----|------|
| Light | 300 | 辅助 |
| Regular | 400 | 正文 |
| Medium | 500 | 强调 |
| SemiBold | 600 | 标题 |
| Bold | 700 | 强调标题 |

---

## 三、字号与排版 Token

### 3.1 字号阶梯

采用 Tailwind CSS v4 默认字号阶梯。正文基准为 `text-base`（16px）。

| 工具类 | 尺寸 | 行高 | 用途 |
|--------|------|------|------|
| `text-xs` | 0.75rem (12px) | 1rem (16px) | 辅助信息、时间戳 |
| `text-sm` | 0.875rem (14px) | 1.25rem (20px) | 次要文字、元数据 |
| `text-base` | 1rem (16px) | 1.5rem (24px) | **正文基准** |
| `text-lg` | 1.125rem (18px) | 1.75rem (28px) | 强调正文 |
| `text-xl` | 1.25rem (20px) | 1.75rem (28px) | 小标题 |
| `text-2xl` | 1.5rem (24px) | 2rem (32px) | 页面标题 |
| `text-3xl` | 1.875rem (30px) | 2.25rem (36px) | 区块标题 |
| `text-4xl` | 2.25rem (36px) | 2.5rem (40px) | 页面主标题 |

### 3.2 Prose 排版间距

文章正文使用 `.app-prose` 类（基于 `@tailwindcss/typography`），以下间距 Token 由 `typography.css` 定义，AI 生成文章相关布局时应遵循：

| 元素 | 间距 Token | 值 | 来源 |
|------|-----------|-----|------|
| 标题下间距 | `mb-3` | 0.75rem (12px) | `typography.css` h1-h4, th |
| 表头上下间距 | `py-1.5` | 0.375rem (6px) | `typography.css` th |
| 表格单元格间距 | `p-2` | 0.5rem (8px) | `typography.css` th, td |
| 行内代码内间距 | `p-1` | 0.25rem (4px) | `typography.css` code |
| 正文链接下划线偏移 | `underline-offset-4` | 0.25rem (4px) | `typography.css` a |
| 图片说明透明度 | `opacity-75` | 75% | `typography.css` figcaption |
| 引用透明度 | `opacity-80` | 80% | `typography.css` blockquote |
| 引用左边框 | `border-s-accent/80` | accent 80% | `typography.css` blockquote |

### 3.3 字间距

| 场景 | 工具类 | 值 |
|------|--------|-----|
| 标题字间距 | `tracking-wide` | 0.025em | 用于 `h2` 级别标题（首页区块标题等） |
| 正文字间距 | 默认 | `normal` (0) | 正文不额外设置字间距 |

---

## 四、间距 Token

采用 Tailwind CSS v4 默认间距阶梯，基准单位为 `0.25rem`（4px）。

| 工具类 | 值 | 常见用途 |
|--------|-----|---------|
| `p-1` / `m-1` | 0.25rem (4px) | 紧凑间距、行内代码内边距 |
| `p-2` / `m-2` | 0.5rem (8px) | 小间距、表格单元格 |
| `p-4` / `m-4` | 1rem (16px) | **默认间距**、页面水平 padding |
| `p-6` / `m-6` | 1.5rem (24px) | 中等间距 |
| `p-8` / `m-8` | 2rem (32px) | 大间距、区块间 |
| `p-12` / `m-12` | 3rem (48px) | 区块分隔 |
| `p-16` / `m-16` | 4rem (64px) | 大区块分隔 |

---

## 五、圆角 Token

采用 Tailwind CSS v4 默认圆角阶梯。

| 工具类 | 值 | 用途 |
|--------|-----|------|
| `rounded` | 0.25rem (4px) | 默认圆角（行内代码等） |
| `rounded-md` | 0.375rem (6px) | 中等圆角 |
| `rounded-lg` | 0.5rem (8px) | 大圆角 |
| `rounded-xl` | 0.75rem (12px) | 超大圆角 |
| `rounded-full` | 9999px | 圆形（头像等） |

---

## 六、阴影 Token

项目默认使用克制阴影，主要依赖边框和留白建立层次。

| 工具类 | 值 |
|--------|-----|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `shadow` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |

使用原则：优先用边框（`border-border`）和留白分隔内容，仅在需要强调悬浮感时使用阴影。后续如需语义化阴影（如 `shadow-card`、`shadow-dropdown`），可通过 Tailwind `@theme` 扩展。

---

## 七、断点 Token

采用 Tailwind CSS v4 默认断点。

| 断点 | 最小宽度 | 用途 |
|------|---------|------|
| `sm` | 640px | 大手机横屏 / 小平板 |
| `md` | 768px | 平板竖屏 |
| `lg` | 1024px | 平板横屏 / 小笔记本 |
| `xl` | 1280px | 桌面显示器 |
| `2xl` | 1536px | 大屏显示器 |

移动优先：默认样式针对移动端编写，通过 `sm:`、`md:` 等前缀逐步增强。

---

## 八、布局 Token

| Token | 工具类 | 值 | 说明 |
|-------|--------|-----|------|
| 内容最大宽度 | `max-w-app` | `max-w-3xl` (48rem / 768px) | 正文与列表区域统一宽度 |
| 页面水平内边距 | `app-layout` | `px-4` (1rem / 16px) | 全站统一水平 padding |
| 页面居中 | `app-layout` | `mx-auto w-full` | 内容水平居中 |
| 锚点滚动偏移 | `:target` | `scroll-margin-block: 1rem` | 目录跳转时避免被 Header 遮挡 |

### 自定义工具类

以下工具类定义于 `global.css`，通过 Tailwind v4 `@utility` 注册：

| 工具类 | 定义 | 用途 |
|--------|------|------|
| `max-w-app` | `max-w-3xl` | 内容区最大宽度 |
| `app-layout` | `max-w-app mx-auto w-full px-4` | 页面内容区布局 |
| `active-nav` | `underline decoration-wavy decoration-2 underline-offset-8` | 当前导航项高亮 |

---

## 九、层级 Token（Z-index）

定义元素的垂直堆叠层级，避免 z-index 值随意使用。

| 层级语义 | 值 | 使用场景 |
|---------|-----|---------|
| 背景层 | `-z-10` | 装饰性背景元素（如 BackToTopButton 背景层） |
| 内容层 | `0`（默认） | 页面正文、卡片、常规内容 |
| 浮动层 | `z-10` | 固定在顶部的阅读进度条 |
| 覆盖层 | `z-50` | 模态对话框（图片灯箱）、Header 移动端菜单、BackToTop 按钮 |

使用规则：新增浮动/覆盖元素时，优先复用上述层级值；如需新层级，先在此文档登记。

---

## 十、过渡与动效 Token

### 10.1 时长分级

| 语义 | 值 | 工具类 | 使用场景 |
|------|-----|--------|---------|
| fast | 150ms | `duration-150` | Hover、链接颜色变化等即时反馈 |
| normal | 200ms | `duration-200` | 主题切换、灯箱淡入淡出 |
| slow | 500ms | `duration-500` | BackToTop 按钮滑入滑出 |

交互反馈应即时（≤ 150ms），避免用户感知延迟。动画仅用于理解状态变化，不做装饰。

### 10.2 缓动函数

| 场景 | 值 | 说明 |
|------|-----|------|
| 默认 | `ease-out` | 大部分过渡的默认缓动 |
| 主题切换 | 浏览器默认 | 仅 opacity 过渡，无需特殊缓动 |

### 10.3 减少动效

项目支持 `prefers-reduced-motion`，通过 Tailwind 的 `motion-reduce:` 前缀实现。当前已在图片灯箱中使用 `motion-reduce:transition-none`。

新增动画时，应同时提供 `motion-reduce:` 降级方案，确保运动敏感用户不受影响。

---

## 十一、焦点与轮廓 Token

项目通过 Tailwind 工具类统一管理焦点样式，确保键盘可访问性。

### 11.1 默认轮廓

所有元素默认设置轮廓色（`global.css`）：

```css
* { @apply outline-accent/75; }
```

### 11.2 焦点可见样式

交互元素（`a`、`button`）在键盘聚焦时显示虚线轮廓：

| 属性 | 工具类 | 值 |
|------|--------|-----|
| 轮廓颜色 | `outline-accent` | accent 色 |
| 轮廓宽度 | `outline-2` | 2px |
| 轮廓样式 | `outline-dashed` | 虚线 |
| 轮廓偏移 | `outline-offset-1` | 0.25rem (4px) |
| 去除下划线 | `no-underline` | 聚焦时隐藏链接下划线，避免与轮廓重叠 |

使用规则：新增交互元素时，应用 `focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-1 focus-visible:outline-accent` 确保一致的焦点表现。

---

## 十二、代码高亮 Token

代码块使用 Shiki 双主题，配置于 `astro.config.ts`。

| 模式 | Shiki 主题 |
|------|-----------|
| 亮色 | `min-light` |
| 暗色 | `night-owl` |

### 12.1 代码块容器

| 属性 | 亮色 | 暗色 | 来源 |
|------|------|------|------|
| 背景 | `--shiki-light-bg` | `--shiki-dark-bg` | Shiki 自动生成 |
| 文字 | `--shiki-light` | `--shiki-dark` | Shiki 自动生成 |
| 边框 | `outline-border` + `border` | 同左 | `typography.css` `.astro-code` |

### 12.2 Diff 高亮

| 类型 | 背景 | 前缀 | 前缀颜色 | 来源 |
|------|------|------|---------|------|
| 新增行 | `bg-green-400/20` | `+` | `text-green-500` | `typography.css` |
| 删除行 | `bg-red-500/20` | `-` | `text-red-500` | `typography.css` |
| 高亮行 | `bg-slate-400/20` | — | — | `typography.css` |
| 高亮词 | `border-border rounded-sm border px-0.5 py-px` | — | — | `typography.css` |

> **已知局限**：Diff 颜色使用固定的 Tailwind 原始色值（`green-400`、`red-500`），未提取为语义变量。后续如需换主题，建议 Token 化为 `--diff-add-bg`、`--diff-remove-bg` 等。

---

## 十三、排版系统（Prose）

文章正文使用 Tailwind Typography 插件（`@tailwindcss/typography`），通过 `.app-prose` 类应用。完整样式定义于 `typography.css`。

| 元素 | 样式要点 |
|------|---------|
| 标题 (h1-h4, th) | `text-foreground mb-3` |
| h3 | `italic` |
| 正文 (p, strong, ol, ul 等) | `text-foreground` |
| 链接 | `text-foreground hover:text-accent decoration-dashed underline-offset-4` |
| 列表标记 | `marker:text-accent` |
| 行内代码 | `bg-muted/75 text-foreground rounded p-1` |
| 引用 | `border-s-accent/80 opacity-80` |
| 图片 | `border-border mx-auto border` |
| 表格单元格 | `border-border border p-2` |
| 分割线 | `border-border` |
| 图片说明 | `opacity-75` |
| 可折叠详情 | `inline-block cursor-pointer select-none` |

---

## 十四、暗色模式机制

### 14.1 主题切换

通过 `data-theme` 属性切换亮暗模式：

- `data-theme="light"` → 亮色（`:root` 默认）
- `data-theme="dark"` → 暗色

CSS 变量在 `theme.css` 中按 `[data-theme="..."]` 选择器分别定义。

### 14.2 Tailwind 暗色变体

`global.css` 中注册了自定义暗色变体：

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

使用方式：`dark:bg-xxx`、`dark:text-xxx` 等。**注意**：暗色变体基于 `data-theme` 属性，不是 `prefers-color-scheme` 媒体查询。

### 14.3 FOUC 预防

`Layout.astro` 中包含内联脚本，在浏览器首次绘制前读取 `localStorage` 中的 `theme` 值（或 `prefers-color-scheme`），设置 `<html data-theme="...">`，避免亮暗模式闪烁。该脚本同步执行，无需 `defer`/`async`。

---

## 十五、Token 使用原则

1. **禁止硬编码**：所有颜色、字体、间距必须通过 CSS 变量或 Tailwind 工具类引用，不在组件中写死具体值。
2. **语义优先**：使用语义类（`bg-background`、`text-foreground`）而非原始值（`bg-[#fdfdfd]`）。
3. **暗色兼容**：任何颜色使用必须同时考虑亮色/暗色模式下的表现，通过 CSS 变量自动切换。
4. **Border 中性原则**：border 永远使用中性色，不承担强调职责。强调由 accent 负责。
5. **层级克制**：z-index 仅使用§九定义的四个层级值，禁止随意使用 `z-20`、`z-30` 等中间值。
6. **增量扩展**：新增 Token 时优先扩展已有 CSS 变量体系，不引入平行系统。
7. **Token 即规格**：本文件中的数值是唯一设计参数来源，`05-design-system.md` 提供设计哲学，本文件提供可执行数值。
