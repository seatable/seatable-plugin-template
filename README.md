# SeaTable 插件开发

SeaTable 插件让你可以按照自己的需求去给一个表格提供额外的功能。SeaTable 插件用 JavaScript 语言编写。编译打包后可以安装到一个表格中。

这个仓库提供了插件的模板和打包脚本。

## 插件开发库

插件开发可以使用下面两个库

1. dtable-sdk，提供读写当前 dtable 数据的 API (https://docs.seatable.io/published/dtable-sdk/home.md)
2. (可选) dtable-ui-component，提供可复用的 UI 组件库 (待完善)

> SeaTable 系统中的一个表格叫做 dtable (database table)

## 插件目录结构说明

```
build ----------------------------------- 项目正常打包后文件夹
config ---------------------------------- 项目打包配置文件夹
node-modules ---------------------------- 项目第三方依赖包文件夹
plugin-config --------------------------- 项目zip打包配置文件夹
plugin-zip ------------------------------ 项目zip打包后zip所在文件夹
public ---------------------------------- 项目本地开发静态文件文件夹
scripts --------------------------------- 项目打包脚本
src ------------------------------------- 项目源码文件夹
  app.js -------------------------------- 项目应用文件
  entery.js ----------------------------- 项目打包入口文件
  index.js ------------------------------ 项目本地开发入口文件
  setting.js ---------------------------- 项目本地开发配置文件
.babelrc -------------------------------- 项目bebel转换规则
.eslintrc.json -------------------------- 源码eslint检测规则
.gitignore ------------------------------ git提交忽略文件/文件夹配置
package-lock.json ----------------------- 第三方依赖控制配置
package.json ---------------------------- 项目说明及相关配置
README.md ------------------------------- 项目说明文档
```

## 插件包

插件包是一个 zip 格式的文件。它解压后的目录结构如下

```
   your-plugin                        
     -- main.js             // 插件编译后的 js 文件
     -- info.json           // 插件的信息文件
     -- media               // 插件静态文件文件夹
     -- media/main.css      // 编译后的 css 文件
     -- media/icon.png      // 插件的 icon 图片 
     -- media/card_image.png // 插件 icon 的背景图片
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

### 3. 修改entry.js文件中的插件注册函数 

```
  更新 window.app.registerPluginItemCallback('test', TaskList.execute);
  ⬇️
  为： window.app.registerPluginItemCallback(name, TaskList.execute);  此处的name 值为plugin-config/info.json中的“name”值
```

### 4. 修改插件开发配置文件 settings.js

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

### 5. 开始开发

* 运行 npm install 安装插件依赖项
* 运行 npm run start 运行本地开发环境
* 此时在界面上显示出dtable表格所有子表的value值，及表格中协作人（collaborators）的详细信息（本地开发版本使用 settings 中的配置来获取 dtable 数据。集成版本直接获取当前浏览器中的 dtable 数据）。
  1. dtable表格的中子表(tables)的相关数据，可以通过dtable 提供的 getTables 接口函数获取
  2. dtable表格协作人(collaborators)的详细信息，可以通过dtable 提供的 getRelatedUsers 接口函数获取
   
* 依据需求，使用dtable-sdk提供的接口函数，更新app.js完成插件功能开发

app.js 代码结构说明
```
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import DTable from 'dtable-sdk';

import './css/plugin-layout.css';

const propTypes = {
  showDialog: PropTypes.bool
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showDialog: props.showDialog || false,
    };
    this.dtable = new DTable();
  }

  // 说明: 初始化 dtable-sdk 插件的接口对象 DTable 数据，初始化 window.app 对象中的 collaborators
  componentDidMount() {
    this.initPluginDTableData();  
  }

  // 说明: 集成插件后，控制插件内容的显示
  componentWillReceiveProps(nextProps) {
    this.setState({showDialog: nextProps.showDialog});  
  } 

  // 说明: 模版函数，无需改动
  async initPluginDTableData() {
    if (window.app === undefined) {
      // local develop
      window.app = {};
      await this.dtable.init(window.dtablePluginConfig);
      await this.dtable.syncWithServer();
      this.dtable.subscribe('dtable-connect', () => { this.onDTableConnect(); });
    } else { 
      // integrated to dtable app
      this.dtable.initInBrowser(window.app.dtableStore);
    }
    this.dtable.subscribe('remote-data-changed', () => { this.onDTableChanged(); });
    this.resetData();
  }

  // 说明: 模版函数，无需改动
  onDTableConnect = () => {
    this.resetData();
  }

  // 说明: 模版函数，无需改动
  onDTableChanged = () => {
    this.resetData();
  }

  // 说明: 依据需求，更新显示数据
  resetData = () => {
    this.setState({
      isLoading: false,
      showDialog: true
    });
  }

  // 说明: 模版函数，无需改动
  onPluginToggle = () => {
    this.setState({showDialog: false});
  }

  // 说明: 依据业务需求，更新显示内容
  render() {
    let { isLoading, showDialog } = this.state;
    if (isLoading) {
      return '';
    }

    let subtables = this.dtable.getTables();
    let collaborators = this.dtable.getRelatedUsers();
    
    return (
      <Modal isOpen={showDialog} toggle={this.onPluginToggle} className="dtable-plugin plugin-container" size="lg">
        <ModalHeader className="test-plugin-header" toggle={this.onPluginToggle}>{'插件'}</ModalHeader>
        <ModalBody className="test-plugin-content">
          <div>{`'dtable-subtables: '${JSON.stringify(subtables)}`}</div>
          <br></br>
          <div>{`'dtable-collaborators: '${JSON.stringify(collaborators)}`}</div>
        </ModalBody>
      </Modal>
    );
  }
}

App.propTypes = propTypes;

export default App;

```

## 打包上传插件

1. 执行 npm run build-plugin 打包插件
2. 上传插件到 dtable 中
