/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react';
import { Card }    from 'antd';
import { connect } from 'dva';
import TreeGraph   from './treeGraph';

const Home = ({ home, loading }) => {
  const { source } = home;

  return (
    <Card>
      <TreeGraph source={source} />
    </Card>
  )
}

export default connect(
  ({ home, loading }) => ({ home, loading: loading.models.home })
)(Home)
