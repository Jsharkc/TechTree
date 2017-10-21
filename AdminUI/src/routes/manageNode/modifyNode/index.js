/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React from 'react';
import {
  Card,
  Select,
  Col,
  Button
}            from 'antd';

const Option = Select.Option;
const options = [
  {
    id: '0',
    label: 'Go'
  }, {
    id: '1',
    label: '语法'
  }, {
    id: '2',
    label: '框架'
  }, {
    id: '3',
    label: '实例'
  }
];

const ModifyNode = () => {
  return (
    <Card>
      <Col span={5}>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="选择节点"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
          {
            options.map(node => <Option key={node.id} value={node.id}>{node.label}</Option>)
          }
        </Select>
      </Col>
      <Button>修改</Button>
    </Card>
  )
}

export default ModifyNode
