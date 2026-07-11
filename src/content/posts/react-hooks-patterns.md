---
author: Zhewen
pubDatetime: 2026-02-01T16:00:00Z
modDatetime: 2026-02-01T16:00:00Z
title: "React Hooks 进阶模式"
description: 深入探讨 React Hooks 的高级使用模式，包括自定义 Hooks、性能优化和常见陷阱。
featured: true
draft: false
tags:
  - React
  - Hooks
  - 前端
readingTime: "12 min read"
---

React Hooks 彻底改变了我们编写 React 组件的方式。本文将探讨一些进阶模式和最佳实践。

## 自定义 Hooks

### useLocalStorage

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### useDebounce

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

## 性能优化

### useMemo 和 useCallback

```typescript
// ✅ 缓存计算结果
const sortedData = useMemo(() => {
  return data.sort((a, b) => b.score - a.score);
}, [data]);

// ✅ 缓存回调函数
const handleSubmit = useCallback(
  (values: FormValues) => {
    submitForm(values);
  },
  [submitForm]
);
```

### useRef 的正确使用

```typescript
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

## 常见陷阱

### 1. 依赖项不完整

```typescript
// ❌ 错误
useEffect(() => {
  fetchData(userId);
}, []); // 缺少 userId

// ✅ 正确
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### 2. 闭包陷阱

```typescript
// ❌ 错误
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // 永远是初始值
  }, 1000);
  return () => clearInterval(timer);
}, []);

// ✅ 正确
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1); // 使用函数式更新
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

## 总结

掌握这些进阶模式后，你可以编写出更优雅、更高效的 React 代码。记住 Hooks 的核心原则：只在最顶层调用，只在 React 函数中调用。
