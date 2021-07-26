module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,// 这里禁止使用eslint-loader
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@/assets/scss/style.scss";
        `
      },
      less: {
        // 自定义样式
        lessOptions: {
          modifyVars: {
            'primary-color': '#1da67a',
            'link-color': '#1da67a',
            'border-radius-base': '20px',
          }
        },
        // modifyVars: style.default,
        javascriptEnabled: true
      }
    }
  }
}