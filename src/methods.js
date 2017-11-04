export default {
  methods: {
    trigger (method, ...args) {
      const { $refs: { grid } } = this
      if (grid && grid[method]) {
        grid[method](...args)
      }
    },

    toggleRowSelection (...args) {
      this.trigger('toggleRowSelection', ...args)
    },

    toggleRowExpansion (...args) {
      this.trigger('toggleRowExpansion', ...args)
    },

    setCurrentRow (...args) {
      this.trigger('setCurrentRow', ...args)
    },

    clearSort () {
      this.trigger('clearSort')
    },

    clearFilter () {
      this.trigger('clearFilter')
    },

    clearSelection (...args) {
      this.trigger('clearSelection', ...args)
    }
  }
}
