/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

export default {
  namespace: 'node',

  state: {
    route: '/go'
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/node') {
          dispatch({
            type: 'getNodeRoute',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    * getNodeRoute ({ payload }, { put }) {
      yield put({
        type: 'setNodeRoute',
        payload: payload.route
      })
    },
  },

  reducers: {
    setNodeRoute (state, action) {
      return {
        ...state,
        route: action.payload
      }
    }
  }
}
