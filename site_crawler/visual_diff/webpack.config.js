const path = require('path');

const dev = process.env.NODE_ENV !== 'production'




// module.exports = {
//   mode: 'development',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js'
//   },
//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),
//     //compress: true,
//     hot: true,
//     //index: './index.html',
//     port: 9000
//   }
// };


module.exports = {
  mode: dev ? 'development' : 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: false,
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    //compress: true,
    hot: true,
    port: 9000
  }
};
