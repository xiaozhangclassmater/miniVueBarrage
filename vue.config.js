const { defineConfig } = require('@vue/cli-service')
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = defineConfig({
  publicPath: './',
  outputDir: path.resolve(__dirname, './lib'),
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack(config) {
    config.plugins.delete('html')
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
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'miniVueBarrage',
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        isProduction ? new TerserPlugin({
          terserOptions: {
            nameCache: true,
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log"] // 移除console
            },
            output: {
              beautify: true, // 压缩注释
              comments: false,
            }
          }
        }
        ) : {}
      ]
    },
    externals: {
      'vue': 'Vue',
    },

    plugins: [
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),

      isProduction && new CopyWebpackPlugin({
        patterns: [
          {
            from: './package.json',
            to: resolve('./lib/package.json'),
          }
        ]
      })
    ]
  }
})
