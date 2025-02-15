import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import intl from 'react-intl-universal';

import './locale';

import './assets/css/plugin-layout.css';

const propTypes = {
  isDevelopment: PropTypes.bool,
  showDialog: PropTypes.bool,
  row: PropTypes.object, // If the plugin is opened with a button, it will have a row parameter
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showDialog: props.showDialog || false,
    };
  }

  componentDidMount() {
    this.initPluginDTableData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
      window.dtableSDK.subscribe('dtable-connect', () => { this.onDTableConnect(); });
    }
    this.unsubscribeLocalDtableChanged = window.dtableSDK.subscribe('local-dtable-changed', () => { this.onDTableChanged(); });
    this.unsubscribeRemoteDtableChanged = window.dtableSDK.subscribe('remote-dtable-changed', () => { this.onDTableChanged(); });
    this.resetData();
  }

  onDTableConnect = () => {
    this.resetData();
  };

  onDTableChanged = () => {
    this.resetData();
  };

  resetData = () => {
    this.setState({isLoading: false});
  };

  onPluginToggle = () => {
    this.setState({showDialog: false});
    window.app.onClosePlugin();
  };

  render() {
    const { isLoading, showDialog } = this.state;
    if (isLoading) {
      return '';
    }

    const { collaborators } = window.app.state;
    const subtables = window.dtableSDK.getTables();

    return (
      <Modal isOpen={showDialog} toggle={this.onPluginToggle} className="dtable-plugin plugin-container" size="lg">
        <ModalHeader className="test-plugin-header" toggle={this.onPluginToggle}>{'Plugin'}</ModalHeader>
        <ModalBody className="test-plugin-content">
          <div>{`'dtable-subtables-length: '${subtables.length}`}</div>
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
