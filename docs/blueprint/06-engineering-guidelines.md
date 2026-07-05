---
version: 1.0.0
last_updated: 2026-07-05
---

> 本文档定义项目的工程约束、开发规范及长期维护原则。当实现方案与工程规范冲突时，应优先遵循本规范。

# 一、工程目标

> 通用原则见 `00-overview` §原则与理念。以下为工程领域的补充约束。

- 任何新增代码都应满足：易理解、易维护、易扩展、易删除。
- 避免为了当前需求增加未来维护成本。

# 二、工具链

项目已配置以下工具链，开发时应主动使用：

| 工具 | 配置文件 | 命令 | 用途 |
|------|---------|------|------|
| Prettier | `.prettierrc` | `pnpm run format` / `format:check` | 代码格式化（含 Astro、Tailwind 插件） |
| ESLint | `eslint.config.js` | `pnpm run lint` | 代码规范检查（含 Astro 插件） |
| Astro Check | — | `pnpm astro check` | TypeScript 类型检查 |
| Commitizen | `cz.yaml` | `git cz` | 规范化 Commit Message（Conventional Commits） |

### Prettier 配置要点

- `semi: true`、`singleQuote: false`、`tabWidth: 2`、`printWidth: 80`
- `trailingComma: "es5"`、`arrowParens: "avoid"`
- 插件：`prettier-plugin-astro`、`prettier-plugin-tailwindcss`

### ESLint 规则

- `no-console: error`（禁止 console 语句）
- 忽略目录：`dist/`、`.astro/`、`public/pagefind/`

### Commit Message 规范

采用 Conventional Commits（通过 Commitizen 管理）：

- 格式：`type(scope): description`
- 类型：`feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore`
- 版本号与 CHANGELOG 由 Commitizen 自动管理

# 三、TypeScript 规范

项目使用 TypeScript strict 模式（`astro/tsconfigs/strict`），遵循以下规则：

- **禁止 `any`**：使用 `unknown` + 类型守卫，或定义具体类型。
- **显式标注**：函数返回类型、Props 类型、公开 API 必须显式标注。
- **类型优先**：优先使用 `type` 定义对象形状，`interface` 仅用于需要声明合并的场景。
- **路径别名**：使用 `@/*` 别名引用 `src/` 下的模块，不使用相对路径跨级引用。
- **类型定义**：统一存放于 `src/types/`，避免分散定义重复类型。

# 四、修改原则

所有修改遵循最小影响原则。

**优先**：复用已有能力、保持现有结构、保持已有命名、保持已有设计语言。

**避免**：无关重构、风格统一式修改、大范围格式调整、顺手修复无关问题。一次修改只解决一个问题。

> 以下操作**不属于**"附带修改"：运行项目已有的 format/lint 命令、更新 `modDatetime` 字段、修复本次修改引入的 lint 错误。

# 五、目录原则

目录应反映职责，而非实现方式。层级保持简单，避免超过三层业务嵌套。目录结构应长期稳定，新增目录前优先考虑复用已有目录。

**禁止**出现 `utils2`、`components-new`、`temp`、`test-final`、`backup`、`old`、`new` 等临时目录。

# 六、命名规范

命名应准确表达职责，避免缩写、拼音、无意义名称。

- ❌ `data2`、`pageNew`、`listFinal`
- ✅ `ArticleCard`、`SeriesList`、`CollectionItem`、`SearchPanel`

**一致性**：同一概念只能拥有一个名称。例如 Series 在整个项目始终使用 Series，不得同时出现 Topic、CollectionSeries、ArticleGroup。

# 七、组件规范

- **页面**负责：获取数据、页面布局、页面组合。不承担基础组件职责。
- **组件**负责：展示、交互、局部状态。不负责页面跳转、数据来源、业务流程。
- **新增组件前**，必须确认是否已有相同能力，避免复制或轻微修改后新建。

# 八、样式规范

样式属于组件的一部分。组件应保持独立、可复用、一致。

- 禁止组件 A 修改组件 B 的样式。
- 禁止页面覆盖大量组件样式。
- 禁止复制已有样式。
- 所有颜色、字体、间距、圆角通过 `07-design-tokens.md` 定义的 CSS 变量或 Tailwind 语义类引用，禁止硬编码。

