import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'

class TaskList {

  static execute() {
    let wrapper = document.querySelector('#plugin-wrapper');
    ReactDOM.render(<App showDialog={true} />, wrapper);
  }

}

export default TaskList;

window.app.registerPluginItemCallback('test', TaskList.execute);