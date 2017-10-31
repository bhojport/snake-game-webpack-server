var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");



var extractPlugin = new ExtractTextPlugin({
    filename: "app.css"
});

/* var copyPlugin = new CopyWebpackPlugin([{
    from: "./*.html"
}]) */

module.exports = {
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js",
        publicPath: "/dist",
    },
    module: {
        rules: [
            {
                test: /\.ico$/,
                loader: "url-loader",
                query: { mimetype: "image/x-icon" }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // Order is important
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015"]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-minify-loader'
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        extractPlugin
        // copyPlugin
    ]
}