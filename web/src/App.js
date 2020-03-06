import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Button, Tooltip, Icon, message } from 'antd'
import BaseForm from './components/baseForm'

// 使用BaseForm组件时,获取formList数据中的name参数,组件最多只包了一层数组，所以不用考虑递归获取
const fetchFormListParam = (formList) => {
  try {
    const fieldsNameArr = formList.reduce((pre, cur) => {
      if (typeof cur.name === 'string') {
        pre.push(cur.name)
      } else {
        for (let item of cur.name) {
          pre.push(item)
        }
      }
      return pre
    }, [])
    return fieldsNameArr
  } catch (error) {
    return []
  }
}

class App extends Component {
  /* 检测文本框 */
  validateText = (rule, value, callback) => {
    if (value && value.length < 4) {
      callback('输入的长度少于4位')
    }
    callback()
  }

  state = {
    formList: [
      {
        type: 'INPUT',
        name: 'test',
        label: <span>
          名称&nbsp;
                <Tooltip title="请输入长度4以上的名字">
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>,
        placeholder: '请输入名称',
        rules: [
          {
            required: true,
            message: '名称不能为空'
          },
          {
            validator: this.validateText
          }
        ]
      },
      {
        type: 'TEXT',
        name: 'text',
        label: '测试',
        value: '这是数据'
      },
      {
        type: 'SELECT',
        name: 'deviceActiveStatus',
        label: '激活状态',
        placeholder: '请选择激活状态',
        options: [
          {
            id: '0',
            name: '苹果'
          },
          {
            id: '1',
            name: '橘子'
          }
        ],
        rules: [
          {
            required: true,
            message: '请选择激活状态'
          }
        ]
      },
      {
        type: 'RADIO',
        name: 'radio',
        label: '单选框',
        // value: '0',
        options: [
          {
            id: '0',
            name: <span>
              苹果&nbsp;
                    <Tooltip title="请输入长度4以上的名字">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          },
          {
            id: '1',
            name: '橘子'
          }
        ],
        rules: [
          {
            required: true,
            message: '请选择激活状态'
          }
        ]
      },
      {
        type: 'CHECKBOX',
        name: 'checkbox',
        label: '复选框',
        // value: ['0', '1'],
        options: [
          {
            id: '0',
            name: '苹果'
          },
          {
            id: '1',
            name: '橘子'
          }
        ]
      },
      {
        type: 'TIMEPICKER',
        name: 'timepicker',
        label: '时间选择',
        placeholder: '请选择时间',
        rules: [
          {
            required: true,
            message: '请选择时间'
          }
        ]
      },
      {
        type: 'YEARPICKER',
        name: 'yearDate',
        label: '选择年',
        placeholder: '请选择年',
        rules: [
          {
            required: true,
            message: '请选择年'
          }
        ]
      },
      {
        type: 'MONTHPICKER',
        name: 'monthDate',
        label: '选择月',
        placeholder: '请选择月',
        rules: [
          {
            required: true,
            message: '请选择月'
          }
        ]
      },
      {
        type: 'DATEPICKER',
        name: 'date',
        label: '日期选择',
        placeholder: '请选择日期',
        showTime: true,
        rules: [
          {
            required: true,
            message: '请选择日期'
          }
        ]
      },
      {
        type: 'RANGEPICKER',
        name: ['starTime', 'endTime'],
        label: '时间段选择',
        placeholder: ['请选择开始日期', '请选择结束日期'],
        showTime: true,
        rules: [
          {
            required: true,
            message: '请选择日期'
          }
        ],
        style: {
          width: '600px'
        },
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 }
          },
        }
      },
      {
        type: 'TEXTAREA',
        name: 'textarea',
        label: '测试',
        placeholder: '请输入账户',
        extra: "额外提示框",
        autosize: { minRows: 2, maxRows: 6 },
        style: {
          width: '600px'
        },
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 }
          },
        }
      },
    ]
  }

  /* 提交 */
  handleSubmit = () => {
    const { form } = this.props
    const { validateFieldsAndScroll } = form
    const { formList } = this.state
    const formListParam = fetchFormListParam(formList)
    validateFieldsAndScroll(formListParam, (err, values) => {
      if (!err) {
        message.success('提交成功,请查看浏览器日志打印')
        console.log('提交数据为', values);
      }
    });
  }

  /* 重置表单 */
  handleReset = () => {
    const { form } = this.props
    const { resetFields } = form
    const { formList } = this.state
    const formListParam = fetchFormListParam(formList)
    resetFields(formListParam)
  }

  render() {
    const { formList } = this.state
    const { form } = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
    }
    return <Form {...formItemLayout}>
      <BaseForm formList={formList} form={form} />
      <Button type="primary" onClick={this.handleSubmit} >提交</Button>
      <Button type="default" onClick={this.handleReset} style={{ marginLeft: '20px' }}>重置</Button>
    </Form>
  }
}


export default Form.create()(App);
