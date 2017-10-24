# Egrid

## 基于 `Element-UI` `Table` 组件分装的高阶表格组件。

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

!> `egrid` 只依赖 `Element` 中的 `Table` 与 `TableColumn` 组件不会将整个 `Element` 导入。
但不包含样式，`Table` 的样式需要用户手动引入。

使用：

```javascript
import Vue from 'vue'
import Egrid from 'egrid'

// table 的样式需要手动引入
import 'element-ui/lib/theme-default/table.css'
import 'element-ui/lib/theme-default/table-column.css'

Vue.use(Egrid)
```