/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import { routerRedux } from 'dva/router';

export default {
  namespace: 'home',

  state: {
    source: {
      label: 'Go',
      color: '#86D560',
      children: [{
        label: '语法',
        route: 'grammar',
        children: [{
          label: 'Graph',
          route: 'graph',
        }, {
          label: 'Net',
          route: 'net',
        }, {
          label: 'Tree',
          route: 'tree',
        }]
      }, {
        label: '框架',
        route: 'framework',
        children: [{
          label: 'Canvas',
          route: 'canvas',
        }, {
          label: 'Handler',
          route: 'handler'
        }, {
          label: 'Layout',
          route: 'layout',
          children: [{
            label: 'a',
            route: 'a'
          }, {
            label: 'b',
            route: 'b',
            children: [{
              label: 'a',
              route: 'a'
            }, {
              label: 'b',
              route: 'b'
            }]
          }]
        }]
      }, {
        label: '实例',
        route: 'sample',
        color: '#86D560',
        children: [{
          label: 'Matrix',
          route: 'matrix',
          color: '#86D560'
        }, {
          label: 'Color',
          route: 'color',
        }, {
          label: 'Util',
          route: 'util',
          size: 30
        }]
      }]
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * clickNode ({ payload }, { select, put }) {
      const mode = yield select(state => state.app.mode);

      yield put(routerRedux.push({
        pathname: '/node',
        query: {
          mode,
          route: payload
        }
      }))
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
