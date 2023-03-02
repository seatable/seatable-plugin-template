import React from 'react';
import PropTypes from 'prop-types';
import DTable from 'dtable-sdk';
import intl from 'react-intl-universal';
import './locale/index.js';

import './assets/css/plugin-layout-2.css';

const propTypes = {
  isDevelopment: PropTypes.bool,
  showDialog: PropTypes.bool,
  row: PropTypes.object, // If the plugin is opened with a button, it will have a row parameter
};

class App2 extends React.Component {

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
    setTimeout(() => {
      this.setState({
        showDialog: false,
        isIndexPage: true,
      });
    }, 500);
    window.app && window.app.onClosePlugin && window.app.onClosePlugin();
  }

  render() {
    const {  isLoading, showDialog } = this.state;
    if (isLoading || !showDialog) {
      return '';
    }

    let subtables = this.dtable.getTables();
    let collaborators = this.dtable.getRelatedUsers();

    return (
      <div className="dtable-plugin xx-plugin">
        <div className="xx-plugin-header">
          <div className='plugin-name'>{'Plugin'}</div>
          <div className='plugin-close'>
            <span onClick={this.onPluginToggle}>X</span>
          </div>
        </div>
        <div className="xx-plugin-content">
          <div>{`'dtable-subtables: '${JSON.stringify(subtables)}`}</div>
          <br></br>
          <div>{`'dtable-collaborators: '${JSON.stringify(collaborators)}`}</div>
          <div className="mt-4">
            <h2 className="text-left">{intl.get('international_demo')}</h2>
            <div>{intl.get('shanshui')}</div>
            <div>{intl.get('hello_someone', {name: '小强'})}</div>
            <div>{intl.getHTML('contans_html_params', {params: '参数1，参数2'})}</div>
          </div>
        </div>
      </div>
    );
  }
}

App2.propTypes = propTypes;

export default App2;
