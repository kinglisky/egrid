export default {
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
  }
}
