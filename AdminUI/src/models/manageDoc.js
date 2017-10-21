/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

export default {
  namespace: 'manageDoc',

  state: {
    previewVisible: false,
    previewNode: {},
    dataSource: [{
      id: 1,
      name: '加速度',
      submit: {
        node: 'go',
        content: '暗示明年打算的'
      }
    }, {
      id: 2,
      name: '是的烦恼',
      submit: {
        node: 'ksjd',
        content: '网文件筐违反络客服没玩了法'
      }
    }]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/manageDoc/submitDoc') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    }
  },

  effects: {
    * query ({ payload }, { call, put }) {
      // const res = yield call(queryTableOrder, {})
      //
      // if (res.status === 0) {
      //   yield put({
      //     type: 'querySuccess',
      //     payload: {
      //       list: res.resp,
      //     }
      //   })
      // } else {
      //   message.error(Strings.Common.QueryFailed)
      // }
    },

    * confirmTable ({ payload }, { call, put }) {
      // const res = yield call(confirmTableOrder, { id: payload })
      //
      // if (res.status === 0) {
      //   yield put({
      //     type: 'query'
      //   })
      // } else {
      //   message.error(Strings.Common.FailedOption)
      // }
    },

    * releaseTable ({ payload }, { call, put }) {
      // const res = yield call(releaseTableOrder, { id: payload })
      //
      // if (res.status === 0) {
      //   yield put({
      //     type: 'query'
      //   })
      // } else {
      //   message.error(Strings.Common.FailedOption)
      // }
    }
  },

  reducers: {
    querySuccess (state, action) {
      const { dataSource } = action.payload
      return {
        ...state,
        dataSource
      }
    },

    showPreview (state, action) {
      return {
        ...state,
        previewNode: action.payload,
        previewVisible: true
      }
    },

    hidePreview (state) {
      return {
        ...state,
        previewVisible: false
      }
    },
  }
}
