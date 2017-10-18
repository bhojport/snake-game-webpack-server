var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var HtmlWebpackPlugin = require("html-webpack-plugin");
// var webpack = require("webpack");


var extractPlugin = new ExtractTextPlugin({
    filename: "game.css"
});


module.exports = {
    entry: "./js/game.js",
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
                // loader: "css-loader"
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
            /* {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ["css-loader", "sass-loader"]
                })
            } */
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({

        // })
        // new webpack.optimize.UglifyJsPlugin(),
        // new HtmlWebpackPlugin({template: "./index.html"}), // For distributing html file, "on dist folder for eg."
        extractPlugin
    ]
}