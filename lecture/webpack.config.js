const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'wordrelay',
  mode: 'development', // 실서비스: production
  devtool: 'eval', // 실서비스: hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'] // 확장자를 안써도 되게 해준다.
  },

  entry: {
    app: ['./client'], // client.jsx에서 WordRelay를 불러오기 때문에 client만 적어도 된다.
  }, // 입력
  module: {  
    rules: [{
      test: /\.jsx?$/,   // js, jsx파일에 룰을 적용하겠다.
      loader: 'babel-loader',   // babel-loader를 사용하겠다
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'], // browserslist
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel',
        ],
      },
    }],
  },
  plugins: [
    new RefreshWebpackPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'), //__dirname : 현재폴더 
    filename: 'app.js',
    publicPath: '/dist/',
  },  // 출력
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true
  },
};
