# Keepfit健身APP

基于HTML/CSS/JavaScript开发的健身APP原型，可直接部署到Vercel。

## 项目概述

这是一个健身APP的原型设计，包含以下功能模块：

- 首页：展示轮播广告、赛事活动、合作场馆、明星教练和近期课程
- 赛事活动：展示健身相关赛事和活动信息
- 会员购买：提供会员订阅服务
- 课程预约：提供课程预约功能
- 个人中心：用户个人信息和相关设置

## 技术栈

- 前端：HTML5, CSS3, JavaScript
- 响应式设计：移动端优先
- 多语言支持：中文、英文、韩文

## 目录结构

```
├── prototype/             # HTML原型页面
│   ├── index.html         # 首页
│   ├── events.html        # 赛事活动页
│   ├── event_detail.html  # 赛事详情页
│   ├── member.html        # 会员购买页
│   ├── course.html        # 课程页
│   ├── course_detail.html # 课程详情页
│   └── my.html            # 个人中心页
├── images/                # 图片资源
├── vercel.json            # Vercel部署配置
└── README.md              # 项目说明
```

## 项目预览

所有HTML文件都包含了iPhone模拟框架，可以直接在浏览器中查看移动端效果。

## Vercel部署说明

本项目已配置为可直接部署到Vercel的静态网站：

1. Fork或Clone本仓库到自己的GitHub账号
2. 登录Vercel并导入该仓库
3. Vercel会自动识别配置并部署

## 多语言支持

首页支持中文、英文和韩文三种语言切换，点击顶部语言按钮可切换。

## 特色功能

- 会员购买页面（member.html）带倒计时优惠功能
- 赛事详情页（event_detail.html）提供详细的活动信息和报名入口
- 响应式设计，适配各类移动设备
