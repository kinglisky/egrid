
export default {
  functional: true,
  props: ['row', 'col', 'column'],
  render (h, { props: { row, col } }) {
    const { formater } = col
    return formater && formater(row, col) || row[col.prop]
  }
}
