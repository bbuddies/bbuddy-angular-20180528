var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");

module.exports = function(dev) {
  var config = {
    devtool: dev ? "cheap-module-eval-source-map" : "hidden-source-map",
    debug: dev,
    entry: {
      app: "./src/app/root"
    },
    devServer: {
      stats: {
        chunks: false,
        colors: true
      },
      contentBase: "src/www/", //Relative directory for base of server
      hot: true,
      inline: true
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].bundle.js"
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/www/index.html",
        inject: "body"
      }),
      new ExtractTextPlugin("[name].bundle.css")
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel",
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: "json-loader"
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss")
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: "file"
        },
        {
          test: /\.html$/,
          loader: "raw"
        }
      ]
    },
    postcss: [
      autoprefixer({
        browsers: ["last 2 version"]
      })
    ]
  };
  if (!dev) {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify("production")
        }
      })
    );
    config.plugins.push(new webpack.optimize.DedupePlugin());
    // Disable uglify due to angular di expect exact name of dependency, probably move angular to seperated file
    // config.plugins.push(
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // )
  }

  return config;
};
