/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

export default {
  namespace: 'manageNode',

  state: {
    previewVisible: false,
    previewNode: {},
    dataSource: [{
      id: 1,
      name: '是否能',
      submit: {
        node: 'go',
        content: '是的覅金额为福建违法未付费'
      }
    }, {
      id: 2,
      name: '问客服',
      submit: {
        node: 'framework',
        content: '网络客服没玩了法'
      }
    }, {
      id: 3,
      name: '让我来看房',
      submit: {
        node: 'grammar',
        content: '为佛教违反没我份'
      }
    }]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/manageNode/submitNode') {
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
