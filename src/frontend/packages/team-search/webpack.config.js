const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3002,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DefinePlugin({
      "process.env.REACT_APP_FIREBASE_PROJECT_ID": JSON.stringify(
        process.env.REACT_APP_FIREBASE_PROJECT_ID
      ),
      "process.env.REACT_APP_FIREBASE_API_KEY": JSON.stringify(
        process.env.REACT_APP_FIREBASE_API_KEY
      ),
    }),
    new ModuleFederationPlugin({
      name: "search",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/index",
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^18.0.0",
        },
        "react-dom": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^18.0.0",
        }
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
