
const config = {
  APIToken: "**",
  server: "**",
  workspaceID: "**",
  dtableName: "**",
  lang: "**"
};

const dtablePluginConfig = Object.assign({}, config, {server: config.server.replace(/\/+$/, "")}) ;
window.dtablePluginConfig = dtablePluginConfig;