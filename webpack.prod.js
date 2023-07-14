const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  output:{
    filename: 'main.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.css$/, exclude:/style\.css$/, use:[ 'style-loader', 'css-loader'  ]},
        { test: /style\.css$/, use:[ MiniCssExtractPlugin.loader, 'css-loader'  ]},
        {test:/\.(png|svg|jpg|gif)$/, use:[{loader:'file-loader'}]},
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            }
          }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({filename:'[name].[contenthash].css', ignoreOrder:false}),
    new CopyPlugin({
        patterns:[
            {
             from:'src/assets',
             to:'assets/'
            }
        ]
    }),
    
],
};