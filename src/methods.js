const METHOD_NAMES = [
  "setCurrentRow",
  "toggleRowSelection",
  "toggleRowExpansion",
  "clearSelection",
  "clearFilter",
  "clearSort",
  "doLayout",
  "sort"
]

const methods = {}

METHOD_NAMES.forEach(name => {
  methods[name] = function (...args) {
      const { grid } = this.$refs
      if (grid && grid[name]) { 
          grid[name](...args)
      }
  }
})

export default { methods }
