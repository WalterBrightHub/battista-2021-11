const fs=require('fs')
module.exports = {
  publicPath:'./',
  // filenameHashing: false,
  
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '巴蒂斯塔特赛小助手'
        return args
      })
  }
}

