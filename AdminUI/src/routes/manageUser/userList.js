/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React         from 'react'
import ExpandedTable from './expandedTable'
import {
  Table,
  Button
}                    from 'antd';

const list = ({
  loading,
  dataSource,
  expandedData,
  confirm,
  release,
  expandedRowKey,
  getExpandedData,
  RowKeysChange,
}) => {
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '用户名',
    dataIndex: 'name',
  }, {
    title: '刷题记录',
    dataIndex: 'record',
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: '100px',
    render: (text, record) => (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Button style={{width: '100px'}}>管理</Button>
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

  const expandedTableProps = {
    data: expandedData,
  }

  const onExpandedTable = (expanded, record) => {
    getExpandedData(record.id)
  }

  return (
    <Table
      simple
      bordered
      // loading={loading}
      pagination={pagination}
      dataSource={dataSource}
      columns={columns}
      rowKey={record => record.id}
      footer={() => <div style={{textAlign: 'center'}}>用户管理</div>}
      expandedRowRender={() => <ExpandedTable {...expandedTableProps} />}
      onExpand={onExpandedTable}
      expandedRowKeys={expandedRowKey}
      onExpandedRowsChange={(key) => RowKeysChange(key)}
    />
  )
}

export default list
