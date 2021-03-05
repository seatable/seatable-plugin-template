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
build ----------------------------------- 项目编译后的文件夹
config ---------------------------------- 项目编译配置文件夹
plugin-config --------------------------- 项目 zip 打包配置文件夹
plugin-zip ------------------------------ 项目 zip 打包后 zip 所在文件夹
public ---------------------------------- 项目本地开发静态文件文件夹
scripts --------------------------------- 项目打包脚本
src ------------------------------------- 项目源码文件夹
  locale -------------------------------- 项目国际化支持文件夹
    lang -------------------------------- 语言文件夹
    index.js ---------------------------- 国际化语言支持入口文件
  app.js -------------------------------- 项目主代码
  entry.js ----------------------------- 插件在集成环境下的入口文件
  index.js ------------------------------ 开发环境下入口文件
  setting.js ---------------------------- 开发环境下配置文件
  setting.local.dist.js ----------------- 本地开发环境配置文件样例
  setting.local.js ---------------------- 本地开发环境下配置文件 (从样例拷贝后再修改)
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
  "display_type": 'dialog/overlary', // 插件显示模式, 弹出一个对话框或者一个新层
  "display_name": '',           // 插件在界面上显示的名字
  "description": '',            // 插件功能相关描述
  "has_css": true/false,        // 插件是否包含 css 文件
  "has_icon": true/false,       // 插件是否包含 icon 图片
  "has_card_image": true/false  // 插件是否包含背景图片
}
```

## 插件工作模式

插件可以以两种方式运行，一种是开发环境，一种是生产环境。

开发环境下，程序初始化的时候通过配置文件中的信息来加载服务器上的表格，然后主动弹出一个对话框。

生产环境下，表格的数据已经在浏览器中，所以不需要加载。程序初始化的时候 (entry.js) 向 SeaTable 注册一个回调函数。用户点击插件对应的按钮的时候这个回调函数会被执行。在这个模板中，回调函数的行为是让插件弹出一个对话框，并在其中显示能通过 dtable SDK 接口


## 插件开发基本流程

### 1. clone 项目

* clone 当前项目到本地
   
### 2. 修改插件信息文件

* 在 plugin-config 文件夹中添加自定义的 icon.png 作为插件的图标（可不提供，采用默认图标。icon.png 要求是 128x128 像素)
* 在 plugin-config 文件夹中添加自定义的 card_image.png 作为插件图标的背景图（可不提供，显示默认背景。card_image.png 要求是 560x240 像素，实际显示为 280x120 像素，这是为了在高清屏上显示不会模糊)
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

### 4. 修改插件开发配置文件

把 setting.local.dist.js 拷贝为 setting.local.js，然后再修改。

这个配置文件用于本地开发获取 dtable 数据:

```
const config = {
  APIToken: "**",               // 需添加插件的 dtable 的 api token
  server: "**",                 // 需添加插件的 dtable 的部署网址
  workspaceID: "**",            // 需添加插件的 dtable 所在的 workspace 的 id 值
  dtableName: "**",             // 需添加插件的 dtable 的名字
  lang: "**"                    // 默认语言类型，en 或者 zh-cn
};
```

### 5. 添加国际化支持

#### 插件国际化分两种情况

1. 插件显示名字国际化
2. 插件内部内容国际化：翻译字符串应该放在 js 文件中，并和插件的其他 js 源码文件一起打包成一个 js 文件。
   
#### 插件显示名字国际化

插件显示的名字也可以提供国际化显示。如果需要对插件的显示名字提供国际化，可以在插件配置信息文件 `info.json` 中修改display_name参数，修改类型如下：

```
display_name: {
  'en': '',
  'fr': '',
  'de': '',
  'zh-cn': '',
  ...
}
```

如果不需要对插件的显示名字提供国际化，可以在插件配置信息文件 `info.json` 中直接对display_name参数进行赋值

```
display_name: ''
```

#### 插件内部内容国际化

这里推荐使用 [react-intl-universal](https://github.com/alibaba/react-intl-universal) 来实现插件的国际化。

这个库支持的翻译内容包含
1. 数值
2. 货币
3. 日期
4. 时间
5. 文本（普通文本、包含变量的文本、html文本）

使用方法:
1. 在`src/locale/lang`中添加支持的语言文件 **.js
2. 在文件中添加需要国际化的key、value键值对
3. 在`src/locale/index.js`文件中
    * 导入定义的语言文件
    * 定义默认支持的语言类型LANUGUAGE
    * 将语言添加到locales对象中
4. 在需要添加国际化内容的组件中导入翻译组件 `import intl from 'react-intl-universal`
5. 调用intl的接口函数完成相应的国际化工作，使用文档请移步➡️[react-intl-universal](https://github.com/alibaba/react-intl-universal)


### 6. 开始开发

* 运行 npm install 安装插件依赖项
* 运行 npm run start 运行本地开发环境
* 此时在界面上显示出 dtable 表格所有子表的value值，及表格中协作人 (collaborators) 的详细信息（本地开发版本使用 settings 中的配置来获取 dtable 数据。集成版本直接获取当前浏览器中的 dtable 数据）。
  1. dtable 表格的中子表(tables)的相关数据，可以通过 dtable 提供的 getTables 接口函数获取
  2. dtable 表格协作人(collaborators)的详细信息，可以通过 dtable 提供的 getRelatedUsers 接口函数获取
   
* 依据需求，使用 dtable-sdk 提供的接口函数，更新 app.js 完成插件功能开发

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

  // 说明: 初始化 dtable-sdk 插件的接口对象 DTable 数据
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
