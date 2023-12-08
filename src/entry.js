import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'

class TaskList {

  static execute(props = {}) {
    ReactDOM.render(<App showDialog={true} {...props} />, document.querySelector('#plugin-wrapper'));
  }

}

export default TaskList;

window.app.registerPluginItemCallback('test', TaskList.execute);
