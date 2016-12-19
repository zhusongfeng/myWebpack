var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  // �Ĳ�����ڷ���CSS�������
var HtmlWebpackPlugin = require('html-webpack-plugin');  // �����ڶ�Ӧ���Ŀ¼���Զ����index.html
var mode = require('yargs').argv.mode;  // ���Ի�ȡ����ǰִ�е��ǿ���ģʽ��������ģʽ
var openBrowserPlugin = require('open-browser-webpack-plugin');  // ����������������Զ���

var rootPath = path.resolve(__dirname, '');
var srcPath = path.resolve(__dirname,'src');
var plugins = [];
var filename = '';

// �����Ĳ������
plugins.push(new ExtractTextPlugin("styles.css"));      // ���ڷ���CSS�������
plugins.push(new HtmlWebpackPlugin({
    title:'�ǰ�˹�����',      // �������ɵ�html�ļ�����
    template:'./src/index.html'    // ģ��·���������ģ��·����src�����index.html
}));

// ��������
if(mode == "production"){
    console.log('production');
    plugins.push(new webpack.DefinePlugin({      // ��react�ļ���ѹ����������������
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({  // ѹ������ļ��������WebPack�ڽ����
        compress: {
            warnings: false
        }
    }));
    filename = 'bundle.min.js';
}
// ��������
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
    resolve:{  // ��import��ʱ����Բ���Ҫÿ�ζ����Ϻ�׺�Լ�Ŀ¼��
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