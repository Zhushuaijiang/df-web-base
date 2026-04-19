# Demo 工具类使用指南

> AI 维护文档时，必须使用以下工具类替代 inline style。

## 容器

```html
<div class="demo-frame demo-frame--h400">
  <df-xxx-layout>...</df-xxx-layout>
</div>
```

## 表单

```html
<div class="demo-form demo-form--3col">
  <div class="demo-field"><span class="demo-lbl">姓名</span><span class="demo-val"><b>【张三】</b></span></div>
  <div class="demo-field"><span class="demo-lbl">性别</span><span class="demo-val">男</span></div>
</div>
```

## 表格

```html
<table class="demo-tbl">
  <thead><tr><th>列1</th><th>列2</th></tr></thead>
  <tbody><tr><td>值1</td><td class="demo-cell--right">值2</td></tr></tbody>
</table>
```

## 标签

```html
<span class="demo-tag demo-tag--success">在院</span>
<span class="demo-tag demo-tag--info">医保</span>
<span class="demo-tag demo-tag--warning">草稿</span>
<span class="demo-tag demo-tag--danger">异常</span>
```

## 列表

```html
<div class="demo-list">
  <div class="demo-list-item" :class="{'demo-list-item--active': idx===0}">项目</div>
</div>
```

## 工具栏

```html
<div class="demo-toolbar">
  <label>筛选</label>
  <select>...</select>
</div>
```

## 空状态

```html
<div class="demo-empty">暂无数据</div>
```

## 文字

```html
<span class="demo-text--success">通过</span>
<span class="demo-text--danger">失败</span>
```
