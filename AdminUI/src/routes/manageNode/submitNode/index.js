/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React       from 'react'
import { connect } from 'dva'
import NodeList    from './nodeList'
import {
  Card,
  Modal,
}                  from 'antd'

const SubmitNode = ({ manageNode, dispatch, loading }) => {
  const {
    dataSource,
    previewVisible,
    previewNode
  } = manageNode

  const NodeListProps = {
    dataSource,
    loading,
    confirm (id) {
      dispatch({
        type: 'manageNode/confirmTable',
        payload: id
      })
    },
    release (id) {
      dispatch({
        type: 'manageNode/releaseTable',
        payload: id
      })
    },
    onPreview (tNode) {
      dispatch({
        type: 'manageNode/showPreview',
        payload: tNode
      })
    }
  }

  const PreviewModalProps = {
    title: <div style={{fontSize: '16px'}}>节点{previewNode.node}</div>,
    visible: previewVisible,
    footer: null,
    onCancel () {
      dispatch({
        type: 'manageNode/hidePreview'
      })
    }
  }

  return (
    <Card style={{minHeight: '600px'}}>
      <NodeList {...NodeListProps} />
      <Modal {...PreviewModalProps}>
        <div>{previewNode.content || ''}</div>
      </Modal>
    </Card>
  )
}

export default connect(
  ({ manageNode, loading }) => ({ manageNode, loading: loading.models.manageNode })
)(SubmitNode)
