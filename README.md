# Keepfit健身APP

基于uni-app开发的跨平台健身APP，支持Android、iOS和微信小程序。

## 项目概述

这是一个健身APP的原型设计，包含以下功能模块：

- 首页：展示轮播广告、赛事活动、合作场馆、明星教练和近期课程
- 赛事活动：展示健身相关赛事和活动信息
- 课程预约：提供课程预约功能
- 个人中心：用户个人信息和相关设置

## 技术栈

- 基础框架：uni-app
- 前端：Vue.js
- 样式：CSS3

## 目录结构

```
├── pages/                 # 页面文件夹
│   ├── index/             # 首页
│   ├── events/            # 赛事活动页
│   ├── courses/           # 课程预约页
│   └── my/                # 个人中心页
├── static/                # 静态资源
│   └── images/            # 图片资源
├── App.vue                # 应用入口组件
├── main.js                # 应用入口文件
├── pages.json             # 页面配置文件
├── package.json           # 项目依赖配置
└── index.html             # HTML预览文件
```

## 运行方式

1. 安装依赖

```bash
npm install
```

2. 运行项目（H5模式）

```bash
npm run dev:h5
```

3. 运行项目（微信小程序模式）

```bash
npm run dev:mp-weixin
```

4. 运行项目（App模式）

```bash
npm run dev:app-plus
```

## 项目预览

可以通过访问 `index.html` 来查看项目在iPhone 16 Pro Max上的模拟效果。

## 适配平台

- Android
- iOS
- 微信小程序# deepfit
