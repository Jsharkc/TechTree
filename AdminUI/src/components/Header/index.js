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
  mode,
  onCancel,
  canBack,
  onModifyAccount,
  logout,
  goBack,
  showModify,
  showAbout,
  onChangeMode,
  onClickAdd,
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
    } else if (menu.key === 'about') {
      showAbout()
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

  const menu = (
    <Menu onClick={onClickAdd}>
      <Menu.Item key="addNode">
        <a>添加节点</a>
      </Menu.Item>
      <Menu.Item key="addTest">
        <a>添加考题</a>
      </Menu.Item>
      <Menu.Item key="addDoc">
        <a>添加知识点</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={Styles.header}>
      {
        canBack
          ? <Icon
              type='arrow-left'
              className={Styles.back}
              onClick={goBack}
            />
          : <div style={{display: 'flex', alignItems: 'center', padding: '0 16px'}}>
              <RadioGroup defaultValue={mode} onChange={onChangeMode}>
                <RadioButton
                  className={Styles.radioButton}
                  style={mode === 'quiz' ? {background: '#2EDCE5', color: '#383838'} : {}}
                  value="quiz">
                  闯关
                </RadioButton>
                <RadioButton
                  className={Styles.radioButton}
                  style={mode === 'learn' ? {background: '#2EDCE5', color: '#383838'} : {}}
                  value="learn">
                  学习
                </RadioButton>
              </RadioGroup>
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                  添加 <Icon type="down" />
                </Button>
              </Dropdown>
            </div>
      }
      <img src={require('../../assets/logo.png')} height='36px' width='36px' className={Styles.logo} />
      <div className={Styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <Menu.Item key="about">
            <a>关于</a>
          </Menu.Item>
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
  mode: PropTypes.string.isRequired,
  canBack: PropTypes.bool,
  onCancel: PropTypes.func,
  onModifyAccount: PropTypes.func,
  logout: PropTypes.func,
  goBack: PropTypes.func,
  showModify: PropTypes.func,
  showAbout: PropTypes.func,
  onChangeMode: PropTypes.func,
  onClickAdd: PropTypes.func,
  form: PropTypes.object
}

export default Form.create()(Header)
