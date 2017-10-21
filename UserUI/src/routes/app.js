import React       from 'react';
import { connect } from 'dva';
import config      from '../utils/config';
import Styles      from './app.less';
import Header      from '../components/Header/index';
import Footer      from '../components/Footer/index';

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
    showAbout () {
      dispatch({
        type: 'app/showAbout'
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
    </div>
  )
}

App.protoTypes = {};

export default connect(({ app, loading }) => ({ app, loading }))(App);
