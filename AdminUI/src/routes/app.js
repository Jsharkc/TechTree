import React           from 'react';
import { connect }     from 'dva';
import PropTypes       from 'prop-types';
import config          from '../utils/config';
import Styles          from './app.less';
import Header          from '../components/Header/index';
import Footer          from '../components/Footer/index';

function App({ children, location, dispatch, app }) {
  const {
    ModifyVisible,
  } = app;

  const headerProps = {
    visible: ModifyVisible,
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
  }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div className={Styles.loginPage}>{ children }</div>
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
