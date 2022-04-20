const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin")

const cdn = {
  js: [
    'https://unpkg.com/vue@3.2.13/dist/vue.global.js',
    'https://unpkg.com/vue-router@4.0.3/dist/vue-router.global.js'
  ]
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new CompressionPlugin()]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 忽略生成环境打包的文件
      config.externals({
        'vue': 'Vue',
        'vue-router': 'VueRouter',
      })

      // 在html文件中引入相关CDN
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  }
})
