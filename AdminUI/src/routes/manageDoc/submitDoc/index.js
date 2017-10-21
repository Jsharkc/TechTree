/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React       from 'react'
import { connect } from 'dva'
import DocList     from './docList'
import {
  Card,
  Modal,
}                  from 'antd'

const SubmitDoc = ({ manageDoc, dispatch, loading }) => {
  const {
    dataSource,
    previewVisible,
    previewNode
  } = manageDoc

  const DocListProps = {
    dataSource,
    loading,
    confirm (id) {
      dispatch({
        type: 'manageDoc/confirmTable',
        payload: id
      })
    },
    release (id) {
      dispatch({
        type: 'manageDoc/releaseTable',
        payload: id
      })
    },
    onPreview (tNode) {
      dispatch({
        type: 'manageDoc/showPreview',
        payload: tNode
      })
    }
  }

  const PreviewModalProps = {
    title: <div style={{fontSize: '16px'}}>知识点{previewNode.node}</div>,
    visible: previewVisible,
    footer: null,
    onCancel () {
      dispatch({
        type: 'manageDoc/hidePreview'
      })
    }
  }

  return (
    <Card style={{minHeight: '600px'}}>
      <DocList {...DocListProps} />
      <Modal {...PreviewModalProps}>
        <div>{previewNode.content || ''}</div>
      </Modal>
    </Card>
  )
}

export default connect(
  ({ manageDoc, loading }) => ({ manageDoc, loading: loading.models.manageDoc })
)(SubmitDoc)
