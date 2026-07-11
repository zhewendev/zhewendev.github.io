---
version: 1.0.0
last_updated: 2026-07-05
---

> 定义所有内容实体（Content Entity）、元数据规范及内容之间的关系。
>
> 它回答的是：
> - 网站有哪些内容类型？
> - 每种内容承担什么职责？
> - 内容之间如何建立关联？
> - AI 创建内容时应该遵循哪些规范？
>
> 本文档描述业务模型，不绑定任何静态站点框架或实现方式。
>
> **项目阶段说明**：本文档描述目标站点规格。当前代码为 AstroPaper 模板原始内容，仅有 `posts` 和 `pages` 两个 Collection。其余内容类型（Series / Book / Tool / Thought / Friend）将在改造过程中逐步创建。

---

# 一、文档目标

所有内容均应遵循本文档定义的模型进行组织。

本文档主要用于：
- 定义内容类型；
- 统一元数据（Frontmatter）规范；
- 定义内容之间的引用关系；
- 保证 AI 与人工维护内容的一致性；
- 保证未来迁移技术栈时内容无需调整。
内容模型应保持长期稳定。
页面设计、主题样式及技术实现发生变化时，不应影响内容模型。

# 二、内容模型概览

| 内容类型    | 是否可阅读 | 是否独立页面 | 导航入口 |
| ------- | ----- | ------ | ---- |
| Article | ✅     | ✅      | 「文章」 |
| Series  | 否     | ✅      | 「专题」 |
| Book    | ✅     | ✅      | 「收藏」 |
| Tool    | ✅     | ✅      | 「收藏」 |
| Thought | ✅     | ✅      | 「随想」 |
| Friend  | 否     | ✅      | 「友链」 |
| About   | ✅     | ✅      | 「关于」 |

说明：
- 可阅读内容供用户阅读，非可阅读内容用于组织、导航或展示信息
- 每种内容均拥有唯一标识（Slug）和详情页

# 三、内容模型定义

## 3.1 Article

- **定位**：核心内容，完整知识沉淀（技术、教程、方法论、阅读总结、深度思考等）。
- **生命周期**：Draft → Published → Archived
- **唯一标识**：Slug（全局唯一，发布后不改）
- **可关联内容**：Category（1个）、Tag（多个）、Series（0或1个）、Book（多个）、Tool（多个）
- **状态**：draft / published / archived

## 3.2 Series

- **定位**：组织有顺序的多篇文章，不承载正文。
- **生命周期**：Planning → Writing → Completed → Deprecated
- **唯一标识**：Slug
- **关联**：Article（多个）
- **约束**：一篇文章最多属于一个专题；删除专题不影响文章。

## 3.3 Book

- **定位**：管理书籍资源（已读/推荐/阅读笔记入口）。
- **生命周期**：Wishlist → Reading → Finished
- **唯一标识**：Slug
- **关联**：Article（多个）、Tag（多个）

## 3.4 Tool

- **定位**：工具资源（软件、网站、服务、AI工具等）。
- **生命周期**：Active → Deprecated
- **唯一标识**：Slug
- **关联**：Article（多个）、Tag（多个）

## 3.5 Thought

- **定位**：轻量碎片记录（感悟、灵感、日常）。
- **生命周期**：Draft → Published → Archived
- **唯一标识**：Slug
- **关联**：Tag（多个）
- **约束**：不属于任何系列，不参与上一篇/下一篇导航。

## 3.6 Friend

- **定位**：友情链接，维护独立博客之间的连接
- **生命周期**：Active → Inactive
- **唯一标识**：Domain 或 Slug
- **无关联**。

## 3.7 About

- **定位**：个人介绍（简介、项目、社交、联系方式）。
- **单文档**，全站仅一个。

# 四、内容关系约束（Relationships）

- **所有关联采用引用（Slug）**，不复制内容。
- **Article ↔ Series**：一对多，文章最多属一个专题，专题可有多篇文章，文章可脱离专题独立存在。
- **Article ↔ Book**：多对多。一本书可以关联多篇文章，一篇文章也可引用多本书。
- **Article ↔ Tool**：多对多。
- **Category**：每篇文章一个分类，分类无嵌套，原则上数量≤20。
- **Tag**：开放集合，一个内容可拥有多个Tag。无层级，不应替代分类。
- **Friend、About**：不参与任何引用。

