# SeaTable 插件开发

SeaTable 插件让你可以按照自己的需求去给一个表格提供额外的功能。SeaTable 插件用 JavaScript 语言编写。编译打包后可以安装到一个表格中。

这个仓库提供了插件的模板和打包脚本。

## 插件开发库

插件开发可以使用下面两个库

1. dtable-sdk，提供读写当前 dtable 数据的 API (https://docs.seatable.io/published/dtable-sdk/home.md)
2. (可选) dtable-ui-component，提供可复用的 UI 组件库 (待完善)

> SeaTable 系统中的一个表格叫做 dtable (database table)

## 插件包

插件包是一个 zip 格式的文件。它解压后的目录结构如下

```
   your-plugin                        
     -- main.js             // 插件编译后的 js 文件
     -- info.json           // 插件的信息文件
     -- media               // 插件静态文件文件夹
     -- media/main.css      // 编译后的 css 文件
     -- media/icon.png      // 插件的 icon 图片
```

info.json 说明
   
```
{
  "name": '',                   // 插件英文名字，只能包含字母、数字、下划线、中划线
  "version": '',                // 插件版本号，需要是类似 1.0.3 这样的格式
  "display_name": '',           // 插件在界面上显示的名字
  "description": '',            // 插件功能相关描述
  "has_css": true/false,        // 插件是否包含 css 文件
  "has_icon": true/false,       // 插件是否包含 icon 图片
  "has_card_image": true/false  // 插件是否包含背景图片
}
```

## 插件开发基本流程

### 1. clone 项目

* clone 当前项目到本地
   
### 2. 修改插件信息文件

* 在 plugin-config 文件夹中添加自定义的 icon.png 作为插件的图标（可不提供，采用默认图标。icon.png 要求是 128x128 像素)
* 在 plugin-config 文件夹中添加自定义的 card_image.png 作为插件图标的背景图（可不提供，显示默认背景。card_image.png 要求是 1840x400 像素，实际显示为 920x200 像素，这是为了在高清屏上显示不会模糊)
* 修改 plugin-config 文件夹中 info.json 配置文件

```
  "name": '',                   // 插件英文名字，只能包含字母、数字、下划线、中划线
  "version": '',                // 插件版本号
  "display_name": '',           // 插件显示的名字
  "description": '',            // 插件功能相关描述
```

这里不需要添加其他配置参数，其他参数由打包工具自动生成

### 3. 修改插件开发配置文件 settings.js

配置文件用于本地开发获取 dtable 数据。

```
配置参数说明：
const config = {
  APIToken: "**",               // 需添加插件的 dtable 的 api token
  server: "**",                 // 需添加插件的 dtable 的部署网址
  workspaceID: "**",            // 需添加插件的 dtable 所在的 workspace 的 id 值
  dtableName: "**",             // 需添加插件的 dtable 的名字
  lang: "**"                    // 默认语言类型，en 或者 zh-cn
};
```

### 4. 开始开发

* 运行 npm run start 运行本地开发环境
* 按照 app.js 中的样例完成数据的获取和展示（本地开发版本使用 settings 中的配置来获取 dtable 数据。集成版本直接获取当前浏览器中的 dtable 数据）

> 这里需要对插件的代码结构做一个补充说明

## 5. 打包上传插件

1. 执行 npm run build-plugin 打包插件
2. 上传插件到 dtable 中
