const path = require('path')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const webpack = require('webpack')

const reScript = /\.(js|jsx|mjs)$/

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'REMOTE_HOST': JSON.stringify('http://server.dreamma.vip')
      })
    )

    config.module.rules.push(
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './lib/markdown-loader.js')
      },
    )
    return config
  }
}

module.exports = withSass(withCSS(withLess(nextConfig)))