# 九、新增功能规范

新增功能应优先遵循现有架构。开始前必须回答：

1. 是否已有相同能力可以复用？
2. 是否符合 Content Model？
3. 是否符合 Information Architecture？
4. 是否符合 Design System？
5. 是否会增加维护成本？

若无法回答上述问题，不应直接开始开发。只有当现有能力无法满足需求时，才允许新增页面、组件、布局、内容类型、目录或配置。

# 十、内容模型约束

Content Model 是整个项目的数据基础。任何涉及 Frontmatter、内容类型或字段结构的修改，都应保持向后兼容。

- **禁止**修改字段名称、删除字段、修改字段含义、修改 Slug 规则。
- **新增字段**时应满足：职责单一、命名清晰、默认值明确、不影响已有内容。优先新增字段，而不是修改已有字段。
- **新增内容类型**前，应确认是否能够使用已有类型表达，避免类型无限增长。

# 十一、Blueprint 修改规范

Blueprint 是最高设计依据，应保持长期稳定。只记录长期稳定的规则，不记录临时方案、实现细节、框架特性、组件代码、第三方库。

只有在网站定位、信息架构、内容模型或长期设计原则发生变化时，才允许修改 Blueprint。普通功能开发不得修改 Blueprint。

# 十二、重构与 Diff 控制

重构应解决真实问题，而非追求代码"更漂亮"。

**允许**：提高可读性、降低耦合、减少重复、增强可维护性。
**不建议**：统一代码风格、修改无关命名、调整目录层级、顺手优化无关模块。

一次提交只完成一件事情（如新增专题页、修复搜索、优化卡片布局），不混合多个目标。修改范围尽可能小，保持文件结构、代码顺序、注释、命名稳定。不得同时进行重构、新增功能和修复 Bug。

# 十三、禁止事项（Hard Rules）

- **禁止修改无关代码**：不得因"顺便""一起""统一"而修改无关内容。
- **禁止重复实现**：已有能力不得重新实现，优先抽取、复用、扩展。
- **禁止破坏设计语言**：不得新增与 Design System 不一致的布局、组件、交互、视觉风格。
- **禁止破坏内容模型**：不得绕过 Content Model、新增临时 Frontmatter、修改 Slug。
- **禁止增加技术债务**：不得增加临时代码、保留 TODO、保留废弃实现、保留未使用文件。

# 十四、AI 协作规范

AI 是项目协作者，不是架构设计者。默认保持项目稳定。

- **修改前**：理解需求、阅读相关 Blueprint、确认影响范围、评估是否已有实现。不得直接开始编码。
- **修改中**：优先最小修改、保持一致、复用已有能力。不要主动进行代码美化、目录整理、命名统一、风格统一。
- **修改后**：检查是否符合 Design System、Information Architecture、Content Model 和工程规范。运行验证命令（见 `AGENTS.md` 验证命令表），确保没有引入无关修改。

### 修改后自检清单

- [ ] 运行 `pnpm astro check` 通过（无类型错误）
- [ ] 运行 `pnpm run lint` 通过（无 lint 错误）
- [ ] 运行 `pnpm run build` 成功
- [ ] 新增/修改的 Frontmatter 符合 Content Model（`02` §5）
- [ ] 新增/修改的页面符合 Information Architecture（`01`）
- [ ] 新增/修改的组件遵循 Design System（`05` §9）和 Token（`07`）
- [ ] 新增/修改的页面有 title 和 description（`08` §10）
- [ ] 未引入无关修改（仅修改与任务直接相关的文件）

# 十五、工程决策快速参考

> 通用原则见 `00-overview` §原则与理念，优先级规则见 `AGENTS.md`。以下为工程场景的决策索引。

| 场景 | 参考章节 |
|------|---------|
| 面对重构时 | §四修改原则、§十二重构与 Diff 控制 |
| 面对新增功能时 | §九新增功能规范 |
| 面对样式修改时 | §八样式规范、`07` Design Tokens |
| 面对内容模型修改时 | §十内容模型约束、`02` Content Model |
| 面对 Blueprint 修改时 | §十一 Blueprint 修改规范 |
| 判断是否违规时 | §十三禁止事项 |
| AI 协作自检时 | §十四 AI 协作规范 |
