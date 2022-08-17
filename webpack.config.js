const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    index: './src/index.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TODO',
      meta: {
        viewport:
          'width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1.0',
      },
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
