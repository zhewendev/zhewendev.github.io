---
author: Zhewen
pubDatetime: 2026-02-05T11:00:00Z
modDatetime: 2026-02-05T11:00:00Z
title: "《代码整洁之道》读书笔记"
description: 阅读 Robert C. Martin 的经典之作《Clean Code》的笔记和思考，分享如何编写更优雅的代码。
featured: false
draft: false
tags:
  - 读书笔记
  - 编程规范
  - 软件工程
readingTime: "15 min read"
---

《代码整洁之道》（Clean Code）是 Robert C. Martin（Bob 大叔）的经典之作。这本书虽然出版于 2008 年，但其中的原则至今仍然适用。

## 什么是整洁的代码？

> "整洁的代码简单直接。整洁的代码读起来像写得很好的散文。整洁的代码永远不会掩盖设计者的意图，而是充满了清晰的抽象和直接的控制流。" —— Grady Booch

### 核心特征

1. **优雅** - 代码应该让人愉悦
2. **高效** - 不做无用功
3. **直接** - 意图明确
4. **没有重复** - DRY 原则
5. **关注细节** - 处理所有错误

## 有意义的命名

### 名副其实

```typescript
// ❌ 糟糕
const d = new Date().getDay();

// ✅ 好
const currentDayOfWeek = new Date().getDay();
```

### 避免误导

```typescript
// ❌ 糟糕 - accountList 不是列表
const accountList = new Map<string, Account>();

// ✅ 好
const accountsById = new Map<string, Account>();
```

### 使用可搜索的名称

```typescript
// ❌ 糟糕 - 魔法数字
if (status === 4) { ... }

// ✅ 好
const STATUS_COMPLETED = 4;
if (status === STATUS_COMPLETED) { ... }
```

## 函数

### 短小精悍

函数应该做一件事，做好这件事，只做这件事。

```typescript
// ❌ 糟糕 - 做了太多事情
function processUserData(user: User) {
  validateUser(user);
  saveToDatabase(user);
  sendWelcomeEmail(user);
  updateAnalytics(user);
}

// ✅ 好 - 每个函数只做一件事
function validateUser(user: User): ValidationResult { ... }
function saveUser(user: User): Promise<void> { ... }
function notifyNewUser(user: User): Promise<void> { ... }
```

### 参数数量

最理想的参数数量是零，其次是单参数，再次是双参数，应尽量避免三参数。

```typescript
// ✅ 理想
function getCurrentUser(): User { ... }

// ✅ 可接受
function findUserById(id: string): User { ... }

// ⚠️ 谨慎使用
function createUser(name: string, email: string, age: number): User { ... }

// ✅ 更好的做法
interface CreateUserInput {
  name: string;
  email: string;
  age: number;
}
function createUser(input: CreateUserInput): User { ... }
```

## 注释

> "别给糟糕的代码加注释——重新写吧。" —— Brian W. Kernighan

### 好的注释

- 法律信息
- 对意图的解释
- 警示
- TODO 注释

### 坏的注释

- 冗余注释
- 误导性注释
- 日志式注释
- 废话注释

## 错误处理

```typescript
// ❌ 使用返回码
const result = deletePage(page);
if (result === 'E_OK') { ... }

// ✅ 使用异常
try {
  deletePage(page);
} catch (error) {
  logError(error);
}
```

## 单元测试

### 三条规则

1. 编写失败单元测试之前不要编写生产代码
2. 只编写恰好失败的单元测试
3. 只编写恰好能让失败测试通过的生产代码

### FIRST 原则

- **F**ast - 快速
- **I**ndependent - 独立
- **R**epeatable - 可重复
- **S**elf-validating - 自验证
- **T**imely - 及时

## 总结

整洁代码不是一蹴而就的，需要持续的练习和重构。记住：**代码是写给人看的，只是顺便让机器执行**。
