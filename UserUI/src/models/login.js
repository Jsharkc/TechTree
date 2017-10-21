/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import { login } from '../services/login'

export default {
  namespace: 'login',

  state: {
    loginLoading: false,
    visible: false,
  },

  effects: {

  },

  reducers: {
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
