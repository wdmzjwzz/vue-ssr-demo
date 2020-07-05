
const isProduction = process.env.NODE_ENV === 'production'
const { resolve, join } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfig = {
    output: {
        path: join(__dirname, "../dist"),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // 重要：使用 vue-style-loader 替代 style-loader
                use: ['vue-style-loader', 'css-loader']
            },
            { test: /\.less$/, use: ['vue-style-loader', 'css-loader', 'less-loader'] },
            { test: /\.(jpg|png|jpeg|gif)$/, use: ["file-loader"] }


        ]
    },
    watch: true,
    externals: {
        jquery: 'jQuery',
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    }

}
module.exports = webpackConfig