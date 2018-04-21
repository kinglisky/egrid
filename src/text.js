
export default {
  functional: true,
  props: ['row', 'col', 'column'],
  render (h, { props: { row, col }, _v: text }) {
    const { formater } = col
    const v = formater && formater(row, col) || row[col.prop]
    // 解决 umd 打包 text 渲染不出来的问题，需要转成 Vnode
    return text && text(v) || v
  }
}
