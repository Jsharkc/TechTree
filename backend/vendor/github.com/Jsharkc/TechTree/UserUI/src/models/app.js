import { routerRedux } from 'dva/router'

export default {
  namespace: 'app',

  state: {
    token: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'readToken' })
    },
  },

  effects: {
    * readToken ({ payload }, { put }) {
      let token = localStorage.getItem('LoginAuthToken');

      if (!token) {
        yield put(routerRedux.push('/login'))
      } else {
        yield put({
          type: 'handleReadToken',
          payload: token
        })
      }
    },
  },

  reducers: {
    handleReadToken (state, { payload: token }) {
      return {
        ...state,
        token,
      }
    },
  },
};
