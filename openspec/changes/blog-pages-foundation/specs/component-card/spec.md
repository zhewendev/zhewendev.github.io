## ADDED Requirements

### Requirement: 文章卡片
ArticleCard SHALL 展示文章基本信息。

#### Scenario: 文章卡片结构
- **WHEN** 文章卡片渲染
- **THEN** 展示：左侧缩略图 + 右侧标题、标签、摘要
- **AND** 缩略图使用 Frontmatter heroImage，无则使用默认占位图

### Requirement: 专题卡片
SeriesCard SHALL 展示专题信息。

#### Scenario: 专题卡片结构（列表页）
- **WHEN** 专题卡片在列表页渲染
- **THEN** 展示：封面图 + 专题名称 + 文章数

#### Scenario: 专题小卡片（首页侧边栏）
- **WHEN** 专题卡片在首页侧边栏渲染
- **THEN** 展示：缩略图 + 专题名称（紧凑样式）

### Requirement: 书籍卡片
BookCard SHALL 展示书籍信息。

#### Scenario: 书籍卡片结构
- **WHEN** 书籍卡片渲染
- **THEN** 展示：左侧封面图 + 右侧书名、作者、评分、简介、阅读状态 Badge

### Requirement: 工具卡片
ToolCard SHALL 展示工具信息。

#### Scenario: 工具卡片结构
- **WHEN** 工具卡片渲染
- **THEN** 展示：左侧图标 + 右侧工具名、分类、简介、推荐状态 Badge