# 五、Frontmatter 规范

## 5.1 通用字段

所有内容共享以下字段。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | String | 是 | 无 | 标题 |
| slug | String | 是 | 无 | 唯一标识 |
| description | String | 是 | 无 | 摘要（用于 SEO 与列表展示） |
| cover | String | 否 | 空 | 封面 |
| tags | Array | 否 | [] | 标签 |
| draft | Boolean | 否 | false | 是否草稿 |
| pubDatetime | Date | 是 | 当前时间 | 发布时间 |
| modDatetime | Date | 否 | pubDatetime | 更新时间 |

## 5.2 Article

新增字段：

| 字段          | 类型      | 必填  | 说明     |
| ----------- | ------- | --- | ------ |
| category    | String  | 是   | 分类     |
| series      | String  | 否   | 所属专题   |
| toc         | Boolean | 否   | 是否显示目录 |
| readingTime | Number  | 自动  | 阅读时间   |

## 5.3 Series

| 字段       | 类型          | 必填 | 说明     |
| -------- | ----------- | --- | ------ |
| summary  | String      | 否   | 专题简介   |
| status   | Enum        | 是   | 专题状态   |
| articles | Array<Slug> | 是   | 文章列表   |

**status 合法值**：`planning` / `writing` / `completed` / `deprecated`

## 5.4 Book

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| author | String | 否 | 作者 |
| publisher | String | 否 | 出版社 |
| isbn | String | 否 | ISBN |
| rating | Number | 否 | 评分（0-5） |
| status | Enum | 是 | 阅读状态 |

**status 合法值**：`wishlist` / `reading` / `finished`

## 5.5 Tool

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| website | URL | 否 | 官网 |
| github | URL | 否 | GitHub 仓库 |
| platform | Array<Enum> | 否 | 支持平台 |
| pricing | Enum | 是 | 定价类型 |

**platform 合法值**：`web` / `ios` / `android` / `windows` / `macos` / `linux` / `cross-platform`

**pricing 合法值**：`free` / `freemium` / `paid` / `subscription`

## 5.6 Thought

无需额外字段。

保持轻量。

## 5.7 Friend

| 字段 | 类型 |
|------|------|
| siteName | String |
| avatar | URL |
| website | URL |
| description | String |
| rss | URL |

# 六、Slug 与内容标识

- 全站唯一，发布后不修改。
- 格式：英文，kebab-case（例：`android-auto-accounting`）。
- 禁用：中文、空格、时间戳、数据库ID。
- 不包含分类信息（如 `android/workmanager` 错误，应为 `workmanager-guide`）。

# 七、分类与标签体系（Taxonomy）

- **Category**：表达领域（如 Android、AI），每篇文章一个，无嵌套，数量稳定。
- **Tag**：表达主题（如 WorkManager），自由增加，无层级，不承担导航。
- 三者分工：Category 归属，Tag 检索，Series 组织阅读顺序，互不替代。

# 八、AI 内容约束

AI 创建或修改内容时，应遵循以下规则。

- 必填字段不得遗漏；Slug 不可重复；引用必须使用 Slug（非标题）。
- 每篇 Article 必须有一个 Category。
- Article 最多一个 Series；Thought 无 Series。
- Tag 保持克制，控制在 3～8 个。
- AI 优先补充 description、tags、cover、modDatetime。
- 修改时确保正文与 Frontmatter 一致（如标题修改需同步 Slug 规划，系列/分类修改需同步引用等）。

# 九、设计原则

> 通用原则见 `00-overview` §原则与理念。以下为内容模型领域的特定原则。

1. 一个内容只有一个唯一标识。
2. 一个内容只有一个详情页。
3. 所有关联均采用引用关系。
4. 内容可独立存在，不依赖页面。
5. 元数据保持统一、简洁、稳定。
6. 内容模型应保持长期兼容，不因技术栈变化而改变。