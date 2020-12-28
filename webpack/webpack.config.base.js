const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { resolve } = require('path')

const getClientEnvironment = require('./env')

const env = getClientEnvironment()

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@common': resolve(__dirname, '../src/components/common/'),
      '@assets': resolve(__dirname, '../src/assets/'),
      '@utils': resolve(__dirname, '../src/utils/'),
      '@config': resolve(__dirname, '../config/'),
      '@pages': resolve(__dirname, '../src/pages/'),
      '@components': resolve(__dirname, '../src/components/'),
      '@graphql': resolve(__dirname, '../src/graphql/'),
      '@hooks': resolve(__dirname, '../src/hooks/'),
    },
  },
  output: {
    path: resolve(__dirname, '../public'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        include: /bg/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /bg/,
        use: {
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [
                {
                  cleanupIDs: {
                    remove: true,
                    minify: true,
                    prefix: {
                      toString() {
                        this.counter = this.counter || 0
                        return `id-${this.counter++}`
                      },
                    },
                  },
                },
              ],
              floatPrecision: 2,
            },
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'National Missing and Unidentified Persons Kenya',
      template: resolve(__dirname, '../src/index.ejs'),
      filename: resolve(
        __dirname,
        env.raw.NODE_ENV === 'development' ? '../public/index.html' : '../public/index.html'
      ),
      hash: true,
      templateParameters: {
        title: 'R5 Click',
      },
      chunks: ['main'],
      chunksSortMode: 'none',
    }),
    new ESLintPlugin({ extensions: ['.tsx', '.ts', '.js', '.jsx'] }),
  ],
}
