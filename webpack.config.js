var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  // 改插件用于分离CSS单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');  // 用于在对应输出目录中自动输出index.html
var mode = require('yargs').argv.mode;  // 可以获取到当前执行的是开发模式还是生产模式
var openBrowserPlugin = require('open-browser-webpack-plugin');  // 打包完成在浏览器中自动打开

var rootPath = path.resolve(__dirname, '');
var srcPath = path.resolve(__dirname,'src');
var plugins = [];
var filename = '';

// 公共的插件引入
plugins.push(new ExtractTextPlugin("styles.css"));      // 用于分离CSS单独打包
plugins.push(new HtmlWebpackPlugin({
    title:'搭建前端工作流',      // 用于生成的html文件标题
    template:'./src/index.html'    // 模板路径，这里的模板路径是src下面的index.html
}));

// 生产环境
if(mode == "production"){
    console.log('production');
    plugins.push(new webpack.DefinePlugin({      // 对react文件的压缩，用于生产环境
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({  // 压缩打包文件，这个是WebPack内建插件
        compress: {
            warnings: false
        }
    }));
    filename = 'bundle.min.js';
}
// 开发环境
else{
    console.log('development');
    plugins.push(new openBrowserPlugin({
        url: 'http://localhost:8080'
    }));
    filename = 'bundle.js';
}

var config = {
    entry:path.join(srcPath,'index.js'),
    output:{
        path:path.join(rootPath, 'dist'),
        filename: filename
    },
    "devtool":"cheap-source-map",
    resolve:{  // 在import的时候可以不需要每次都加上后缀以及目录名
        extension:['','js','css','json'],
        root:path.resolve('./src')
    },
    module:{
        loaders:[
            {test: /\.js$/, loader: 'babel',exclude: /node_modules/},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader"),exclude: /node_modules/},
            {test: /\.less$/, loader: 'style!css!less',exclude: /node_modules/}
        ]
    },
    plugins:plugins
};

module.exports = config;