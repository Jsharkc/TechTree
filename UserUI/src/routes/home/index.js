/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react';
import { Card }    from 'antd';
import { connect } from 'dva';
import TreeGraph   from './treeGraph';

const Home = () => {
  return (
    <Card>
      <TreeGraph/>
    </Card>
  )
}

export default Home
