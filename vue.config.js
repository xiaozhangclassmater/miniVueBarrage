const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = defineConfig({
  publicPath: './',
  outputDir: path.resolve(__dirname, './dist/lib'),
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack(config) {
    isProduction && config.plugins.delete('html')  // 删除HTMLPlugin
    isProduction && config.plugins.delete('copy')
  },
  css: {
    extract: {
      filename: isProduction ? 'mini-vue-barrage.css' : '[name].css',
      chunkFilename: '[name].css',
    },
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-preset-env')({
              browsers: [
                "defaults",
                "not ie < 11", // 版本不小于 ie 11的 
                "last 2 versions", //并且他的前两个版本
                "> 1%",// 将市场份额大于1%的浏览器
                "iOS 7",// ios大于 7 
                "last 3 iOS versions" // ios的前三版本
              ]
            })
          ]
        }
      }
    }


  },
  configureWebpack: {
    entry: isProduction ? './package/index.js' : './src/main.js',
    output: {
      filename: isProduction ? 'index.js' : '[name].js',
      library: {
        name: 'miniVueBarrage',
        type: 'umd'
      },
    },

    plugins: [
      isProduction && new CopyWebpackPlugin({
        patterns: [
          {
            from: './package/package.json',
            to: resolve('./dist/package.json'),
          },
          {
            from: './README.md',
            to: resolve('./dist/README.md'),
          }
        ]
      })
    ]
  }
})
