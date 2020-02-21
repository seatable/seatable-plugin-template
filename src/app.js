import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import DTable from 'dtable-sdk';

import './css/plugin-layout.css';

const propTypes = {
  showDialog: PropTypes.bool
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showDialog: props.showDialog || false,
    };
    this.dtable = new DTable();
  }

  componentDidMount() {
    this.initPluginDTableData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showDialog: nextProps.showDialog});
  } 

  async initPluginDTableData() {
    if (window.app === undefined) {
      // local develop
      window.app = {};
      await this.dtable.init(window.dtablePluginConfig);
      await this.dtable.syncWithServer();
      this.dtable.subscribe('dtable-connect', () => { this.onDTableConnect(); });
      this.dtable.subscribe('remote-data-changed', () => { this.onDTableChanged(); });
      window.app.collaborators = this.dtable.getRelatedUsers();
      this.resetData();
    } else {
      // integrated to dtable app
      this.dtable.initInBrowser(window.app.dtableStore);
      window.app.collaborators = window.app.state.collaborators;
      this.dtable.subscribe('remote-data-changed', () => { this.onDTableChanged(); });
      this.resetData();
    }
  }

  onDTableConnect = () => {
    this.resetData();
  }

  onDTableChanged = () => {
    this.resetData();
  }

  resetData = () => {
    this.setState({
      isLoading: false,
      showDialog: true
    });
  }

  onPluginToggle = () => {
    this.setState({showDialog: false});
  }

  render() {
    let { isLoading, showDialog } = this.state;
    if (isLoading) {
      return '';
    }

    let { collaborators } = window.app;
    let dtableStore = this.dtable.dtableStore;
    
    return (
      <Modal isOpen={showDialog} toggle={this.onPluginToggle} className="dtable-plugin plugin-container" size="lg">
        <ModalHeader className="test-plugin-header" toggle={this.onPluginToggle}>{'插件'}</ModalHeader>
        <ModalBody className="test-plugin-content">
          <div>{`'dtable-value: '${JSON.stringify(dtableStore.value)}`}</div>
          <br></br>
          <div>{`'dtable-collaborators: '${JSON.stringify(collaborators)}`}</div>
        </ModalBody>
      </Modal>
    );
  }
}

App.propTypes = propTypes;

export default App;
