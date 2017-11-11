const webpack = require('webpack'),
    commonConfig = require('./webpack.common.js'),
    path = require('path'),
    merge = require('webpack-merge');

module.exports = merge(commonConfig, {
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
                fix: true,
                failOnError: false
            }
        } ]
    }   
});