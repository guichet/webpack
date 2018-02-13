const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const sassLintPlugin = require('sasslint-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const glob = require('glob')

module.exports = {
    entry: ['./assets/scripts/main.js', './assets/styles/main.scss'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: './scripts.js'
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.json', '.html'],
        modules: [path.join(__dirname, 'node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env'],
                    plugins: ["transform-object-assign", "transform-runtime"]
                }
            }
        ],
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'jshint-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'postcss-loader'],
                }))
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new sassLintPlugin({
            glob: 'assets/**/*.s+(a|c)ss',
            ignorePlugins: ['extract-text-webpack-plugin']
        }),
        new ExtractTextWebpackPlugin('styles.css'),
        new ImageminPlugin({
            externalImages: {
                context: 'assets/images',
                sources: glob.sync('assets/images/**/*'),
                destination: 'public/images'
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
    },
    devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeCSSAssets()
    )
}