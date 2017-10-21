/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'dva';
import Styles      from './index.less';
import {
  Button,
  Form,
  Input,
  Spin
}                  from 'antd';

const FormItem = Form.Item;

const Login = ({ login, dispatch, form: { getFieldDecorator, validateFieldsAndScroll } }) => {
  const { loginLoading } = login;

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) { return }

      dispatch({
        type: 'login/login',
        payload: values
      });
    })
  }

  return (
    <div className={Styles.form}>
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
          <Button
            type='primary'
            size='large'
            onClick={handleOk}
            loading={loginLoading}>
            登录
          </Button>
        </form>
      </Spin>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
