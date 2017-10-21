/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React       from 'react';
import { connect } from 'dva';
import UserList    from './userList';
import {
  Card,
  Modal,
}                  from 'antd'

const ManageUser = ({ manageUser, dispatch, loading }) => {
  const {
    dataSource,
    expandedData,
    expandedRowKey
  } = manageUser

  const UserListProps = {
    dataSource,
    loading,
    expandedRowKey,
    expandedData,
    confirm (id) {
      dispatch({
        type: 'manageUser/confirmTable',
        payload: id
      })
    },
    release (id) {
      dispatch({
        type: 'manageUser/releaseTable',
        payload: id
      })
    },
    getExpandedData (id) {
      dispatch({
        type: 'manageUser/getExpandedData',
        payload: id
      })
    },
    RowKeysChange (keys) {
      dispatch({
        type: 'manageUser/changeExpandedRow',
        payload: keys.slice(-1)
      })
    }
  }

  return (
    <Card style={{minHeight: '600px'}}>
      <UserList {...UserListProps} />
    </Card>
  )
}

export default connect(
  ({ manageUser, loading }) => ({ manageUser, loading: loading.models.manageUser })
)(ManageUser)
