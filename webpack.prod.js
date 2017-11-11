const   webpack = require('webpack'),
merge = require('webpack-merge'),
UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
plugins: [
new UglifyJSPlugin({
    test: /\.js($|\?)/i,
    cache: true,
    sourceMap: false
})
]
});