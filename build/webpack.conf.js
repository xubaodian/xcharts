const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index:  path.resolve(__dirname, '../src/xcharts.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'xchart.min.js',
    //接口暴露变量名称
    library: {
      root: "xcharts",
      amd: "xcharts",
      commonjs: "xcharts"
    },
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        } 
      }
    ]
  }
};