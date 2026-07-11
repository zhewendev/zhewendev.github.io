## ADDED Requirements

### Requirement: 四列布局
Footer SHALL 展示四列布局：导航、资源、联系、订阅更新。

#### Scenario: 四列内容展示
- **WHEN** 用户滚动到页面底部
- **THEN** Footer 展示四列内容
- **AND** 导航列包含：首页、文章、专题、随想、关于
- **AND** 资源列包含：RSS 订阅、Sitemap、标签、分类、存档
- **AND** 联系列包含：GitHub、Email、微信公众号
- **AND** 订阅列包含邮箱输入框和订阅按钮（置灰禁用）

### Requirement: 社交图标行
Footer SHALL 展示社交图标行。

#### Scenario: 社交图标展示
- **WHEN** 用户查看 Footer
- **THEN** 展示 8 个社交图标：GitHub、小红书、微信公众号、抖音、知乎、哔哩哔哩、Email、RSS
- **AND** 点击图标跳转到对应平台链接

### Requirement: 版权信息
Footer SHALL 展示版权信息行。

#### Scenario: 版权信息展示
- **WHEN** 用户查看 Footer 底部
- **THEN** 展示：© 2024 XiaoYu · 粤ICP 备 · RSS · Sitemap
