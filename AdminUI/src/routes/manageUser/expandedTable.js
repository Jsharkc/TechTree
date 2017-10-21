/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React          from 'react'
import PropTypes      from 'prop-types'
import Styles         from './index.less'
import {
  Table,
}                     from 'antd'

const expandedTable = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '20%',
    }, {
      title: '题目内容',
      dataIndex: 'content',
    }, {
      title: '完成时间',
      dataIndex: 'time',
      width: '20%',
    },
  ]

  const EmptyDiv = {
    height: '66px',
    lineHeight: '66px',
    background: '#f5f2f9'
  }

  const pagination = {
    defaultPageSize: 10,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    defaultCurrent: 1,
    total: null,
  }

  return (
    <div>
      {
        data.length > 0
          ? <Table
              className={Styles.expandedTable}
              columns={columns}
              dataSource={data}
              pagination={pagination}
              bordered
              rowKey={record => record.id}
            />
          : <div style={EmptyDiv}>此列表为空</div>
      }
    </div>
  )
}

expandedTable.propTypes = {
  data: PropTypes.array
}

export default expandedTable
