const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.js').default
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require("path");
module.exports = merge(baseConfig, {
    // 将 entry 指向应用程序的 server entry 文件
    entry: path.join(__dirname, "../src/entry-server.js"),

    target: 'node',

    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',

    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        filename:"server/[name].bundle.js",
        libraryTarget: 'commonjs2'
    },

    
    externals: nodeExternals({

        whitelist: /\.css$/
    }),

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin()
    ]
})