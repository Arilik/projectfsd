const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const { LoaderOptionsPlugin } = require("webpack");
const { ALL } = require("dns");
const { extname } = require("path");
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
module.exports = {
    context: path.resolve(__dirname, 'src'),
  mode: "development",
  entry: {
    main: "./index.js", 
  }, 
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
        chunks: 'all'
    }
  },
  plugins: [
      new HTMLWebpackPlugin({
          template: './index.html',
          minify: {
            collapseWhitespace: isProd
          }
      }),
      new CleanWebpackPlugin(),
      new MiniCSSExtractPlugin({
          filename: filename('css'),
      })
  ],
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [{
                loader: MiniCSSExtractPlugin.loader,
                options: {
                  publicPath: '../',
                  hmr: isDev,
                },
              }, 'css-loader']
          },
          {
            test: /\.less$/,
            use: [{
              loader: MiniCSSExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: isDev,
              },
            }, 'css-loader',
            'less-loader'
          ]
        },
          {
            test: /\.(png|jpg|svg|gif)$/,
            use: ['file-loader']
          },
          {
              test: /\.(ttf|wof|wof2|)$/,
              use: ['file-loader']
          }
      ]
  }
};
