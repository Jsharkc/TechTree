/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React from 'react'
import {
  Table,
  Tag,
  Button
}            from 'antd';

const list = ({ loading, dataSource, onPreview, confirm, release }) => {
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '用户名',
    dataIndex: 'name',
  }, {
    title: '新添节点',
    dataIndex: 'submit',
    render: t => {
      return (
        <div>
          <Tag onClick={() => onPreview(t)} color='#59ADF3'>{t.node}</Tag>
          <div>{t.content.length > 66 ? t.content.substring(0, 66) + '...' : t.content}</div>
        </div>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: '100px',
    render: (text, record) => (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Button style={{width: '100px'}}>通过</Button>
        <div style={{height: '10px'}} />
        <Button style={{width: '100px'}}>拒绝</Button>
      </div>
    )
  }]

  const pagination = {
    defaultPageSize: 10,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    defaultCurrent: 1,
    total: null,
  }

  return (
    <Table
      simple
      bordered
      loading={loading}
      pagination={pagination}
      dataSource={dataSource}
      columns={columns}
      rowKey={record => record.id}
      footer={() => <div style={{textAlign: 'center'}}>节点管理</div>}
    />
  )
}

export default list
