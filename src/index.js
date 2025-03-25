import React from 'react';
import { createRoot } from 'react-dom/client';
import DTable from 'dtable-sdk';
import App from './app';
// import App2 from './app2';
import './setting';

class TaskList {

  static async init() {
    const dtableSDK = new DTable();

    // local develop
    window.app = {};
    window.app.state = {};
    window.dtable = {
      ...window.dtablePluginConfig,
    };
    await dtableSDK.init(window.dtablePluginConfig);
    await dtableSDK.syncWithServer();

    window.app.collaborators = dtableSDK.dtableStore.collaborators;
    window.app.collaboratorsCache = {};
    window.app.state.collaborators = dtableSDK.dtableStore.collaborators;
    window.dtableWebAPI = dtableSDK.dtableWebAPI;
    window.app.onClosePlugin = () => {};
    window.dtableSDK = dtableSDK;
  }

  static async execute() {
    await this.init();
    const root = createRoot(document.getElementById('root'));
    root.render(<App isDevelopment={true} showDialog={true} />);
  }

}

TaskList.execute();

const openBtn = document.getElementById('plugin-controller');
openBtn.addEventListener('click', function() {
  TaskList.execute();
}, false);
