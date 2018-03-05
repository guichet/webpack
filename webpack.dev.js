const path = require('path');

const sassLintPlugin = require('sasslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: ['babel-polyfill', './src/index.js'],
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }, {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]?hash=[hash:20]',
                            limit: 8192
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new sassLintPlugin({
            context: 'src',
            glob: '**/*.s+(a|c)ss',
            ignorePlugins: ['extract-text-webpack-plugin', 'html-webpack-plugin']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        })
    ]
};
