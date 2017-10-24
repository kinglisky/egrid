
export default {
  functional: true,
  props: ['row', 'col'],
  render (h, { props: { row, col } }) {
    return row[col.prop]
  }
}
