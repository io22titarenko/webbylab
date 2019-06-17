const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./client/src/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test : /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'], // Transform jsx & es6 features to vanila js
                    plugins: ['@babel/plugin-proposal-class-properties'] // Allow js class proposal propeties
                }
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new HTMLWebpackPlugin({
        template: './client/public/index.html' // Generate index.html in dist directory, includes bundle script
    })]
}