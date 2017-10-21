/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React     from 'react';
import PropTypes from 'prop-types';
import Styles    from './index.less';
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Radio,
  Dropdown,
  Button,
}                from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const Header = ({
  visible,
  onCancel,
  onModifyAccount,
  logout,
  showModify,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  }
}) => {
  const handleClickMenu = menu => {
    if (menu.key === 'modify') {
      showModify()
    } else if (menu.key === 'logout') {
      logout()
    }
  }

  const handleOK = () => {
    validateFields((errors, values) => {
      if (errors) { return }

      onModifyAccount(values);
      resetFields();
    })
  }

  const modalProps = {
    title: '修改账户',
    visible,
    onOk: handleOK,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <div className={Styles.header}>
      <img src={require('../../assets/logo.png')} height='36px' width='36px' className={Styles.logo} />
      <div className={Styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{float: 'right'}}
            title={<span><Icon type="user" />账户</span>}>
            <Menu.Item key="modify">
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
              })(<Input type={'password'} />)
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
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onModifyAccount: PropTypes.func,
  logout: PropTypes.func,
  showModify: PropTypes.func,
  form: PropTypes.object
}

export default Form.create()(Header)
