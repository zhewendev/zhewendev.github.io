项目是基于 AstroPaper 的个人知识博客，内容是核心产品。
本文档为 AI Coding Agent 的入口索引，提供技术栈速览、文档导航和工作流指引。所有规则定义在 Blueprint 中，本文件不重复 Blueprint 内容。

## 技术栈

- 框架：Astro v7（SSG 模式）
- 语言：TypeScript（strict 模式）
- 样式：Tailwind CSS v4 + `@tailwindcss/typography`
- 内容：Markdown / MDX + Content Collections
- 搜索：Pagefind
- 字体：Google Sans Code（通过 Astro Fonts API）
- 部署：GitHub Pages（GitHub Actions）
- 包管理：pnpm
- 代码规范：ESLint + Prettier + Commitizen

## 文档体系

- **Blueprint** (`docs/blueprint/`)：长期规则（定位、信息架构、内容模型、设计系统等）。不可随意修改。
- **OpenSpec** (`openspec/`)：当前功能的具体需求规格。
- **OpenSpec 工作流** (`openspec-workflow.md`)：OpenSpec 四阶段流程规范（Explore → Propose → Apply → Archive）。使用 `/opsx:` 命令时必读。
- **源码**：只负责实现，不制定规则。

### Blueprint 文档索引

| 文档 | 用途 |
|------|------|
| `00-overview` | 项目定位、原则与理念、技术栈、文档地图 |
| `01-information-architecture` | 导航设计、页面职责、URL 规范 |
| `02-content-model` | 内容类型定义、Frontmatter 规范、关系约束 |
| `03-content-workflow` | 内容生命周期、Git 工作流、AI 协作边界 |
| `04-technical-architecture` | 模块边界、目录结构、依赖规则 |
| `05-design-system` | 设计哲学、视觉语言、交互原则 |
| `06-engineering-guidelines` | 工程规范、修改原则、禁止事项、工具链 |
| `07-design-tokens` | 设计参数（色板、字号、间距、断点等具体数值） |
| `08-seo-spec` | SEO 规格（Meta 标签、OG 图片、结构化数据、RSS） |

## 工作流

1. **理解任务** – 明确目标、涉及页面/内容类型及影响范围。
2. **按需阅读 Blueprint** – 根据任务类型选择相应文档，区分"必读全文"与"按节查询"：

| 开发内容 | 必读全文 | 按节查询 |
|----------|----------|----------|
| 页面开发 | 01 | 02（§5 Frontmatter）、05（§9 组件原则）、07（Token 速查）、08（SEO 字段） |
| 内容相关 | 03 | 02（§5 Frontmatter、§3 内容模型） |
| UI 调整 | — | 05（按涉及维度选读 §4-§15）、07（对应 Token 章节） |
| 架构调整 | 04 | 06（§5 目录原则、§6 命名规范） |
| 新功能 | 01、04 | 02、05、06、07、08（按需选读相关章节） |

3. **阅读 OpenSpec**（若存在）。
4. **使用 OpenSpec 流程时** – 遵循 `openspec-workflow.md` 的四阶段流程规范（Explore 增量持久化 → Propose 基于笔记生成 → Apply 分阶段执行验证 → Archive）。
5. **实现** – 遵循最小修改、复用优先、内容优先。核心原则见 `00-overview` §原则与理念，工程约束见 `06` 全文。
6. **自检** – 运行验证命令，确保未引入无关修改。自检要点见 `06` §十四 AI 协作规范。

## 规则优先级与冲突处理

优先级：Blueprint > OpenSpec > Code
若 OpenSpec 与 Blueprint 冲突：**立即暂停，报告冲突并等待明确指示**。不得自行修改 Blueprint 或直接写出违背 Blueprint 的实现。任何对 Blueprint 的调整必须由人工决策并执行。

## Blueprint 与 OpenSpec 的边界

**需要创建 OpenSpec**：涉及新页面、新内容类型、新组件类型、导航结构调整。

**不需要创建 OpenSpec**：修改已有页面样式、调整已有组件行为、修复 bug、内容更新。

判断不准时，默认创建 OpenSpec。

## 常见任务速查

| 任务 | 修改区域 | 参考 Blueprint |
|------|----------|----------------|
| 新增文章 | `src/content/posts/` | 02-§5.2, 03-§4, 08-§9 |
| 调整首页布局 | `src/pages/index.astro` | 01-§4, 05-§6 |
| 修改导航 | `src/components/Header.astro`, `astro-paper.config.ts` | 01-§3 |
| 新增组件 | `src/components/` | 04-§4, 05-§9, 06-§7 |
| 调整配色 | `src/styles/theme.css` | 07-§1 |
| 修改搜索 | `src/pages/search.astro` | 01-§6 |
| 调整字号/排版 | `src/styles/typography.css` | 07-§3, 07-§13 |
| 修改站点配置 | `astro-paper.config.ts` | 08-§11 |
| 修改 SEO / Meta | `src/layouts/Layout.astro`, `PostLayout.astro` | 08 全文 |
| 修改 OG 图片 | `src/pages/og.png.ts`, `posts/[...slug]/index.png.ts` | 08-§4 |

## 验证命令

| 检查项 | 命令 |
|--------|------|
| 类型检查 | `pnpm astro check` |
| 代码规范 | `pnpm run lint` |
| 格式检查 | `pnpm run format:check` |
| 格式修复 | `pnpm run format` |
| 完整构建 | `pnpm run build` |

一切以 Blueprint 为准，保持项目简单、稳定、可维护。
