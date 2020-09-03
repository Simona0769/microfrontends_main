# 前端微服务 - 主平台

## Build Setup

```bash

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 微应用注册（这里主要说dev配置模式，懒得写mock接口了）
1. 配置dev-micro-app-setting.js
    ```
     {
        name: 'micro-app-template', // 微应用名称
        title: '微任务模板', // 菜单显示的名称
        entry: 'http://localhost:9528/', // 入口路径
        baseApi: '/micro-app-template-api', // 微应用gateway - 用于dev下主平台的代理配置
        icon: 'smp-ni-nav_jcyj_n' // 图标
    }
    ```
