const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    },
    entry: {
        main: path.resolve(__dirname, 'src/input.js')
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({filename: "[name].min.css"}),
        new FixStyleOnlyEntriesPlugin(),
        new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            filename: '../../templates/scripts.html',
            inject: false,
            templateContent: ({htmlWebpackPlugin}) => `
                ${htmlWebpackPlugin.tags.bodyTags}
            `
        }),
    ],
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /(\.tsx?)$/,
                loader: 'awesome-typescript-loader'
            },
            { 
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader?url=false'
                ]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './static/frontend/')
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
};