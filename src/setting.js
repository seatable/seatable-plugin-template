
import intl from 'react-intl-universal';

/** (1/5) initialize config object */
let config = {
  APIToken: '65be605361e3fed0bd364a2596b134ed9a337e7f',
  server: 'http://127.0.0.1:80',
  workspaceID: '1',
  dtableName: 'test-1',
  lang: 'zh-cn'
};

/** (2/5) load local development settings ./setting.local.js (if exist) */
try {
  config.local = require('./setting.local.js').default || {};
  config = {...config, ...{loadVerbose: true}, ...config.local};
  config.loadVerbose && console.log('[SeaTable Plugin Development] Configuration merged with "./src/setting.local.js" (this message can be disabled by adding `loadVerbose: false` to the local development settings)');
  delete config.local;
  delete config.loadVerbose;
} catch (error) {
  // fall-through by intention
  console.error('[SeaTable Plugin Development] Please create "./src/setting.local.js" (from `setting.local.dist.js`)');
  throw error;
}

/** (3/5) remove server trailing slash(es) (if any, common configuration error)*/
if (config.server !== config.server.replace(/\/+$/, '')) {
  console.log(`[SeaTable Plugin Development] Server "${config.server}" trailing slash(es) removed (this message will go away by correcting the \`server: ...\` entry in the local development settings)`);
  config.server = config.server.replace(/\/+$/, '');
}

/** (4/5) set locale for ReactIntlUniversal */
if (intl.options && intl.options.locales && intl.options.locales[config.lang]) {
  intl.options.currentLocale = config.lang;
} else {
  console.warn(`[SeaTable Plugin Development] Locale "${config.lang}" not available`);
  console.info(`[SeaTable Plugin Development] Available locales are: "${Object.keys((intl && intl.options && intl.options.locales) || {'ReactIntlUniversal Loading Error': 1}).join('", "')}"`);
  console.info('[SeaTable Plugin Development] Suggestions: verify "./src/setting.local.js" and/or the locales in "./src/locale"');
}

/* (5/5) init window.dtablePluginConfig  */
window.dtablePluginConfig = config;
