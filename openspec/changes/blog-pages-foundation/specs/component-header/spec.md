## ADDED Requirements

### Requirement: 导航栏布局
Header SHALL 展示 Logo、站点名、一级导航、右侧功能图标。

#### Scenario: 导航项展示
- **WHEN** 用户访问任意页面
- **THEN** Header 展示 6 个一级导航项：文章、专题、收藏、随想、关于
- **AND** 右侧展示搜索图标、主题切换按钮

### Requirement: 收藏下拉菜单
Header 的「收藏」导航项 SHALL 支持下拉菜单展示子选项。

#### Scenario: 下拉菜单展开
- **WHEN** 用户在桌面端 hover 或点击「收藏」导航项
- **THEN** 展开下拉菜单显示「书籍收藏」「工具收藏」选项
- **WHEN** 用户点击「书籍收藏」
- **THEN** 跳转到 `/books/` 页面
- **WHEN** 用户点击「工具收藏」
- **THEN** 跳转到 `/tools/` 页面

### Requirement: 搜索入口
Header SHALL 提供搜索入口。

#### Scenario: 搜索图标点击
- **WHEN** 用户点击搜索图标
- **THEN** 展开搜索输入框或跳转到搜索页面
