---
title: SDK
nav:
  order: 1
---

## 简介

DistrictData SDK 通过前端 JS SDK 更好的使用行政区划，无需下载数据， 数据服务托管在 npm 服务器。

## 数据源介绍

### RDBSource

基于于权威的行政区划数据，制作的一套 2015 年-2022 年的长时间序列的、具有符合民政部属性的、开放获取的行政区划数据

### DataVSource

数据来自 dataV

## 安装

### npm 安装

```bash
npm i district-data

```

### cdn 引用

```html
<script href=''>

```

## 使用

### option

- version 数据版本

```ts
import { RDBSource } from 'district-data';
const source = new RDBSource({
  version: 2023,
});
```

### getdata(options)

- level 区划等级 `'country' | 'province'| 'city'| 'district'| 'jiuduanxian'`
- precision 数据精度 `'high' | 'middle' | 'low';` 可选

```ts
// 获取全国的数据
source.getData({
  level: 'country',
});
```

```ts
// 获取全国省级数据
source.getData({
  level: 'province',
});
```

### getChildrenData(options)

下钻场景使用

- adcode 当前 adcode
- level 当前 层级
- childrenLevel 子层级
- precision

### getParentData(options)

上卷场景使用

- level 当前层级
- parentLevel 父级层级
- parentAdcode 父级 adcode
