var path = require("path");
var webpack = require("webpack");
const NODE_ENV = process.env.NODE_ENV;

const config = {
  entry:
    NODE_ENV == "development"
      ? ["babel-polyfill", "./src/index.js"]
      : ["babel-polyfill", "./src/qr.js"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "react-awesome-qr.js",
    library: "react-awesome-qr",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.worker\.js$/,
        loader: "worker-loader",
        options: {
          inline: true
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
if (NODE_ENV != "development") {
  config.externals = {
    react: "react",
    "react-dom": "ReactDOM"
  };
}
module.exports = config;
