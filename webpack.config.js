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
const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}
const cssLoaders = extra => {
      const loaders = [{
        loader: MiniCSSExtractPlugin.loader,
        options: {
          hmr: isDev,
        },
      }, 'css-loader']
      if (extra) {
        loaders.push(extra)
      }
      return loaders
}
module.exports = {
    context: path.resolve(__dirname, 'src'),
  mode: "development",
  entry: {
    main: ['@babel/polyfill','./index.jsx'], 
    analytics: './analytics.ts'
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
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : '',
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
              use: cssLoaders()
          },
          {
            test: /\.less$/,
            use: cssLoaders('less-loader')
        },
        {
          test: /\.s[ac]ss$/,
          use: cssLoaders('sass-loader')
      },
          {
            test: /\.(png|jpg|svg|gif)$/,
            use: ['file-loader']
          },
          {
              test: /\.(ttf|wof|wof2|)$/,
              use: ['file-loader']
          },
          { test: /\.js$/, 
            exclude: /node_modules/, 
            loader: {
              loader: 'babel-loader',
              options: babelOptions()
            } 
          },
          { test: /\.ts$/, 
            exclude: /node_modules/, 
            loader: {
              loader: 'babel-loader',
              options: babelOptions('@babel/preset-typescript')
            } 
          },
          { test: /\.jsx$/, 
            exclude: /node_modules/, 
            loader: {
              loader: 'babel-loader',
              options: babelOptions('@babel/preset-react')
            } 
          }
      ]
  }
};
