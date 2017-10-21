import React           from 'react';
import { connect }     from 'dva';
import PropTypes       from 'prop-types';
import config          from '../utils/config';
import Styles          from './app.less';
import { routerRedux } from 'dva/router'
import Header          from '../components/Header/index';
import Footer          from '../components/Footer/index';
import {
  Modal,
  Icon,
  Select,
  Input
}                      from 'antd';

const Option = Select.Option;
const options = [
  {
    id: '0',
    label: 'Go'
  }, {
    id: '1',
    label: '语法'
  }, {
    id: '2',
    label: '框架'
  }, {
    id: '3',
    label: '实例'
  }
];

function App({ children, location, dispatch, app }) {
  const {
    ModifyVisible,
    aboutVisible,
    addModalVisible,
    canBack,
    mode,
    add,
  } = app;

  const headerProps = {
    visible: ModifyVisible,
    mode,
    canBack,
    goBack () {
      dispatch(routerRedux.goBack());
    },
    onCancel () {
      dispatch({
        type: 'app/hideModifyModal'
      })
    },
    onModifyAccount (data) {
      dispatch({
        type: 'app/handleModifyAccount',
        payload: data
      })
    },
    logout () {
      dispatch({
        type: 'app/logout'
      })
    },
    showModify () {
      dispatch({
        type: 'app/showModifyModal'
      })
    },
    showAbout () {
      dispatch({
        type: 'app/showAbout'
      })
    },
    onChangeMode (e) {
      dispatch({
        type: 'app/changeMode',
        payload: e.target.value
      })
    },
    onClickAdd (e) {
      if (e.key === 'addNode') {
        dispatch({
          type: 'app/addNode'
        })
      } else if (e.key === 'addDoc') {
        dispatch({
          type: 'app/addDoc'
        })
      } else {
        dispatch({
          type: 'app/addTest'
        })
      }
    }
  }

  const aboutModalProps = {
    footer: null,
    style: {top: 'calc(50% - 150px)'},
    visible: aboutVisible,
    onCancel () {
      dispatch({
        type: 'app/hideAbout'
      })
    }
  }

  const addModalProps = {
    title: (
      <div style={{textAlign: 'center'}}>
        {
          add === 'node' ? '添加节点' : add === 'doc' ? '添加文档' : '添加考题'
        }
      </div>
    ),
    width: '500px',
    visible: addModalVisible,
    maskClosable: false,
    onCancel () {
      dispatch({
        type: 'app/hideAddModal'
      })
    }
  }

  const addNodeModal = (
    <div>
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="选择父节点"
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
        {
          options.map(node => <Option key={node.id} value={node.id}>{node.label}</Option>)
        }
      </Select>
      <Input
        style={{marginTop: '30px'}}
        placeholder='输入节点名'
      />
      <Input
        style={{marginTop: '30px'}}
        placeholder='输入简介'
      />
    </div>
  )

  const addDocModal = doc => {
    if (doc === 'test') {
      return (
        <div>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="选择节点"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
            {
              options.map(node => <Option key={node.id} value={node.id}>{node.label}</Option>)
            }
          </Select>
          <Input
            style={{marginTop: '30px'}}
            placeholder='添加考题'
            type='textarea'
            rows={5}
          />
        </div>
      )
    } else if (doc === 'doc') {
      return (
        <div>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="选择节点"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
            {
              options.map(node => <Option key={node.id} value={node.id}>{node.label}</Option>)
            }
          </Select>
          <Input
            style={{marginTop: '30px'}}
            placeholder='添加知识点'
            type='textarea'
            rows={5}
          />
        </div>
      )
    }
  }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{ children }</div>
  }

  return (
    <div>
      <div className={Styles.layout}>
        <div className={Styles.main}>
          <Header {...headerProps} />
          <div className={Styles.container}>
            <div className={Styles.content}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Modal {...addModalProps}>
        {
          add === 'node' ? addNodeModal : addDocModal(add)
        }
      </Modal>
      <Modal {...aboutModalProps}>
        <div style={{height: '80px', display: 'flex', alignItems: 'center'}}>
          <img src={require('../assets/logo.png')} height='60px' width='60px' style={styles.infoImg} />
          <div style={styles.name}>
            SmartestEE
          </div>
        </div>
        <div style={{height: '136px'}}>
          <div style={styles.infoDiv}>
            <Icon type="mail" style={{fontSize: '30px', color: '#cccccc'}} />
            <div style={styles.subTitle}>email</div>
            <span style={styles.infoSpan}>example@gmail.com</span>
          </div>
          <div style={styles.infoDiv}>
            <Icon type="mobile" style={{fontSize: '30px', color: '#cccccc'}} />
            <div style={styles.subTitle}>mobile</div>
            <span style={styles.infoSpan}>18892738273</span>
          </div>
          <div style={styles.infoDiv}>
            <Icon type="idcard" style={{fontSize: '30px', color: '#cccccc'}} />
            <div style={styles.subTitle}>github</div>
            <a href='https://github.com/TechCatsLab' target='_blank' style={styles.infoSpan}>
              <u>TechCatsLab</u>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const styles = {
  infoImg: {
    background: '#ffffaf',
    borderRadius: '50%',
    marginLeft: '10px',
    fontSize: '30px',
  },

  name: {
    fontSize: '25px',
    marginLeft: '10px'
  },

  infoSpan: {
    fontSize: '20px',
    width: '300px',
    overflow: 'hidden',
  },

  subTitle: {
    width: '80px',
    fontSize: '20px',
    marginLeft: '25px'
  },

  infoDiv: {
    height: '35px',
    width: '490px',
    overflow: 'hidden',
    margin: '0 0 10px 60px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}

App.protoTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
