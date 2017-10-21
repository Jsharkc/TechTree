/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react';
import { Card }    from 'antd';
import { connect } from 'dva';

const Home = ({ home, dispatch }) => {
  return (
    <Card>
      Home
    </Card>
  )
}

export default connect(
  ({ home, loading }) => ({ home, loading: loading.models.home })
)(Home)
