const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")


module.exports={
    mode:"development",
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js",
        clean:true
    },
    resolve:{
        extensions:[".js",".jsx"]
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test:/\.html$/,
                use:[
                    {loader:"html-loader"}
                ]
            },
            {
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,"css-loader"
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template:"./public/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"[name].css",
        })
    ],
    devServer:{
        static: path.join(__dirname, 'dist'),
        compress:true,
        historyApiFallback: true,
        port:3003
    }
}