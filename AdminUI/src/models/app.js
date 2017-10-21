import { routerRedux } from 'dva/router'

export default {
  namespace: 'app',

  state: {
    ModifyVisible: false,
    aboutVisible: false,
    add: 'node', // doc、test
    addNodeModal: false,
    addDocModal: false,
    addTestModal: false,
    canBack: false,
    mode: 'quiz', // or learn
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
      yield put(routerRedux.replace('/login'))
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

    changeMode (state, action) {
      return {
        ...state,
        mode: action.payload
      }
    },

    showAbout (state) {
      return {
        ...state,
        aboutVisible: true,
      }
    },

    hideAbout (state) {
      return {
        ...state,
        aboutVisible: false,
      }
    },

    addNode (state) {
      return {
        ...state,
        add: 'node',
        addNodeModal: true
      }
    },

    addDoc (state) {
      return {
        ...state,
        add: 'doc',
        addDocModal: true
      }
    },

    addTest (state) {
      return {
        ...state,
        add: 'test',
        addTestModal: true
      }
    },

    hideAddModal (state) {
      return {
        ...state,
        addNodeModal: false
      }
    },

    hideDocModal (state) {
      return {
        ...state,
        addDocModal: false
      }
    },

    hideTestModal (state) {
      return {
        ...state,
        addTestModal: false
      }
    },
  },
};
