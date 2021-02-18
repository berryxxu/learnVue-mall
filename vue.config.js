
module.exports = {
  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        // router只在main.js中使用（组件用this.$router)，store也不需要（组件用this.$store）
      }
    }
  }
}