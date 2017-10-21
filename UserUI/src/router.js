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
        registerModel(app, require('./models/home'))
        cb(null, { component: require('./routes/home/') })
      }, 'home')
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
      path: 'home',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/home'))
          cb(null, require('./routes/home/'))
        }, 'home')
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
