# 插件开发

## dtable 介绍
dtable是一款面向各行各业的数据统计类表格应用。能够向用户提供直观的二维表结构，具备简单、易用、功能全面等相关特性。

## 插件开发的意义
dtable提供的各种功能基本满足各种行业的大多数需求，因其具备普遍性，必然对某些行业的特殊的需求，以及对某些用户的特殊需求存在支持不足的情况。因此我们提供插件开发的功能来满足大众的需求。
1. 针对某个行业的某个业务提供解决方案
2. 针对某个用户的某个需求提供解决方案

## 插件开发基础组件库

1. dtable-sdk，提供操作dtable界面数据相关的api
2. dtable-UI-component，提供dtable界面显示的UI组件库（提供基本的数据显示组件）
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
1. 依据统计需求，设计相关算法
2. 依据dtable-sdk提供的api获取界面数据
3. 调用算法，完成相关统计需求
4. 依据dtable-ui-component提供的UI组件库，显示出用户想要的统计结果
5. 在plugin-config文件夹中添加icon.png作为插件的图标（可以不提供，采用默认图标）
6. 在plugin-config文件夹中添加card_image.png作为插件图标的背景图（可以不提供，显示为空）
7. 在plugin-config文件夹中添加info.json配置文件，完成插件开发
```
  "name": '',                   // 插件英文名字，用来向dtable注册使用
  "version": '',                // 插件版本号
  "display_name": '',           // 插件显示的名字
  "description": '',            // 插件功能相关描述

  注释：
  has_css配置参数：打包时读取打包后的css文件, 如果读取到，赋值为：true，否则：false
  has_icon配置参数：打包时读取icon.png, 如果读取到，赋值为：true，否则：false
  has_card_image配置参数：打包时读取card_image.png, 如果读取到，赋值为：true，否则：false

  此处无需赋值
```

## 打包上传插件
1. 执行npm run build-plugin 打包插件
2. 上传插件
3. 测试