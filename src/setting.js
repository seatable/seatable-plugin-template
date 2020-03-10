
const config = {
  APIToken: "0b2ccf4a292aa4a898969d05fc64b8a037b80531",
  server: "http://127.0.0.1:80/",
  workspaceID: "1",
  dtableName: "test",
  lang: "en"
};

const dtablePluginConfig = Object.assign({}, config, {server: config.server.replace(/\/+$/, "")}) ;
window.dtablePluginConfig = dtablePluginConfig;