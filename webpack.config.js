var path = require("path");

module.exports = {
  entry: ['./react/app.js', './react/kurse.js'],
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};
