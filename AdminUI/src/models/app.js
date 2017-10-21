import { routerRedux } from 'dva/router'
import { logout }      from '../services/app'
import { setToken }    from '../utils/request'

export default {
  namespace: 'app',

  state: {
    menuPopoverVisible: false,
    token: '',
    siderFold: localStorage.getItem('SiderFold') === 'true',
    isNavbar: document.body.clientWidth < 769,
    modalVisible: false
  },

  subscriptions: {
    setup ({ dispatch }) {
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' })
      }
      dispatch({ type: 'readToken' })
    }
  },

  effects: {
    * readToken ({ payload }, { put }) {
      // let token = localStorage.getItem(`${prefix}authToken`)
      // if (!token) {
      //   yield put(routerRedux.push('/login'))
      // } else {
      //   yield put({ type: 'handleReadToken', payload: token })
      // }
    },

    * logout ({ payload }, { call, put }) {
      // const data = yield call(logout, parse(payload))
      // yield put({ type: 'readToken' })
      yield put(routerRedux.replace('/login'))
    },

    * switchSider ({ payload }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },

    * changeNavbar ({ payload }, { put }) {
      if (document.body.clientWidth < 768) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },

    * switchMenuPopver ({ payload }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },

    * saveToken ({ payload }, { put }) {
      yield put({
        type: 'handleSaveToken',
        payload,
      })
    },

    * updateAdminAccount ({ payload }, { call, put }) {
      // const res = yield call(updateAdmin, payload)
    }
  },

  reducers: {
    queryUserSuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },

    handleSwitchSider (state) {
      localStorage.setItem('SiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },

    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },

    showAdminModal (state) {
      return {
        ...state,
        modalVisible: true,
      }
    },

    hideAdminModal (state) {
      return {
        ...state,
        modalVisible: false
      }
    },

    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleSaveToken (state, { payload: token }) {
      localStorage.setItem('AuthToken', token)
      return {
        ...state,
        token,
      }
    },

    handleReadToken (state, { payload: token }) {
      setToken(token)
      return {
        ...state,
        token,
      }
    }
  }
}
