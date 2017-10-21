import { routerRedux } from 'dva/router'

export default {
  namespace: 'app',

  state: {
    ModifyVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {

      })
    },
  },

  effects: {
    * logout ({ payload }, { put }) {
      yield put(routerRedux.replace('/login'))
    },

    * handleModifyAccount ({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: 'hideModifyModal'
      })
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
  },
};
