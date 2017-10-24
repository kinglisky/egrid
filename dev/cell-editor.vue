<template>
  <div>
    <input
      v-show="row._edit" type="text"
      v-model="row[column.property]">
    <span v-show="!row._edit">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ['row', 'column'],

  computed: {
    text () {
      return this.row[this.column.property]
    }
  }
}
</script>

