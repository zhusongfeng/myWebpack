## 模块安装
```
    $ npm install
```
## 说明
- 支持ES6代码的打包
- 支持react代码的打包
- 支持CSS，less文件的打包
- 可以分离css进行单独打包
- 打包之后自动生成index.html
- 在开发环境中会自动弹出index.html
- 在生产环境下可以对代码进行压缩

```
    生产环境下代码打包生成
    npm run build

    开发环境下代码打包生成
    npm run dev

    代码检测   使用 npm script语句时有问题，有待解决。。。。
    eslint ./src

    简单问题修复
    eslint ./src --fix
```