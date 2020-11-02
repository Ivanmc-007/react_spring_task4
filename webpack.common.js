const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: {
      index: path.join(__dirname, "src", "main", "resources", "static", "js", "index.js"),
      login: path.join(__dirname, "src", "main", "resources", "static", "js", "login.js"),
      registration: path.join(__dirname, "src", "main", "resources", "static", "js", "registration.js")
   },
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.(s*)css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin({
      //    title: 'Production',
      //    template: path.join(__dirname, "src", "main", "resources", "templates", "template.html"),
      //    inject: 'body'
      // }),
      // new HtmlWebpackPlugin({
      //    title: 'Production',
      //    // template: 'login.html',
      //    // chunks: ['login.bundle.js']
      // }),
      // new HtmlWebpackPlugin({
      //    title: 'Production',
      //    // template: 'registration.html'
      // })
   ]
};