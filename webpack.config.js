const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const { preprocess } = require("./svelte.config");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";
const bundleName = prod ? "bundle" : "build/bundle";

module.exports = {
  entry: {
    bundle: ["./src/main.ts"],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve("svelte/package.json")),
      "@components": path.resolve(__dirname, "./src/components"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
    extensions: [".mjs", ".js", ".ts", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: prod ? path.resolve("public", "dist") : path.resolve("public", "dev"),
    filename: prod ? "[name].[contenthash].js" : "[name].js",
    chunkFilename: prod ? "[name].[id].[contenthash].js" : "[name].[id].js",
    publicPath: prod ? "/dist/" : "/",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              encoding: false,
            },
          },
        ],
      },
    ],
  },
  mode,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      FIREBASE_CONFIG: JSON.stringify({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
      }),
    }),
    new HtmlWebpackPlugin({
      title: "Some music app",
      template: "src/template.html",
      filename: prod ? "../index.html" : "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: prod ? "[name].[contenthash].css" : "[name].css",
    }),
  ],
  devtool: prod ? "hidden-source-map" : "source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 5000,
    contentBase: "public",
    watchContentBase: true,
  },
};
