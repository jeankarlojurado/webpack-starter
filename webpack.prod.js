const HtmlWebPack = require('html-webpack-plugin'); /* Forma que tiene Node para cargar archivos de otros paquetes */
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

/* Estos 2 plugins solo se sirven para producción */
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {

    mode: 'production',

    output: {
        clean: true,
        filename: '[name].[contenthash].js', 
    },

    module: {
        rules: [
           {
               test: /\.html$/i, 
               loader: 'html-loader',
               options: {
                    sources: false, 
                    minimize: true
               },
           },
           {
            test: /\.css$/i, 
            exclude: /styles.css$/,
            use: [ 'style-loader', 'css-loader' ],
           },
           {
            test: /styles.css$/, 
            use: [MiniCssExtract.loader, 'css-loader'],
           },
           {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
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
           }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebPack({
            title: 'Mi Webpack App',
            template: './src/index.html',
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css', 
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]

}