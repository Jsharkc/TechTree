/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import { message } from 'antd';

export default {
  namespace: 'manageUser',

  state: {
    dataSource: [{
      id: 1,
      name: 'hawayi',
      phone: '18902387438',
      record: 5,
    }, {
      id: 2,
      name: 'john',
      phone: '17893204389',
      record: 6
    }, {
      id: 3,
      name: 'jack',
      phone: '12938934893',
      record: 8
    }],
    expandedData: [{
      id: 1,
      content: 'sdkjnskdjfsdfsdf',
      time: '2017-09-23 13:45'
    }],
    expandedRowKey: []
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/manageUser') {
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

    * getExpandedData ({ payload }, { call, put }) {
      // const res = yield call(querySubPetList, { speciesId: payload })

      if (res.status === 0) {
        yield put({
          type: 'setExpandedData',
          payload: {
            data: res.resp
          }
        })
      } else {
        message.error('数据获取失败')
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      const { dataSource } = action.payload
      return {
        ...state,
        dataSource
      }
    },

    changeExpandedRow (state, action) {
      return {
        ...state,
        expandedRowKey: action.payload
      }
    }
  }
}
