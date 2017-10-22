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
    onRegister,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
      resetFields,
    },
  }
) => {
  const register = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) { return }

      onRegister(values);
      resetFields();
    })
  }

  const modalProps = {
    title: '注册',
    visible,
    onOk: register,
    onCancel,
    okText: '注册',
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalProps}>
      <Form layout="horizontal">
        <FormItem label='账户名' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('name', {
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
        {/*<FormItem label='联系电话' hasFeedback {...formItemLayout}>*/}
          {/*{*/}
            {/*getFieldDecorator('phone', {*/}
              {/*initialValue: '',*/}
              {/*rules: [*/}
                {/*{*/}
                  {/*required: true,*/}
                  {/*message: '请输入手机号',*/}
                  {/*len: 11*/}
                {/*},*/}
              {/*],*/}
            {/*})(<Input />)*/}
          {/*}*/}
        {/*</FormItem>*/}
        <FormItem label='密码' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('pass', {
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
  )
}

export default Form.create()(register)
