import React from 'react';
import ReactDOM from 'react-dom';
import App1 from './app1';
// import App2 from './app2';
import './setting';

class TaskList {

  static execute() {
    ReactDOM.render(
      <App1 showDialog={true} isDevelopment={true}/>,
      document.getElementById('root')
    );
  }

}

TaskList.execute();

const openBtn = document.getElementById('plugin-controller');
openBtn.addEventListener('click', function() {
  TaskList.execute();
}, false);


window.app = window.app ? window.app : {};
window.app.onClosePlugin = function() {};

