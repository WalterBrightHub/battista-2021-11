const fs=require('fs')
module.exports = {
  publicPath:'./',
  // filenameHashing: false,
  
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '国服巴蒂特赛小助手'
        return args
      })
  }
}

