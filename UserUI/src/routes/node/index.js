/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react'
import { connect } from 'dva'
import Styles      from './index.less'
import {
  Button,
  Input
}                  from 'antd'

const { TextArea } = Input;

const Node = ({ node, dispatch }) => {
  const {
    title,
    quizID,
    quiz,
    data,
    prepCode,
    code,
    result,
  } = node

  const CodeInputProps = {
    rows: 18,
    onChange (e) {
      dispatch({
        type: 'node/onChangeCode',
        payload: e.target.value
      })
    },
    // defaultValue: prepCode,
    placeholder: '输入完整代码',
    className: Styles.textarea
  }

  return (
    <div className={Styles.page}>
      <div className={Styles.left}>
        <span style={{fontSize: '15px'}}>
          <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px'}}>{title}</div>
          {
            quiz && quiz.indexOf('\n') >= 0
              ? quiz.split('\n').map((p, index) => <div key={index}><p style={{textIndent: '25px'}}>{p}</p><br /></div>)
              : <div><p style={{textIndent: '25px'}}>{quiz}</p><br /></div>
          }
        </span>
        <div style={{textAlign: 'center'}}>
          <Button onClick={() => dispatch({ type: 'node/nextQuiz' })}>
            下一题
          </Button>
        </div>
      </div>
      <div className={Styles.right}>
        <TextArea {...CodeInputProps} />
        <div className={Styles.result}>
          { result || '测试结果' }
          <Button className={Styles.run} onClick={() => dispatch({ type: 'node/run' })}>
            运行
          </Button>
        </div>
      </div>
    </div>
  )
}

export default connect(
  ({ node, loading }) => ({ node, loading: loading.models.node })
)(Node)
