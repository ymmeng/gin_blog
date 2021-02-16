import colors from 'vuetify/lib/util/colors'

export default {
  primary: {
    base: "#abcdef",
    darken1: colors.purple.darken1,
  },
  secondary: colors.indigo,
  // 所有的键将生成主题样式,
  // 这里我们添加一个自定义的 `tertiary` 颜色
  tertiary: colors.pink.base,
}