<template>
  <button @click="todo">{{ row._edit ? 'Done' : 'Edit' }}</button>
</template>

<script>
export default {
  props: ['row', 'column'],

  methods: {
    todo () {
      this.$emit('row-edit', this.row)
      this.$set(this.row, '_edit', !this.row._edit)
    }
  }
}
</script>

