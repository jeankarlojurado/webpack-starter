const HtmlWebPack = require('html-webpack-plugin'); /* Forma que tiene Node para cargar archivos de otros paquetes */
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

    mode: 'development',
    output: {
        clean: true
    },
    module: {
        rules: [
           {
               test: /\.html$/i, /* Le dice a webpack que aplique esta regla si es un file con extensión html. La i es para que sea insensible con minusculas y mayusculas */
               loader: 'html-loader',
               options: {
                    /* attributes: false, */
                    sources: false, /*  Versión corregida según la información de npm html-loader */
                    /* options: { minimize: true }, */
                    minimize: false
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
        ]
    },
    plugins: [
        new HtmlWebPack({
            title: 'Mi Webpack App',
            template: './src/index.html', /* './src/index.html' = 'src/index.html' */
            // filename: './index.html' /* No es necesario poner el filename, por defecto lo nombra index.html */
        }),
        new MiniCssExtract({
            filename: '[name].css', /* Si quiero que tenga el mismo nombre que su correspondiente en .js, para este caso main.js. El .[fullhash] evita el cache */
            // filename: 'nuevo-estilo.[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]

}