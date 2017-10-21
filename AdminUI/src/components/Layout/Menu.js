/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/08/22        Wang RiYu
 */

import React        from 'react'
import PropTypes    from 'prop-types'
import { Link }     from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import {
  arrayToTree,
  queryArray
}                   from '../../utils'
import {
  Menu,
  Icon,
  Tooltip
}                   from 'antd'

const Menus = ({
  siderFold,
  darkTheme,
  location,
  handleClickNavMenu,
  menu
}) => {
  // 生成树状
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== -1), 'id', 'mpid')
  const levelMap = {}

  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN) => {
    return menuTreeN.map(item => {
      if (item.children) {
        if (item.mpid) {
          levelMap[item.id] = item.mpid
        }

        return (
          <Menu.SubMenu
            key={item.id}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                {(!siderFoldN || menuTree.indexOf(item) < 0) && item.name}
              </span>
            }>
            {getMenus(item.children, siderFoldN)}
          </Menu.SubMenu>
        )
      }

      return (
        <Menu.Item key={item.id}>
          {
            siderFoldN
              ? <Tooltip title={item.name} placement='right'>
                  <Link to={item.router}>
                    {item.icon ? <Icon type={item.icon} /> : null}
                    {(!siderFoldN || menuTree.indexOf(item) < 0) && item.name}
                  </Link>
                </Tooltip>
              : <Link to={item.router}>
                  {item.icon ? <Icon type={item.icon} /> : null}
                  {(!siderFoldN || menuTree.indexOf(item) < 0) && item.name}
                </Link>
          }
        </Menu.Item>
      )
    })
  }

  const menuItems = getMenus(menuTree, siderFold)

  // 保持选中
  const getAncestorKeys = (key) => {
    let map = {}
    const getParent = (index) => {
      const result = [String(levelMap[index])]
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0])
      }
      return result
    }
    for (let index in levelMap) {
      if ({}.hasOwnProperty.call(levelMap, index)) {
        map[index] = getParent(index)
      }
    }
    return map[key] || []
  }

  // 寻找选中路由
  let currentMenu
  let defaultSelectedKeys
  for (let item of menu) {
    if (item.router && pathToRegexp(item.router).exec(location.pathname)) {
      currentMenu = item
      break
    }
  }
  const getPathArray = (array, current, pid, id) => {
    let result = [String(current[id])]
    const getPath = (item) => {
      if (item[pid]) {
        result.unshift(String(item[pid]))
        getPath(queryArray(array, item[pid], id))
      }
    }
    getPath(current)
    return result
  }
  if (currentMenu) {
    defaultSelectedKeys = getPathArray(menu, currentMenu, 'mpid', 'id')
  }

  return (
    <Menu
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={defaultSelectedKeys}>
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  handleClickNavMenu: PropTypes.func,
}

export default Menus
