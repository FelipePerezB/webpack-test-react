const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")


module.exports={
    mode:"production",
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js",
        clean:true,
        publicPath:"./"
    },
    resolve:{
        extensions:[".js",".jsx"],
        alias:{
            "@styles":path.resolve(__dirname,"src/styles/"),
            "@components":path.resolve(__dirname,"src/components/")
        }
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
    optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    },
}