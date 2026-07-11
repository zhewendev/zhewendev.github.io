---
version: 1.0.0
last_updated: 2026-07-05
---

> 定义项目模块边界、代码组织原则及依赖关系。本文档描述架构原则，具体技术栈见下方参考。

---

# 零、技术栈参考

本文档描述架构原则，以下为项目实际使用的技术栈，供开发时参考：

| 维度 | 技术选型 |
|------|----------|
| 框架 | Astro v7（SSG 模式），基于 AstroPaper |
| 语言 | TypeScript（strict 模式） |
| 样式 | Tailwind CSS v4 + `@tailwindcss/typography` |
| 内容 | Markdown / MDX + Content Collections |
| 搜索 | Pagefind |
| 字体 | Google Sans Code（Astro Fonts API） |
| 代码高亮 | Shiki（双主题：min-light / night-owl） |
| 部署 | GitHub Pages（GitHub Actions） |
| 包管理 | pnpm |

---

# 一、设计目标

- **内容优先**、**模块解耦**、**组件复用**、**配置驱动**、**静态优先**。
- 代码组织长期稳定，新增功能应扩展已有模块，避免不断新增一级目录。

# 二、整体架构

六个核心模块，单向依赖，禁止循环依赖：

```text
Content → Page → Layout → Component → Style → Build
```

| 模块 | 职责 |
|------|------|
| Content | 内容数据 |
| Page | 页面组织 |
| Layout | 页面框架 |
| Component | 可复用组件 |
| Style | 全局样式 |
| Build | 构建与部署 |

# 三、目录结构

建议采用如下结构（标注「规划」的目录在改造过程中按需创建）：

```text
src/
├── assets/        # 构建资源
├── components/    # 可复用 UI 组件
├── layouts/       # 页面骨架
├── pages/         # 路由与页面
├── content/       # Markdown 内容
├── styles/        # 全局样式与 Design Token
├── lib/           # 第三方能力封装（规划中，改造时创建）
├── utils/         # 纯函数工具
├── config.ts      # 集中配置（当前为文件，未来可按需拆分为目录）
└── types/         # TypeScript 类型

根目录：
docs/              # 项目文档
public/            # 公开静态资源
scripts/           # 构建/维护脚本
.github/           # CI/CD 配置
.vscode/           # IDE 配置
.obsidian/         # Obsidian 本地库
```


# 四、模块职责

|模块|核心约束|
|---|---|
|**Content**|仅管理数据（Article、Series、Book 等），不含展示逻辑|
|**Pages**|负责路由、数据获取、Layout 组合，不处理 UI 细节与样式|
|**Layouts**|定义页面骨架（Header、Footer、Sidebar），不含业务逻辑|
|**Components**|高内聚、低耦合，可组合复用（如 Card、Badge、Pagination）|
|**Styles**|统一维护 Design Token、全局变量、排版、暗色模式；禁止组件内写死颜色|
|**Config**|集中管理站点名称、导航、SEO、社交、评论、统计等，禁止分散维护|
|**Utils**|纯函数（日期、字符串、Slug、阅读时间），不引用 Pages/Components|
|**Lib**|封装第三方依赖（RSS、Markdown、Search、SEO、GitHub API），隔离业务代码|
|**Types**|统一维护 TypeScript 类型，避免重复定义|

# 五、模块依赖规则


**允许的依赖路径**：

- Pages → Layouts → Components → Utils
- Pages → Content（直接获取数据）
- Components → Utils

**禁止的依赖路径**：

- Utils → Components / Pages
- Content → Components / Pages
- Styles → Pages / Components（样式仅被引用，不反向依赖）

所有依赖保持单向。

## 六、设计原则

### 组件

- 单一职责、可组合、可复用、可替换（设计约束见 `05` §九）。

### 配置

- 所有可变配置集中维护，新增配置优先扩展已有文件。

### 资源

- `assets/`（构建资源）、`public/`（公开资源）、`content/`（Markdown）三者不重复存放。
### 样式

- 三级组织：Design Token → 基础组件样式 → 页面样式。
- 所有颜色、字体、间距、圆角、阴影统一定义。

### 状态管理

- 静态站点，不引入全局状态库。
- 状态来源仅限于：URL、Frontmatter、配置、浏览器本地；组件仅维护局部状态。
### 性能

- 默认静态生成、按需加载、图片优化、代码分割、最小 JavaScript。

## 七、可扩展性

- **新增内容类型**（Podcast、Course、Project 等）：扩展 `Content` 模块，不修改已有模块。
- **新增功能**（搜索、评论、Newsletter、Analytics）：扩展 `Components` 或 `Lib`，不修改 `Layout`。

## 八、架构总则

> 通用原则见 `00-overview` §原则与理念。以下为架构领域的特定原则。

1. 模块优于功能。
2. 配置优于硬编码。
3. 组合优于继承。
4. 单向依赖。
5. 单一职责。
6. 高内聚，低耦合。
7. 所有模块保持长期稳定。
