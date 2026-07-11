---
version: 1.0.0
last_updated: 2026-07-05
---

> 定义网站的 SEO（搜索引擎优化）规格，包括 Meta 标签、Open Graph、结构化数据、站点地图、RSS 和 OG 图片的规范。
>
> AI agent 新增页面或修改内容时，应遵循本文档确保 SEO 一致性。

---

## 一、SEO 架构总览

| 能力 | 实现位置 | 配置入口 |
|------|---------|---------|
| 基础 Meta 标签 | `src/layouts/Layout.astro` | `astro-paper.config.ts` → `site` |
| 文章 Meta 标签 | `src/layouts/PostLayout.astro` | Frontmatter 字段 |
| Open Graph | `Layout.astro` + `PostLayout.astro` | 自动生成 |
| Twitter Card | `Layout.astro` | 自动生成 |
| 结构化数据（JSON-LD） | `PostLayout.astro` | 自动生成 |
| OG 图片（站点级） | `src/pages/og.png.ts` | `site.ogImage` / `features.dynamicOgImage` |
| OG 图片（文章级） | `src/pages/posts/[...slug]/index.png.ts` | Frontmatter `ogImage` |
| 站点地图 | `@astrojs/sitemap`（`astro.config.ts`） | 自动生成 `sitemap-index.xml` |
| robots.txt | `src/pages/robots.txt.ts` | 自动生成 |
| RSS 订阅 | `src/pages/rss.xml.ts` | 自动生成 `rss.xml` |
| Google 验证 | `Layout.astro` | 环境变量 `PUBLIC_GOOGLE_SITE_VERIFICATION` |

---

## 二、Meta 标签规格

### 2.1 基础 Meta（所有页面）

由 `Layout.astro` 统一输出，页面通过 Props 传入值：

| Meta 标签 | 来源 | 说明 |
|-----------|------|------|
| `<title>` | Props `title` → 默认 `site.title` | 页面标题 |
| `<meta name="title">` | 同上 | 与 title 一致 |
| `<meta name="description">` | Props `description` → 默认 `site.description` | 页面描述，**必填** |
| `<meta name="author">` | `site.author` | 作者 |
| `<link rel="canonical">` | Props `canonicalURL` → 默认当前 URL | 规范链接 |
| `<link rel="sitemap">` | 自动 | 指向 `sitemap-index.xml` |
| `<meta name="generator">` | `Astro.generator` | 自动 |
| `<meta name="theme-color">` | 运行时由 `theme.ts` 填充 | 匹配当前背景色 |

### 2.2 文章页附加 Meta

由 `PostLayout.astro` 通过 `<slot name="head">` 注入：

| Meta 标签 | 来源 | 说明 |
|-----------|------|------|
| `<meta property="og:type">` | 覆盖为 `article` | 基础 Layout 默认为 `website` |
| `<meta property="article:published_time">` | Frontmatter `pubDatetime` | ISO 8601 格式 |
| `<meta property="article:modified_time">` | Frontmatter `modDatetime` | ISO 8601 格式，可选 |

### 2.3 页面标题格式

| 页面类型 | 格式 | 示例 |
|---------|------|------|
| 首页 | `{site.title}` | `AstroPaper` |
| 文章详情 | `{post.title} \| {site.title}` | `How to add posts \| AstroPaper` |
| 关于 | `{page.title} \| {site.title}` | `About \| AstroPaper` |
| 列表页 | `{site.title}` | `AstroPaper` |

---

## 三、Open Graph 规格

### 3.1 OG 标签（所有页面）

| 属性 | 内容 |
|------|------|
| `og:type` | `website`（基础页）/ `article`（文章页，PostLayout 覆盖） |
| `og:site_name` | `site.title` |
| `og:title` | 页面标题 |
| `og:description` | 页面描述 |
| `og:url` | 规范 URL |
| `og:image` | OG 图片 URL（绝对路径） |

### 3.2 Twitter Card 标签

| 属性 | 内容 |
|------|------|
| `twitter:card` | `summary_large_image` |
| `twitter:url` | 规范 URL |
| `twitter:title` | 页面标题 |
| `twitter:description` | 页面描述 |
| `twitter:image` | OG 图片 URL |

---

## 四、OG 图片规格

### 4.1 图片尺寸

所有 OG 图片统一为 **1200 × 630 像素**，PNG 格式。

### 4.2 图片生成策略

| 场景 | 来源 | 条件 |
|------|------|------|
| 文章有自定义 `ogImage` | Frontmatter 字段（字符串 URL 或 `image()` 引用） | 字段存在 |
| 文章无自定义 `ogImage` | 动态生成 `/posts/{slug}/index.png` | `features.dynamicOgImage: true` |
| 非文章页 | `public/{site.ogImage}` 或动态生成 `/og.png` | `features.dynamicOgImage` 控制 |

### 4.3 动态生成技术栈

- **渲染引擎**：Satori（SVG 生成）
- **转换引擎**：Sharp（SVG → PNG）
- **字体**：Google Sans Code（Regular 400 + Bold 700）
- **端点**：
  - `src/pages/og.png.ts` — 站点级默认 OG 图片
  - `src/pages/posts/[...slug]/index.png.ts` — 文章级动态 OG 图片

