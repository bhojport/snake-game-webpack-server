var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");


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
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        extractPlugin
    ]
}