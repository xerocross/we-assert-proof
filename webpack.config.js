// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const webpack = require('webpack');

module.exports = [{
    entry : {
        'we-assert' : './src/we-assert.ts'
    },
    output : {
        globalObject : "this",
        path : path.resolve(__dirname, './dist'),
        publicPath : '/',
        filename : '[name].js',
        library : "WeAssert",
        libraryTarget : "umd",
        umdNamedDefine : true
    },
    externals : {
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    module: {
        rules: [
          {
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        [
                          '@babel/preset-env',
                          {
                            targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
                          }
                        ]
                      ]
                    }
                  },
                  "ts-loader"
            ]
            
          }
        ]
      },
    optimization : {
        minimize : false
    },
    plugins : [
        new webpack.DefinePlugin({
            'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
        })
    ]
}]