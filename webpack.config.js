const path = require('path');
const glob = require('glob');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    entry: {
      app: [].concat(
        glob.sync("./assets/js/**/*.js"),
        glob.sync("./lib/liveview_playground_web/cells/**/*.js"),
        glob.sync("./lib/liveview_playground_web/views/**/*.js"),

        glob.sync("./assets/css/app.css"),
        glob.sync("./lib/liveview_playground_web/cells/**/*.css"),
        glob.sync("./lib/liveview_playground_web/views/**/*.css")
      )
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "./priv/static")
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: devMode
              }
            },
            "postcss-loader"
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
          filename: "css/[name].css"
      }),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
      }),
      new CopyWebpackPlugin([
        {
          from: "./assets/static/",
          to: "./"
        }
      ])
    ]
    .concat(devMode ? [new HardSourceWebpackPlugin()] : [])
  }
};
