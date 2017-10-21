import React      from 'react';
import PropTypes  from 'prop-types';
import { Router } from 'dva/router';
import App        from './routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

function RouterConfig({ history, app }) {
  const routes = [{
    path: '/',
    component: App,
    getIndexRoute (nextState, cb) {
      require.ensure([], require => {
        registerModel(app, require('./models/manageUser'))
        cb(null, { component: require('./routes/manageUser/') })
      }, 'manageUser')
    },
    childRoutes: [{
      path: 'login',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/login'))
          cb(null, require('./routes/login/'))
        }, 'login')
      },
    }, {
      path: 'manageUser',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/manageUser'))
          cb(null, require('./routes/manageUser/'))
        }, 'manageUser')
      },
    }, {
      path: 'manageNode/submitNode',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/manageNode'))
          cb(null, require('./routes/manageNode/submitNode/'))
        }, 'submitNode')
      },
    }, {
      path: 'manageNode/modifyNode',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/manageNode'))
          cb(null, require('./routes/manageNode/modifyNode/'))
        }, 'modifyNode')
      },
    }, {
      path: 'manageDoc/submitDoc',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/manageDoc'))
          cb(null, require('./routes/manageDoc/submitDoc/'))
        }, 'submitDoc')
      },
    }, {
      path: 'manageDoc/modifyDoc',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/manageDoc'))
          cb(null, require('./routes/manageDoc/modifyDoc/'))
        }, 'modifyDoc')
      },
    }, {
      path: 'manageTest/submitTest',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/manageTest'))
          cb(null, require('./routes/manageTest/submitTest/'))
        }, 'submitTest')
      },
    }, {
      path: 'manageTest/modifyTest',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/manageTest'))
          cb(null, require('./routes/manageTest/modifyTest/'))
        }, 'modifyTest')
      },
    },]
  }];

  return <Router history={history} routes={routes} />
}

RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default RouterConfig
