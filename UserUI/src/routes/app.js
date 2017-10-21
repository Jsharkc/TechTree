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
}                      from 'antd';

function App({ children, location, dispatch, app }) {
  const {
    ModifyVisible,
    aboutVisible,
    canBack,
    mode,
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
