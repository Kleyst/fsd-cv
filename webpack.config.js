const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = ['dist', 'build'];
const cleanWebpack = new CleanWebpackPlugin(pathsToClean);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractPug = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'src/index.pug',
  inject: false
})

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};

const fonts = {
  test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/'
      }
  }]
};

const svg =  {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'img/'
    }
}]
};

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractSCSS =  new MiniCssExtractPlugin({
  filename: "css/style.css",
});

const scss = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
        minimize: true,
        url: false
      }
    },
    "sass-loader"
  ]
};

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [pug, scss, fonts, svg],
  },
  plugins: [
    extractPug,
    cleanWebpack,
    extractSCSS
  ]
};

module.exports = config;