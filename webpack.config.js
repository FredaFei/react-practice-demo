/**
 * Created by freda on 2017/05/06.
 */

// const webpack = require('webpack');
const path =require('path');

module.exports = {
  entry: [
    "./src/entry.js"
  ],
  output: {
    publicPath:'/dist/',
    path: path.join(__dirname,'out'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, loader: "babel-loader?presets[]=es2015&presets[]=react", include: /src/},
      { test: /\.css$/, loader: "style!css"},
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"},
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
    ]
  }
};