module.exports = {
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.svg.pure$/,
        loader: 'vue-svg-loader'
      }]
    }
  }
}
