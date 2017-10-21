import { routerRedux } from 'dva/router'

export default {
  namespace: 'app',

  state: {
    ModifyVisible: false,
    canBack: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname !== '/home' && location.pathname !== '/') {
          dispatch({
            type: 'setBack'
          })
        } else {
          dispatch({
            type: 'hideBack'
          })
        }
      })
    },
  },

  effects: {
    * logout ({ payload }, { put }) {
      yield put(routerRedux.push('/login'))
    },

    * handleModifyAccount ({ payload }, { call, put }) {
      console.log(payload);
    }
  },

  reducers: {
    showModifyModal (state) {
      return {
        ...state,
        ModifyVisible: true
      }
    },

    hideModifyModal (state) {
      return {
        ...state,
        ModifyVisible: false
      }
    },

    setBack (state) {
      return {
        ...state,
        canBack: true
      }
    },

    hideBack (state) {
      return {
        ...state,
        canBack: false
      }
    },
  },
};
