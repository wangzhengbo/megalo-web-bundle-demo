const { pagesEntry } = require('@megalo/entry')
const createMegaloTarget = require('@megalo/target')
const compiler = require('@megalo/template-compiler')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const _ = require('./util');
const path = require('path');

const cssLoaders = [
    MiniCssExtractPlugin.loader,
    'css-loader'
]

const platform = "web";

module.exports = {
    mode: 'development',

    entry: {
        'index': path.join(__dirname, `../src/web/entry.js`)
    },

    output: {
        path: _.resolve(`dist-web`),
        filename: '[name].js',
        publicPath: ``
    },

    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },

    devServer: {
        writeToDisk: true,
        open: true
    },

    devtool: 'cheap-source-map',

    resolve: {
        extensions: ['.vue', '.js', '.json', '.css', '.ts', '.tsx'],
        alias: {
            '@': _.resolve('src'),
            'assets': _.resolve('src/assets')
        },
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {}
                    }
                ]
            },

            {
                test: /\.js|\.tsx?$/,
                use: 'babel-loader'
            },

            {
                test: /\.css$/,
                use: cssLoaders
            },

            {
                test: /\.scss$/,
                use: [
                    ...cssLoaders,
                    'sass-loader',
                ]
            },

            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `./assets/css/[name].css`,
            publicPath: `../dist-${platform}`
        }),
        new CopyWebpackPlugin([{
            from: 'src/assets', to: 'assets',
            ignore: 'src/assets/html'
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/web/index.html'
        })
    ],

    stats: 'errors-only'
}

