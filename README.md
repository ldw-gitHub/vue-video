# vue-video

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 目录结构

├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common *          // 公共的css js 资源
│   ├── components     // 各种组件 
│   ├── moke *           // 本地静态数据管理文件
│   ├── App.vue         // 主页面
│   ├── vuex *           // vuex状态管理器
│   ├── router    // 路由配置器
│   └── main.js        // Webpack 预编译入口

#页面结构
一个.vue 文件就等于单独组件。因为.vue文件是自定义的，浏览器不识别，所以要对该文件进行解析,在webpack构建中，需要安装vue-loader 对.vue文件进行解析。
template里面最外层必须是只有一个容器
script 中的 export default {} 即导出这个组件，外部可以引用。
style 中的 lang 指额外表示支持的语言可以让编辑器识别,scoped 指这里写的css只适用于该组件。

# npm install 项目下载install
# npm run build 项目部署 将生成的dist文件部署服务器
# npm install -g cnpm --registry=https://registry.npm.taobao.org  安装淘宝镜像