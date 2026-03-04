const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.ts", // bundle"s entry point
    output: {
        path: path.resolve(__dirname, "dist"), // output directory
        filename: "[name].js", // name of the generated bundle
    },
    resolve: {
        extensions: [".js", ".ts", ".json"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },

            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
        }),
    ],
};