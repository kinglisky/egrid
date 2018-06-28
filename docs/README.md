# Egrid

基于 `Element-UI` `Table` 组件封装的高阶表格组件，可无缝支持 element 的 table 组件。

min 文件仅 3.8 kb。实现比较简单，源码在这： [https://github.com/kinglisky/egrid](https://github.com/kinglisky/egrid)

element 升级到了 2.0 了， 不用担心可以直接用。

首先组件依赖 `Element Table`，先要安装 Element：

> `npm i element-ui -S`

安装 egrid:

> `npm i egrid -S`

!> `egrid` 只依赖 `Element` 中的 `Table` 与 `TableColumn` 组件不会将整个 `Element` 导入。
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

在线栗子🌰 ：
<iframe width="100%" height="400"
  src="//jsfiddle.net/nlush/yr0uf0fm/98/embedded/result,html,js,css/" allowfullscreen="allowfullscreen" frameborder="0">
</iframe>

先创建表格中使用的自定义组件：

`cell-btn.vue`
```html
<template>
  <button @click="todo">{{ row._edit ? 'Done' : 'Edit' }}</button>
</template>

<script>
export default {
  props: ['row', 'col'],

  methods: {
    todo () {
      this.$emit('row-editor', this.row)
      this.$set(this.row, '_edit', !this.row._edit)
    }
  }
}
</script>
```

`cell-editor.vue`
```html
<template>
  <div>
    <input
      v-show="row._edit" type="text"
      v-model="row[col.prop]">
    <span v-show="!row._edit">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ['row', 'col'],

  computed: {
    text () {
      return this.row[this.col.prop]
    }
  }
}
</script>
```

使用 `egrid`:

```html
<template>
  <egrid border
    max-height="500"
    column-type="selection"
    :data="data"
    :columns="columns"
    :columns-schema="columnsSchema"
    :columns-props="columnsProps"
    :columns-handler="columnsHandler"
    @selection-change="selectionChange">
  </egrid>
</template>

<script>
import Data from './data'
import Btn from './cell-btn.vue'
import Editor from './cell-editor.vue'

export default {
  data () {
    return {
      data: Data.data,
      columns: Data.columns,
      // columnsProps 用于定义 columns 公共的属性
      columnsProps: {
        width: 120,
        sortable: true,
        // 定义表格列如何渲染
        component: Editor
      },

      // columnsSchema 可以用来单独定义 columns 的某一列，这里的设置会覆盖 columnsProps 的配置属性
      columnsSchema: {
        '地址': {
          width: 'auto',
          // propsHandler 可用于转换传给自定义组件的 props 这里将 props 变成了 address
          propsHandler ({ col, row }) {
            return { address: row[col.prop] }
          },
          // 这里的 props 是 address
          component: Vue.extend({
            props: ['address'],
            render (h) {
              return h('span', {
                style: { color: '#20A0FF' }
              }, this.address)
            }
          })
        }
      }
    }
  },

  methods: {
    // columnsHandler 可用于在现有的 columns 进行操作，对 columns 进行增删改，这里新增了操作列
    columnsHandler (cols) {
      return cols.concat({
        label: '操作',
        align: 'left',
        component: Btn,
        // listeners 可用于监听自定义组件内部 $emit 出的事件
        listeners: {
          'row-edit' (row) {
            console.log('row-edit', row)
          }
        }
      })
    },

    selectionChange (rows) {
      console.log('selected', rows)
    }
  }
}
</script>
```


# Attributes

!> `egrid` 只是在 `Element Table` 封装了一层，原本设置在 `Table` 上的 `props` 与事件监听可直接设置到 `egrid` 上，如：`height` `max-height` `border` `@selection-change`......具体配置可参考[Element Tabel 文档](http://element.eleme.io/#/zh-CN/component/table#table-attributes)

| 属性   | 说明 | 可选项 | 默认 |
| ---   | ---- | --- | --- |
| `data` | `Array` table 的 data 属性 | - | `[]` |
| `columns` | `Array` 用于控制表格列渲染 | - | `[]` | 
| `column-type` | `[String, Array]` 映射到 `Element Table-column` 的 `type` 属性，用于支持功能特殊的功能列（多选、索引、折叠行），不设置则不显示功能列 | `selection/index/expand` | - |
| `column-key-map` | `Object` 用于映射 `Table-column` 中 `label` 与 `prop` 值对应的 key | - | `{ label: 'label', prop: 'prop' }` |
| `columns-props` | `Object` 用于定义所有 `columns` 公共的 `Element Table-column` 属性  | - | - |
| `columns-schema` | `Object` 可以用来单独定义 `columns` 的某一列，这里的设置会覆盖 `columnsProps` 的配置属性 <br> 使用 `Element Table-column` 中 `label` 值进行匹配 | - | - |
| `columns-handler` | `Function` 可用于在现有的 `columns` 进行操作，对 `columns` 进行增删改操作。 | - | - |
| `slot-append` | `Boolean` 是否使用 `Element Table` 的 `slot="append"` | `true/false` | `false` |


> columns 配置

columns 用于控制表格的列行为，使用时一般会设置成：

```javascript
const columns = [
  {
    label: '日期',
    prop: 'date',
    width: 100
    ...
  },
  {
    label: '姓名',
    prop: 'name',
    minWidth: 100
    ...
  },
  {
    label: '其他',
    component: Btn, // 'el-button'
    listeners: {
      'custom-event' (data) {
        console.log('custom-event', data)
      }
    },
    propsHandler: function ({ row, col, column }) {
      return { row, col, column }
    }
    ......
  }
  ......
]
```

`columns` 中每项的配置项其实就是 `Element Table-column` 上的 `props` 属性，具体的属性设置可以参考 [Element Table-column 文档](http://element.eleme.io/#/zh-CN/component/table#table-column-attributes)。

在此基础上 `columns` 新增了 `component` `listeners` `propsHandler` 配置属性。当然你也可以自定义一些其他的属性附加到 `columns` 上以便后期自定组件中使用，例如附加一些处理函数传递给自定义组件使用。

`component`
用于配置当前列渲染用的自定义组件，内部使用 `<component>` 实现的，component 的值可以是：`string | ComponentDefinition | ComponentConstructor` 具体参考 [<component> 组件文档](https://cn.vuejs.org/v2/api/#component)


`listeners`
用于监听 `component` 配置的自定义渲染组件内部 `$emit` 出的事件，这里使用 Vue 2.4 引入 `v-on` [新语法](https://cn.vuejs.org/v2/api/#v-on)，可直接为 `v-on` 绑定一个对象，如：
```javascrip
v-on="{ 'custom-event': function (data) {...} }"
```

`propsHandler`

用于转化 `egrid` 组件内部附加 `<component>` 上的 props 。默认的附加在 `<component>` 上的 props 是：

```html
<component v-bind="{ row, col, column }" :is="col.component"></component>
```

可通过 `propsHandler` 对 `{ row, col, column }`  进行转化你想要的形式：

```javascript
propsHandler({ row, col, column })

// 转化成 =>

{
  msg: row[col.prop],
  handler (data) {
    console.log('handler:', data)
  }
}

```
> columns-props 配置

`columns-props` 配置用于定义 `columns` 各列默认的 props 属性。如所有的列默认都**居左对齐**，**不支持排序**，我们可以将 columns-props 设置成：

```javascript
{
  align: 'left',
  sortable: false
}
```
如需要为某些列单独定义显示行为可以通过 `columns-schema` 进行单独配置。

> columns-schema 配置

`columns-schema` 主要用于单独定义某一列的行为。

```javascript
{
  '地址': {
    width: 300,
    sortable: false,
    ...
    component: CustomComponent
  }
}

```

`columns-schema` 是通过 columns 每列的 `label` 属性值来匹配的。这里的配置属性会覆盖 `columns-props` 与 `columns` 设置的对应的列的属性值。

!> 覆盖的优先级为 `columns-schema` > `columns` > `columns-props`

> columns-handler 配置

`columns-handler` 处理函数可以对已有的 `columns` 进行增删改操作，常见的用法就是为，`columns` 新增一个自定义的操作列：

```javascript
// :columns-handler="columnsHandler"
columnsHandler (cols) {
  return cols.concat({
    label: '操作',
    align: 'left',
    sortable: false,
    ...
    component: OperatComponent,
  })
}
```
> column-type 配置

映射到 `Element Table-column` 的 `type` 属性，用于特殊的功能列的功能，不设置则不显示功能列。

* `selection`： 多选支持

* `index`： 编号索引

* `expand`： 表格支持折叠展开行 

当 `column-type` 为 `expand` 时表格支持折叠展开行，此时可用通过 `slot (slot="expand")` 方式自定渲染折叠详情。

当 `column-type` 为数组时可设置多个特殊列，`['expand', 'index', 'selection']`，一般很少这样使用。

使用可参考下面的栗子🌰 ：

<iframe width="100%" height="600"
src="//jsfiddle.net/nlush/azr14zfs/45/embedded/result,html,js,css/"
allowfullscreen="allowfullscreen" frameborder="0">
</iframe>

> `column-key-map` 配置

考虑到 `columns` 中的 `label` 项与 `prop` 项对应的属性 key 不一定是 `label` 与 `prop`，这时可以通过 `column-key-map` 做个映射。



# Methods

```javascript
[
  'setCurrentRow',
  'toggleRowSelection',
  'toggleRowExpansion',
  'clearSelection',
  'clearFilter',
  'clearSort',
  'doLayout',
  'sort'
]
```

!> 直接代理一层原 `Element Table` 的方法。可参考[文档](http://element.eleme.io/#/zh-CN/component/table#table-methods)


# Slots

`append`：对应 `Element Table` 的 `slot="append"` [可参考文档](http://element.eleme.io/#/zh-CN/component/table#table-slot)，使用时注意设置 `slot-append` 为 `true`

`expand`： 当 `column-type` 为 `expand` 时使用，用于自定义折叠展开内容。



