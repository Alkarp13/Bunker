const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    entry: {
        main: path.resolve(__dirname, 'src/input.js'),
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
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
                    'style-loader',
                    'css-loader'
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