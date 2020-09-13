'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

// 字体适配 rem
// const px2rem = require("postcss-px2rem");
// const postcss = px2rem({
//     remUnit: 192 //1920px
// });
// css: {
//     // 添加postcss配置
//     loaderOptions: {
//         postcss: {
//             plugins: [postcss]
//         }
//     }
// },
// 配置 @
function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || '我的系统<动态路由>'

const port = process.env.port || process.env.npm_config_port || 80 // 端口

// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
    // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: process.env.NODE_ENV === 'development',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // webpack-dev-server 相关配置
    lintOnSave: false,
    devServer: {
        host: 'localhost',
        port: port,
        open: true,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: `http://www.web-jshtml.cn/productapi/token`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true,

    },
    /** vue3.0内置了webpack所有东西，
     * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     **/
    chainWebpack: (config) => {
        const  svgRule  =  config.module.rule("svg");     
        svgRule.uses.clear();     
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({ 
                symbolId:   "icon-[name]",
                include:  ["./src/icons"] 
            });
    },
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.json', '.vue'], // 自动添加文件名后缀
            alias: {
                'vue': 'vue/dist/vue.js',
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components')
            }
        }
    },

}