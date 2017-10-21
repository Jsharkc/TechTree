/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'dva';
import Styles      from './index.less';
import Canvas      from './canvas';
import Register    from './register';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Spin
}                  from 'antd';

const FormItem = Form.Item;

const Login = ({ login, dispatch, form: { getFieldDecorator, validateFieldsAndScroll } }) => {
  const { loginLoading, visible } = login;

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) { return }

      dispatch({
        type: 'login/login',
        payload: values
      });
    })
  }

  const RegisterProps = {
    visible,
    onCancel () {
      dispatch({
        type: 'login/hideModal'
      })
    }
  }

  return (
    <div className={Styles.form}>
      <Canvas />
      <span style={{color: '#383838', position: 'relative', fontSize: '25px'}}>TechTree</span>
      <Spin spinning={loginLoading} size='large'>
        <form>
          <FormItem hasFeedback>
            {
              getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  }
                ]
              })(
                <Input
                  size='large'
                  onPressEnter={handleOk}
                  placeholder='用户名'
                />
              )
            }
          </FormItem>
          <FormItem hasFeedback>
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  }
                ]
              })(
                <Input
                  size='large'
                  type='password'
                  onPressEnter={handleOk}
                  placeholder='密码'
                />
              )
            }
          </FormItem>
          <Row type="flex" justify="space-between">
            <Col span={11}>
              <Button
                type='primary'
                size='large'
                onClick={() => dispatch({ type: 'login/showModal' })}
                loading={loginLoading}>
                注册
              </Button>
            </Col>
            <Col span={11}>
              <Button
                type='primary'
                size='large'
                onClick={handleOk}
                loading={loginLoading}>
                登录
              </Button>
            </Col>
          </Row>
        </form>
      </Spin>
      <Register {...RegisterProps} />
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))