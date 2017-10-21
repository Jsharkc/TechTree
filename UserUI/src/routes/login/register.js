/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React       from 'react'
import {
  Modal,
  Form,
  Input,
}                  from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const register = (
  {
    visible,
    onCancel,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
    },
  }
) => {
  const register = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) { return }
      console.log(values)
      onCancel()
    })
  }

  const modalProps = {
    title: '注册',
    visible,
    onOk: register,
    onCancel,
    okText: '注册',
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalProps}>
      <Form layout="horizontal">
        <FormItem label='账户名' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('account', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '不超过15位，最少一位',
                  min: 1,
                  max: 15,
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem label='联系电话' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('phone', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入手机号',
                  len: 11
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem label='密码' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('pass', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '最短6位，最长15位',
                  min: 6,
                  max: 15,
                },
              ],
            })(<Input type={'password'} />)
          }
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(register)
