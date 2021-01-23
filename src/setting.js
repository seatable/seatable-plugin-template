
const config = {
  APIToken: "9851cecfd013a833eec47b629c72b3b593f91c7d",
  server: "https://dev.seatable.cn",
  workspaceID: "8",
  dtableName: "plugins",
  lang: "zh-cn"
};

const dtablePluginConfig = Object.assign({}, config, {server: config.server.replace(/\/+$/, "")}) ;
window.dtablePluginConfig = dtablePluginConfig;