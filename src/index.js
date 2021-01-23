import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './setting';

class TaskList {

  static execute() {
    ReactDOM.render(
      <App showDialog={true} isDevelopment={true}/>,
      document.getElementById('root')
    );
  }

}

TaskList.execute();

window.app = window.app ? window.app : {};
window.app.onClosePlugin = function() {

}

