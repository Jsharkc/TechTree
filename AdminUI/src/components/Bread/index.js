/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import React          from 'react';
import PropTypes      from 'prop-types';
import { Link }       from 'dva/router';
import Styles         from './index.less';
import pathToRegexp   from 'path-to-regexp';
import { queryArray } from '../../utils';
import {
  Breadcrumb,
  Icon
}                     from 'antd'

const Bread = ({ location, menu }) => {
  // 匹配当前路由
  let pathArray = []
  let current
  for (let index in menu) {
    if (menu[index].router && pathToRegexp(menu[index].router).exec(location.pathname)) {
      current = menu[index]
      break
    }
  }

  if (!current) {
    return (<div className={Styles.bread}>首页</div>)
  }

  // 递归查找父级
  const getPathArray = (item) => {
    pathArray.unshift(item)
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'))
    }
  }
  getPathArray(current)

  const breads = pathArray.map((item, key) => {
    const content = (
      <span>
        {item.icon ? <Icon type={item.icon} style={{ marginRight: 4 }} /> : ''}
        {item.name}
      </span>
    )

    return (
      <Breadcrumb.Item key={key}>
        {
          (pathArray.length - 1) !== key
            ? <Link to={item.router}>
                {content}
              </Link>
            : content
        }
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={Styles.bread}>
      <Breadcrumb>
        { breads }
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.array,
  location: PropTypes.object,
}

export default Bread
