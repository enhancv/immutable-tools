const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: 'dist/',
        libraryTarget: 'commonjs',
        filename: 'index.js'
    },
    target: 'node',
    module: {
        loaders: [{
            include: [
                path.resolve(__dirname, "src"),
            ],
            test: /\.js$/,
            loader: 'babel-loader?presets[]=es2015'
        }]
    },
    externals: [nodeExternals()],
};