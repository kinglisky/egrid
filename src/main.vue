<template>
  <el-table ref="grid"
   :data="data"
    v-bind="tableBind"
    v-on="$listeners">
    <template v-for="tp in columnTypes">
      <el-table-column :key="tp" type="expand" v-if="tp === 'expand'">
        <template slot-scope="props">
          <slot name="expand" v-bind="props"></slot>
        </template>
      </el-table-column>
      <el-table-column :key="tp" v-else :type="tp"></el-table-column>
    </template>
    <el-table-column v-for="col in renderColumns"
      :key="col.label" v-bind="getColBind(col)">
      <template slot-scope="scope">
        <component :is="col.component"
          v-bind="getCptBind(scope, col)"
          v-on="col.listeners">
        </component>
      </template>
    </el-table-column>
    <template v-if="slotAppend" slot="append">
      <slot name="append"></slot>
    </template>
  </el-table>
</template>

<script>
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'
import Text from './text'

const BOOLEAN_KEYS = [
  'fit',
  'stripe',
  'border',
  'show-header',
  'highlight-current-row',
  'default-expand-all',
  'show-summary'
]

const COLUMN_PROPS = {
  align: 'left',
  component: Text
}

export default {
  name: 'Egrid',

  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },

    columns: {
      type: Array,
      default () {
        return []
      }
    },

    columnType: [String, Array],

    columnProps: Object,

    columnSchema: Object,

    columnHandler: Function,

    slotAppend: Boolean
  },

  computed: {
    showSelectionIndex () {
      return this.columnType === 'selection' || this.columnType === 'index'
    },

    // 处理 $attrs 里面 Boolean 类型的 prop 和，统一 prop 命名 
    tableBind () {
      const { $attrs } = this
      const bind = {}
      Object.keys($attrs).forEach(key => {
        const v = $attrs[key]
        const uniformKey = key.replace(/([A-Z])/, '-$1').toLowerCase()
        bind[key] = ~BOOLEAN_KEYS.indexOf(uniformKey) && v === '' ? true : v
      })
      return bind
    },

    renderColumns () {
      const {
        columns,
        columnHandler,
        columnProps: props,
        columnSchema: schema
      } = this
      const renderColumns = columns.map(col => {
        const mix = schema && schema[col.label] || {}
        return Object.assign({}, COLUMN_PROPS, props, col, mix)
      })
      return columnHandler && columnHandler(renderColumns) || renderColumns
    },

    columnTypes () {
      const type = this.columnType
      if (!type) return []
      if (typeof type === 'string') {
        return [type]
      }
      return  Array.isArray(type) ? type : []
    }
  },

  methods: {
    getColBind (col) {
      const bind = Object.assign({}, col)
      delete bind.component
      delete bind.listeners
      delete bind.propsHandler
      return bind
    },

    getCptBind ({ row, column }, col) {
      const props = { row, col, column }
      const handler = col.propsHandler
      return handler && handler(props) || props
    },

    trigger (method, ...args) {
      const { $refs: { grid } } = this
      if (grid && grid[method]) {
        grid[method](...args)
      }
    },

    clearSelection (...args) {
      this.trigger('clearSelection', ...args)
    },

    toggleRowSelection (...args) {
      this.trigger('toggleRowSelection', ...args)
    },

    setCurrentRow (...args) {
      this.trigger('setCurrentRow', ...args)
    },

    clearSort () {
      this.trigger('clearSort')
    },

    clearFilter () {
      this.trigger('clearFilter')
    }
    
  },

  components: {
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn
  }
}
</script>
