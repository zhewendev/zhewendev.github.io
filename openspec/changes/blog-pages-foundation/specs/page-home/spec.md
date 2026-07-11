## ADDED Requirements

### Requirement: Hero 首屏区
首页 SHALL 展示 Hero 首屏区，包含背景图、主标题、副标题和 CTA 按钮。

#### Scenario: Hero 背景轮换
- **WHEN** 用户访问首页
- **THEN** Hero 背景图从配置的多张图片中随机选择一张展示

#### Scenario: CTA 按钮跳转
- **WHEN** 用户点击「阅读文章」按钮
- **THEN** 跳转到 `/articles/` 页面
- **WHEN** 用户点击「关于我」按钮
- **THEN** 跳转到 `/about/` 页面

### Requirement: 最新文章列表
首页 SHALL 在左栏展示最新文章列表，支持分页。

#### Scenario: 文章列表展示
- **WHEN** 用户访问首页
- **THEN** 展示最多 10 篇最新文章（默认 5 篇）
- **AND** 每篇文章显示缩略图、标题、标签、摘要

#### Scenario: 首页内分页
- **WHEN** 用户点击分页器页码
- **THEN** 文章列表更新显示对应页面内容（不跳转新页面）

#### Scenario: 移动端查看全部
- **WHEN** 用户在移动端访问首页
- **THEN** 分页器替换为「查看全部 →」链接
- **WHEN** 用户点击该链接
- **THEN** 跳转到 `/articles/` 页面

### Requirement: 右侧边栏
首页 SHALL 在右栏展示专题推荐、最近收藏、最近随想。

#### Scenario: 专题推荐展示
- **WHEN** 用户访问首页
- **THEN** 右栏展示 3 个专题推荐（支持配置排序规则）

#### Scenario: 最近收藏展示
- **WHEN** 用户访问首页
- **THEN** 右栏展示最多 3 本最近添加的书籍（简洁列表样式）

#### Scenario: 最近随想展示
- **WHEN** 用户访问首页
- **THEN** 右栏展示最多 3 条最近随想（简洁列表：日期 + 内容前 N 字）

### Requirement: 响应式布局
首页 SHALL 支持响应式布局切换。

#### Scenario: 桌面端双栏布局
- **WHEN** 用户在桌面端（≥1024px）访问首页
- **THEN** 展示双栏布局（左 2/3 + 右 1/3）

#### Scenario: 移动端单栏布局
- **WHEN** 用户在移动端（<1024px）访问首页
- **THEN** 展示单栏布局，右栏内容移至左栏下方
