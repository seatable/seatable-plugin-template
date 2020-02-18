
const config = {
  APIToken: "602dde08f3d852d533f3b947e760ca7739b6ace3",
  server: "http://127.0.0.1:80/",
  workspaceID: "1",
  dtableName: "test",
  lang: "en"
};

const dtablePluginConfig = Object.assign({}, config, {server: config.server.replace(/\/+$/, "")}) ;
window.dtablePluginConfig = dtablePluginConfig;