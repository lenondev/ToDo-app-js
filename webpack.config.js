const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    
    output: {
        clean: true
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

        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mi Webpack App',
            //filename: 'index.html',
            template: './src/index.html',
            favicon: "./src/assets/img/favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
          }),
        new CopyPlugin({
          patterns:[
            { from: "src/assets", to: "assets/" }],
        }),
    ]
  
}