### 4.4 动态 OG 图片内容

**站点级**（`/og.png`）：
- 站点标题（72px bold）
- 站点描述（28px regular）
- 站点域名（28px bold，右下角）

**文章级**（`/posts/{slug}/index.png`）：
- 文章标题（72px bold）
- 作者名 + 站点标题（28px bold，底部）

### 4.5 OG 图片规则

- 仅对**已发布**（非 draft）且**未自定义 ogImage** 的文章生成动态 OG。
- 自定义 `ogImage` 优先级高于动态生成。
- `features.dynamicOgImage: false` 时，必须在 `public/` 下提供 `site.ogImage` 指定的静态文件。
- `site.ogImage` 必须为 `public/` 下的单文件名（如 `default-og.jpg`），禁止路径遍历。

---

## 五、结构化数据（JSON-LD）

### 5.1 文章页

由 `PostLayout.astro` 输出 `BlogPosting` 类型的 JSON-LD：

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "文章标题",
  "image": "OG 图片 URL",
  "datePublished": "ISO 8601 发布时间",
  "dateModified": "ISO 8601 修改时间（可选）",
  "author": [{
    "@type": "Person",
    "name": "作者名",
    "url": "作者主页 URL（可选）"
  }]
}
```

### 5.2 非文章页

目前非文章页不输出 JSON-LD。未来如需添加（如 `WebSite`、`Person` 类型），应通过 `Layout.astro` 的 `<slot name="head">` 注入。

---

## 六、站点地图（Sitemap）

- **集成方式**：`@astrojs/sitemap`（配置于 `astro.config.ts`）
- **输出路径**：`/sitemap-index.xml`
- **过滤规则**：当 `features.showArchives: false` 时，排除 `/archives/` 页面
- **自动更新**：每次构建自动生成，无需手动维护

---

## 七、robots.txt

由 `src/pages/robots.txt.ts` 自动生成：

```text
User-agent: *
Allow: /

Sitemap: {site.url}/sitemap-index.xml
```

允许所有爬虫抓取全站内容，并指向站点地图。

---

## 八、RSS 订阅

- **集成方式**：`@astrojs/rss`（`src/pages/rss.xml.ts`）
- **输出路径**：`/rss.xml`
- **自动发现**：`Layout.astro` 输出 `<link rel="alternate" type="application/rss+xml">`
- **内容来源**：所有 `posts` 集合中的文章
- **每条包含**：`title`、`description`、`link`（文章 URL）、`pubDate`（优先 `modDatetime`，回退 `pubDatetime`）

---

## 九、Frontmatter SEO 字段

### 9.1 Posts 集合

| 字段 | 类型 | 必填 | SEO 用途 |
|------|------|------|---------|
| `title` | String | 是 | `<title>`、`og:title`、JSON-LD `headline` |
| `description` | String | 是 | `<meta description>`、`og:description`、RSS 描述 |
| `pubDatetime` | Date | 是 | `article:published_time`、JSON-LD `datePublished` |
| `modDatetime` | Date | 否 | `article:modified_time`、JSON-LD `dateModified`、RSS `pubDate` |
| `ogImage` | String \| Image | 否 | 自定义 OG 图片，覆盖动态生成 |
| `canonicalURL` | String | 否 | 自定义规范链接 |
| `tags` | Array | 否 | 无直接 SEO 标签，但影响内容发现 |
| `draft` | Boolean | 否 | `true` 时不生成页面、不进入 RSS、不生成 OG |
| `featured` | Boolean | 否 | 无直接 SEO 影响 |

### 9.2 Pages 集合

| 字段 | 类型 | 必填 | SEO 用途 |
|------|------|------|---------|
| `title` | String | 是 | `<title>`、`og:title` |
| `description` | String | 否 | `<meta description>`、`og:description` |
| `ogImage` | String | 否 | 自定义 OG 图片 |
| `canonicalURL` | String | 否 | 自定义规范链接 |

---

## 十、SEO 检查清单

新增或修改页面时，应确认：

- [ ] 页面有 `title` 和 `description`（文章页两者均必填）
- [ ] Canonical URL 正确（默认使用当前页面 URL）
- [ ] OG 图片可访问（自定义或动态生成）
- [ ] 文章页输出 `og:type=article` 和 `article:published_time`
- [ ] 文章页输出 `BlogPosting` JSON-LD
- [ ] 草稿（`draft: true`）不会被构建输出
- [ ] 页面已包含在站点地图中（自动，除非被过滤）

---

## 十一、配置入口

所有 SEO 相关配置集中在 `astro-paper.config.ts`：

| 配置项 | 说明 |
|--------|------|
| `site.url` | 站点 URL，用于生成绝对 URL |
| `site.title` | 站点标题 |
| `site.description` | 站点描述 |
| `site.author` | 默认作者 |
| `site.profile` | 作者主页 URL（用于 JSON-LD） |
| `site.ogImage` | 默认 OG 图片文件名（`public/` 下） |
| `site.lang` | HTML lang 属性 |
| `features.dynamicOgImage` | 是否启用动态 OG 图片生成 |

Google Search Console 验证通过环境变量配置：

```
PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```
