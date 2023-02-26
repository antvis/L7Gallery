---
title: 数据服务
nav:
  order: 2
---

## 简介

数据服务托管在 npm 上，并且采用 pbf 数据格式进行编码压缩，减少数据量。数据解码需要安装 geobuf、Pbf 模块

### 数据服务

```ts
`https://unpkg.com/xingzhengqu@${version}/data/${level}.pbf`;
```

### 数据获取

```ts
const url = 'https://unpkg.com/xingzhengqu@2023/data/country.pbf`
fetch(url)
  .then((response) => response.arrayBuffer())
  .then((data) => {
    // 数据解码为geojson
    const gejson = geobuf.decode(new Pbf(data));

  });

```
