# Egrid

### 基于 `Element-UI` `Table` 组件封装的高阶表格组件，可无缝支持 element 的 table 组件。

element 升级到了 2.0 了， 不用担心可以无缝升级的~

文档 [http://kinglisky.github.io/egrid](http://kinglisky.github.io/egrid)


### 开发

> `npm run dev`

> `npm run build`

> `npm run doc`


### 使用

安装 Element：

> `npm i element-ui -S`

安装 egrid:

> `npm i egrid -S`

`egrid` 只依赖 `Element` 中的 `Table` 与 `TableColumn` 组件不会将整个 `Element` 导入。
但不包含样式，`Table` 的样式需要用户手动引入。

使用：
```javascript
import Vue from 'vue'
import Egrid from 'egrid'

// table 的样式需要手动引入
import 'element-ui/lib/theme-default/icon.css'
import 'element-ui/lib/theme-default/table.css'
import 'element-ui/lib/theme-default/table-column.css'





Vue.use(Egrid)
```

为什么要在 element table 组价之上再封装一层呢？

平时我们使用的 element table 时候往往是这样写的：

```html
<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
```

如果每次使用表格都要重复这一段代码，那久而久之你的项目肯定会冗余很多重复的代码，而且也不利于维护。
这时候我们就有必要在原始的表格组件基础上再封装一层，将这些重复的代码放在组件内部，使用时考虑如何通过一种配置的方式去定制表格。

`egrid` 就是为此而生的，少写两行是两行。耶~~~


