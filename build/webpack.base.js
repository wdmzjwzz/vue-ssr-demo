
const isProduction = process.env.NODE_ENV === 'production'
const { resolve, join } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = {
    output: {
        path: join(__dirname, "../dist"),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: false
        })
    ],
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    }

}
module.exports = webpackConfig