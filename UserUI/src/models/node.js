/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import { message }    from 'antd';
import { Query, Run } from '../services/node';

export default {
  namespace: 'node',

  state: {
    title: '/',
    quizID: '',
    quiz: '',
    prepCode: '',
    data: [],
    index: 0,
    num: 0,
    points: 0,
    result: '',
    code: ''
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
    * getNodeRoute ({ payload }, { select, call, put }) {
      const mode = yield select(state => state.mode);

      let res;

      if (payload.status == '16') {
        res = yield call(Query, {nid: payload.id, num: 3});
      } else if (payload.status == '18') {
        res = yield call(Query, {nid: payload.id, num: 1});
      } else {
        res = { status: 1 }
      }

      if (!res.status) {
        console.log(res.data)
        yield put({
          type: 'initQuiz',
          payload: {
            title: payload.title || 'none',
            data: res.data,
            quizID: res.data[0].id,
            quiz: res.data[0].desci,
            prepCode: res.data[0].prepcode,
          }
        })
      } else {
        message.warning('获取题库列表失败，请返回重试！')
      }
    },

    * run ({ payload }, { select, call, put }) {
      const code = yield select(state => state.node.code);
      const qid = yield select(state => state.node.quizID);

      const res = yield call(Run, { qid, code })

      yield put({
        type: 'setResult',
        payload: res.data
      })
    },

    * nextQuiz ({ payload }, { select, call, put }) {
      let index = yield select(state => state.node.index);
      let data = yield select(state => state.node.data);

      index += 1;

      yield put({
        type: 'next',
        payload: {
          quizID: data[index].id,
          quiz: data[index].desci,
          prepCode: data[index].prepcode,
          index
        }
      })
    }
  },

  reducers: {
    initQuiz (state, action) {
      return {
        ...state,
        data: action.payload.data,
        quizID: action.payload.quizID,
        quiz: action.payload.quiz,
        prepCode: action.payload.prepCode,
        title: action.payload.title,
      }
    },

    onChangeCode (state, action) {
      return {
        ...state,
        code: action.payload
      }
    },

    setResult (state, action) {
      return {
        ...state,
        result: action.payload
      }
    },

    next (state, action) {
      return {
        ...state,
        quizID: action.payload.quizID,
        quiz: action.payload.quiz,
        prepCode: action.payload.prepCode,
        index: action.payload.index
      }
    }
  }
}
