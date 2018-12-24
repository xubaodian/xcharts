const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index:  path.resolve(__dirname, '../demo/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'bundle.js'
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    hot: true,//热重载
    contentBase: './lib', // since we use CopyWebpackPlugin.
    compress: true,//启用gzip压缩
    host: '127.0.0.1',
    port: 20000,  //端口号
    open: true,  //自动打开浏览器
    overlay: false,
    publicPath: '/',
    proxy: {},  //代理地址
    quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。使用FriendlyErrorsPlugin插件时，设置为true
    watchOptions: { //监视文件是否有改动，也可改为定期轮询文件
      poll: false,
    }
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
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
     //热重载
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NamedModulesPlugin(),
     //处理html
     new HtmlWebpackPlugin({
       filename: 'index.html',
       template: './demo/index.html',
       inject: true
     }),
     new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:20000`],
      }
    })
  ]
};