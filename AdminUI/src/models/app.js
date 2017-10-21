import { routerRedux } from 'dva/router'
import { logout }      from '../services/app'
import { setToken }    from '../utils/request'

export default {
  namespace: 'app',

  state: {
    user: {},
    loginButtonLoading: false,
    menuPopoverVisible: false,
    token: '',
    siderFold: localStorage.getItem('SiderFold') === 'true',
    darkTheme: localStorage.getItem('DarkTheme') === 'true',
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
      // 暂时没有登出接口，现在只是清除本地token
      // const data = yield call(logout, parse(payload))
      localStorage.removeItem('AuthToken')
      yield put({ type: 'readToken' })
      yield put(routerRedux.push('/login'))
    },

    * switchSider ({ payload }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },

    * changeTheme ({ payload }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },

    * changeNavbar ({ payload }, { put }) {
      if (document.body.clientWidth < 769) {
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

    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },

    handleSwitchSider (state) {
      localStorage.setItem('SiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    handleChangeTheme (state) {
      localStorage.setItem('DarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
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
