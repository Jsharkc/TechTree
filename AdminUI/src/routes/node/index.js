/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react'
import { connect } from 'dva'
import Styles      from './index.less'
import {
  Button,
}                  from 'antd'

const string = `Rotondeis an experiment into the idea of self-hosted social media feeds.\
              As described by its own specification, it is "platform agnostic", meaning that it doesn't need to be tied to a specific website, service or API.\
              You can host the data anywhere, and distribute it in any fashion you like, as long as the structure of the data is correct.\n\
              @neauoire has opened a new codebase that brings the Rotonde concept to Beaker Browser, sa p2p web-browser built on top of the dat protocol.\
              The code in this repository is still very bleeding edge, and requires manual installation. This guide will demonstrate setup of Rotonde within Beaker,\
              allowing you to create new posts and follow other Rotonde users.`

const Node = ({ node, dispatch }) => {
  const {
    route
  } = node

  return (
    <div className={Styles.page}>
      <div className={Styles.left}>
        <span style={{fontSize: '15px'}}>
          <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px'}}>{route}</div>
          {
            string.split('\n').map((p, index) => <div key={index}><p style={{textIndent: '25px'}}>{p}</p><br /></div>)
          }
        </span>
        <div style={{textAlign: 'center'}}>
          <Button>
            下一题
          </Button>
        </div>
      </div>
      <div className={Styles.right}>
        <textarea autoFocus={true} placeholder="输入代码" className={Styles.textarea} />
        <div className={Styles.result}>
          { '测试结果' }
          <Button className={Styles.run}>
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
