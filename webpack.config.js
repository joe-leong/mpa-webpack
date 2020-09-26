const path = require("path");
const fs = require("fs");
const modules = fs.readdirSync(path.resolve(__dirname, "./module"));
const HtmlWebpcKPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function setMpa(modules = []) {
  const entries = {};
  const htmlPs = [];
  modules.forEach((module) => {
    (entries[`${module}/${module}`] = `./module/${module}/${module}.js`),
      htmlPs.push(
        new HtmlWebpcKPlugin({
          filename: `${module}/${module}.html`,
          template: `./module/${module}/index.html`,
          chunks: [`${module}/${module}`],
        })
      );
  });
  return {
    entries,
    htmlPs,
  };
}
const { entries, htmlPs } = setMpa(modules);
module.exports = {
  mode: "development",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:8].js",
  },
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["file-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["my-style-loader", "my-css-loader", "my-less-loader"],
      },
    ],
  },
  plugins: [...htmlPs, new CleanWebpackPlugin()],
};
