module.exports = {
    lintOnSave: false,// 这里禁止使用eslint-loader
    // publicPath: './admin/',
    // outputDir: { dist },
    // assetsDir: 'static',
    optimizeDeps: {
        include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
    },
}
