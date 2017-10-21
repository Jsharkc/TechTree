import React       from 'react';
import { connect } from 'dva';
import Styles      from './app.css';

function App({ children, dispatch, app }) {
  return (
    <div className={Styles.loginPage}>{children}</div>
  );
}

App.protoTypes = {};

export default connect(({ app, loading }) => ({ app, loading }))(App);
