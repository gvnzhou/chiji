
## 前言-（大吉大利，今晚吃鸡！）

一个关于React同构的实践项目。

哇，很难受。正在第二次重构中...

## 技术栈

React + React-Router4.0 + Sass + Webpack + ES6/ES7 + Koa2.0 + Mongodb

## 项目运行

### 下载、安装

`
cd ./client
`

`
npm i 
`

### 运行

`
npm start
`

## 效果演示

## 项目结构

## 目标功能

- [x] Webpack-开发环境搭建
- [x] ESLint代码校验
- [x] React热加载和替换功能
- [x] Sass支持
- [x] Node端加载css问题处理
- [ ] 前后端路由统一
- [ ] Webpack-生产环境搭建
- [ ] React异步加载

## 总结

### css in js, css module 和 scss如何选择？


css-modules 优缺点

优点

1、CSS Modules 可以有效避免全局污染和样式冲突，能最大化地结合现有 CSS 生态和 JS 模块化能力

2、与 SCSS 对比，可以避免 className 的层级嵌套，只使用一个 className 就能把所有样式定义好。

缺点：

1、与组件库难以配合

2、会带来一些使用成本，本地样式覆盖困难，写到最后可能一直在用 :global。