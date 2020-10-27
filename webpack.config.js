const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
   mode: 'development',
   devtool: '#eval-source-map',
   entry: {
      index: path.join(__dirname, "src", "main", "resources", "static", "js", "index.js"),
      login: path.join(__dirname, "src", "main", "resources", "static", "js", "login.js"),
      registration: path.join(__dirname, "src", "main", "resources", "static", "js", "registration.js")
   },
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })
   ],
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
   devServer: {
      contentBase: './dist',
      port: 8090,
      allowedHosts: [
         'localhost:8080',
      ]
   }
}
