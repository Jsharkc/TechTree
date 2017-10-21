import { routerRedux } from 'dva/router'

export default {
  namespace: 'app',

  state: {
    ModifyVisible: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
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
    }
  },
};
