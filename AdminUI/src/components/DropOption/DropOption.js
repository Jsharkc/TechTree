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

import React     from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  Button,
  Icon,
  Menu
}                from 'antd'

const DropOption = ({ onMenuClick, menuOptions = [], buttonStyle, dropDownProps }) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)

  return (
    <Dropdown
      overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
      {...dropDownProps}>
      <Button style={{ ...buttonStyle }}>
        <Icon style={{ marginRight: 2 }} type="bars" />
        <Icon type="down" />
      </Button>
    </Dropdown>
  )
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropDownProps: PropTypes.object,
}

export default DropOption