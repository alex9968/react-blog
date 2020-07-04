const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    open: false,
    port: 3000,
    contentBase: 'src',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename:"./public/index.html",
      inject: true,
      minify: {
      },
      chunks:["index"]
    }),
  ],
  module:{
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,//修改为==>importLoaders: 2,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          //新增--begin
          {
            loader: require.resolve('sass-loader'),
          },
          //新增--end

        ],
      }
    ]
  }
}




