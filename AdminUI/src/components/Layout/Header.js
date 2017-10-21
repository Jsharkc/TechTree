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

import React       from 'react'
import PropTypes   from 'prop-types'
import styles      from './Header.less'
import Menus       from './Menu'
import {
  Menu,
  Icon,
  Popover,
  Modal,
  Form,
  Input
}                  from 'antd'

const SubMenu = Menu.SubMenu;
const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const Header = ({
  logout,
  switchSider,
  siderFold,
  isNavbar,
  menuPopoverVisible,
  location,
  switchMenuPopover,
  navOpenKeys,
  changeOpenKeys,
  menu,
  visible,
  showModal,
  adminOK,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  }
}) => {
  const handleClickMenu = e => {
    if (e.key === 'logout') {
      logout()
    } else if (e.key === 'change') {
      showModal()
    }
  };

  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  };

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) { return }

      const data = {
        ...getFieldsValue()
      }
      adminOK(data)
    })
  }

  const modalProps = {
    title: '修改账户',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <div className={styles.header}>
      {
        isNavbar
          ? <Popover
              placement="bottomLeft"
              onVisibleChange={switchMenuPopover}
              visible={menuPopoverVisible}
              overlayClassName={styles.popovermenu}
              trigger="click"
              content={<Menus {...menusProps} />}>
              <div className={styles.button}>
                <Icon type="bars" />
              </div>
            </Popover>
          : <div className={styles.button} onClick={switchSider}>
              <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
            </div>
      }
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{float: 'right'}}
            title={<span><Icon type="user" />管理员</span>}>
            <Menu.Item key="change">
              <a>修改</a>
            </Menu.Item>
            <Menu.Item key="logout">
              <a>注销</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <Modal {...modalProps}>
        <Form layout="horizontal">
          <FormItem label='账户' hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('account', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    min: 6,
                    max: 15,
                  },
                ],
              })(<Input />)
            }
          </FormItem>
          <FormItem label='原密码' hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('oldpass', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    min: 6,
                    max: 15,
                  },
                ],
              })(
                <Input type={'password'} />
              )
            }
          </FormItem>
          <FormItem label='新密码' hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('newpass', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    min: 6,
                    max: 15,
                  },
                ],
              })(<Input type={'password'} />)
            }
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

Header.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  showModal: PropTypes.func,
  adminOK: PropTypes.func,
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Form.create()(Header)
