const webpack = require("webpack");
module.exports = {
  // 服务
  devServer: {
	  host: '0.0.0.0',
	  port: 8080,
	  https: false,
	  hotOnly: false,
	  proxy: null, // 设置代理
	  before: app => {}
  },
  // 静态资源统一放在public目录下 调用静态资源全部用绝对地址 唯一的弊端 打包名固定
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dist/'
    : '/',
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: './static',
  
    chainWebpack: config => {
      const svgRule = config.module.rule('svg')
  
      // 清除已有的所有 loader。
      // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
      svgRule.uses.clear()
  
      // 添加要替换的 loader
      svgRule
      .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
              symbolId: 'icon-[name]'
              })
    }
}
