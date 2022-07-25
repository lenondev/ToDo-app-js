const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin");
const TerserPlugin         = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin (),
            new TerserPlugin (),
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mi Webpack App',
            //filename: 'index.html',
            template: './src/index.html',
            favicon: "./src/assets/img/favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false,
          }),
        new CopyPlugin({
          patterns:[
            { from: "src/assets", to: "assets/" }],
        }),
    ]
  
}