/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import { routerRedux } from 'dva/router';
import { message }     from 'antd';
import { arrayToTree } from '../utils/index';
import {
  GetNodes,
}                      from '../services/home';

export default {
  namespace: 'home',

  state: {
    nodes: [],
    source: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/home' || location.pathname === '/') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload }, { call, put }) {
      const res = yield call(GetNodes, {});

      if (!res.status) {
        let array = res.data || [];

        yield put({
          type: 'setSource',
          payload: {
            source: arrayToTree(array)[0],
            nodes: array
          }
        })
      } else {
        message.warn('获取节点失败')
      }
    },

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
    setSource (state, action) {
      return {
        ...state,
        source: action.payload.source,
        nodes: action.payload.nodes,
      };
    },
  },
};
