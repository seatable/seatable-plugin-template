# 插件开发

## dtable 介绍
dtable是一款面向各行各业的数据统计类表格应用。能够向用户提供直观的二维表结构，具备简单、易用、功能全面等相关特性。

## 插件开发的意义
dtable提供的各种功能基本满足各种行业的大多数需求，因其具备普遍性，必然对某些行业的特殊的需求，以及对某些用户的特殊需求存在支持不足的情况。因此我们提供插件开发的功能来满足大众的需求。
1. 针对某个行业的某个业务提供解决方案
2. 针对某个用户的某个需求提供解决方案

## 插件开发基础组件库

1. dtable-sdk，提供操作dtable界面数据相关的api
2. dtable-ui-component，提供dtable界面显示的UI组件库（提供基本的数据显示组件）
3. dtable，提供的集成插件接口文档

## 插件打包规则
1. 打包插件的目录结构问
```
   --task                     // 根目录         
   --task/main.js             // 插件打包后的js文件
   --task/info.json           // 插件配置文件
   --task/media               // 插件相关的静态文件文件夹
   --task/media/main.css      // 插件打包后的css文件
   --task/media/icon.png      // 插件的icon 图片
```

2. 打包插件中info.json 配置说明
   
```
{
  "name": '',                   // 插件英文名字，用来向dtable注册使用
  "version": '',                // 插件版本号
  "display_name": '',           // 插件显示的名字
  "description": '',            // 插件功能相关描述
  "has_css": true/false,        // 插件是否包含自定义的css内容
  "has_icon": true/false,       // 插件是否包含icon图片
  "has_card_image": true/false  // 插件是否包含背景图片
}

```

3. 插件最终打包为zip格式的压缩包

## 插件开发基本流程

### 1. clone项目
* fork当前项目（dtable插件开发模版）到自己的github账号中
* clone被fork到自己github账号中的（dtable插件开发模版）项目
   
### 2. 修改打包配置
* 在plugin-config文件夹中添加自定义的icon.png作为插件的图标（可不提供，采用默认图标。icon.png 要求是 128x128 像素)
* 在plugin-config文件夹中添加自定义的card_image.png作为插件图标的背景图（可不提供，显示默认背景。card_image.png 要求是 560x240 像素）
* 修改plugin-config文件夹中info.json配置文件
```
  "name": '',                   // 插件英文名字，用来向dtable注册使用
  "version": '',                // 插件版本号
  "display_name": '',           // 插件显示的名字
  "description": '',            // 插件功能相关描述

  注释：此处无需添加的配置参数
  has_css配置参数：打包时读取打包后的css文件, 如果读取到，赋值为：true，否则：false
  has_icon配置参数：打包时读取icon.png, 如果读取到，赋值为：true，否则：false
  has_card_image配置参数：打包时读取card_image.png, 如果读取到，赋值为：true，否则：false

```

### 3. 修改插件开发配置文件 settings.js
配置文件作用：用于本地开发时，初始化插件数据（集成时，直接获取线上dtable的数据即可）

```
配置参数说明：
const config = {
  APIToken: "**",               // 需添加插件的dtable的 apiToken
  server: "**",                 // 需添加插件的dtable的 部署网址
  workspaceID: "**",            // 需添加插件的dtable所在的 workspace的id值
  dtableName: "**",             // 需添加插件的dtable的 名字
  lang: "**"                    // 访问的语言类型
};
```

### 3. 完成功能
* 依据统计需求，设计相关算法
* 按照app.js中的样例完成数据初始化操作（本地开发版本基于settings配置文件完成dtable数据初始化，集成版本直接获取window中存储的dtable数据，完成初始化）
* 调用算法，完成相关统计需求
* 依据dtable-ui-component提供的UI组件库，显示出用户想要的统计结果

## 打包上传插件
1. 执行npm run build-plugin 打包插件
2. 上传插件
3. 测试插件