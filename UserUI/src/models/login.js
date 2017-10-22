/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import { Login, Register } from '../services/login';
import { message }         from 'antd';
import { routerRedux }     from 'dva/router';

export default {
  namespace: 'login',

  state: {
    loginLoading: false,
    visible: false,
  },

  effects: {
    * login ({ payload }, { put, call }) {
      let res
      yield put({ type: 'showLoginLoading' })

      try {
        res = yield call(Login, payload)
      } catch (err) {
        yield put({ type: 'hideLoginLoading' });
        message.warn('登录失败');
      } finally {
        yield put({ type: 'hideLoginLoading' })
        if (!res.status) {
          // setToken(data.resp)
          // yield put({ type: 'app/saveToken', payload: data.resp })
          // const from = queryURL('from')
          // if (from) {
          //   yield put(routerRedux.push(from))
          // } else {
          //   yield put(routerRedux.push('/home'))
          // }

          yield put(routerRedux.push('/home'));
          message.info('登录成功！');
        } else {
          message.warn('登录失败');
          console.error(res);
        }
      }
    },

    * register ({ payload }, { put, call }) {
      const res = yield call(Register, payload);

      if (!res.status) {
        message.info('注册成功！');
        yield put({
          type: 'hideModal'
        })
      } else {
        message.warn('注册失败');
      }
    }
  },

  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },

    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },

    showModal (state) {
      return {
        ...state,
        visible: true
      }
    },

    hideModal (state) {
      return {
        ...state,
        visible: false
      }
    }
  }
}
