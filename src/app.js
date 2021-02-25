import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import DTable from 'dtable-sdk';
import intl from 'react-intl-universal';
import './locale/index.js'

import './assets/css/plugin-layout.css';

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

  componentWillUnmount() {
    this.unsubscribeLocalDtableChanged();
    this.unsubscribeRemoteDtableChanged();
  }

  async initPluginDTableData() {
    const { isDevelopment } = this.props;
    if (isDevelopment) {
      // local develop
      await this.dtable.init(window.dtablePluginConfig);
      await this.dtable.syncWithServer();
      this.dtable.subscribe('dtable-connect', () => { this.onDTableConnect(); });
    } else { 
      // integrated to dtable app
      this.dtable.initInBrowser(window.app.dtableStore);
    }
    this.unsubscribeLocalDtableChanged = this.dtable.subscribe('local-dtable-changed', () => { this.onDTableChanged(); });
    this.unsubscribeRemoteDtableChanged = this.dtable.subscribe('remote-dtable-changed', () => { this.onDTableChanged(); });
    this.resetData();
  }

  onDTableConnect = () => {
    this.resetData();
  }

  onDTableChanged = () => {
    this.resetData();
  }

  resetData = () => {
    this.setState({isLoading: false});
  }

  onPluginToggle = () => {
    this.setState({showDialog: false});
    window.app.onClosePlugin();
  }

  render() {
    let { isLoading, showDialog } = this.state;
    if (isLoading) {
      return '';
    }

    let subtables = this.dtable.getTables();
    let collaborators = this.dtable.getRelatedUsers();
    
    return (
      <Modal isOpen={showDialog} toggle={this.onPluginToggle} className="dtable-plugin plugin-container" size="lg">
        <ModalHeader className="test-plugin-header" toggle={this.onPluginToggle}>{'Plugin'}</ModalHeader>
        <ModalBody className="test-plugin-content">
          <div>{`'dtable-subtables: '${JSON.stringify(subtables)}`}</div>
          <br></br>
          <div>{`'dtable-collaborators: '${JSON.stringify(collaborators)}`}</div>
          <div className="mt-4">
            <h2 className="text-left">{intl.get('international_demo')}</h2>
            <div>{intl.get('shanshui')}</div>
            <div>{intl.get('hello_someone', {name: '小强'})}</div>
            <div>{intl.getHTML('contans_html_params', {params: '参数1，参数2'})}</div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

App.propTypes = propTypes;

export default App;
