import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'

class TaskList {

  static execute(props = {}) {
    const root = createRoot(document.getElementById('#plugin-wrapper'));
    root.render(<App showDialog={true} {...props} />);
  }

}

export default TaskList;

window.app.registerPluginItemCallback('test', TaskList.execute);
