/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react';
import { Card }    from 'antd';
import { connect } from 'dva';
import TreeGraph   from './treeGraph';

const Home = ({ home, dispatch }) => {
  const { source } = home;

  const TreeProps = {
    source,
    onRoute (route) {
      dispatch({
        type: 'home/clickNode',
        payload: route
      })
    }
  }

  return (
    <Card>
      <TreeGraph {...TreeProps} />
    </Card>
  )
}

export default connect(
  ({ home, loading }) => ({ home, loading: loading.models.home })
)(Home)
