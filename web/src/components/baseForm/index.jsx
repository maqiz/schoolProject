
import React, { PureComponent } from 'react'
import { Form, Input, Select, DatePicker, Radio, Checkbox, TimePicker } from 'antd'
import moment from 'moment'
import style from './index.module.scss'

const { TextArea } = Input
const { MonthPicker, RangePicker } = DatePicker
const Option = Select.Option
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

/**
 * @class BaseForm
 * @extends {PureComponent}
 * @author --
 * @param {Object} form 由Form.create()创建的表单对象
 * @param {Array} formList 控件列表
*/

class BaseForm extends PureComponent {

    state = {
        /* YEARPICKER 控件是否展示选择框 */
        yearPickIsOpen: false
    }

    // RANGEPICKER-变化处理函数
    handleRangePicker = (date, item) => {
        try {
            const { form } = this.props
            if (date && date.length > 0){
                form.setFieldsValue({[item.name[0]]: date[0]})
                form.setFieldsValue({[item.name[1]]: date[1]})
            } else {
                form.setFieldsValue({[item.name[0]]: undefined})
                form.setFieldsValue({[item.name[1]]: undefined})
            }
        } catch (error) {
            console.log(error)
        }
    }


    // 初始化渲染表单
    initialForm = () => {
        const { formList, form } = this.props
        const { getFieldDecorator } = form
        const dateStyle = {
            minWidth: '100%'
        }
        return formList.map((item, index, arr) => {
            const formItemProperty = {
                key: item.name,
                label: item.label,
                style: item.style,
                className: item.className,
                extra: item.extra,
                ...item.formItemLayout,
            }

            const formInputProperty = {
                /* 默认允许清除 */
                placeholder: item.placeholder,
                disabled: item.disabled,
                // 防止onChange在控件值变化之前执行
                onChange: () => setTimeout(item.onChange, 0, item.name, item)
            }
            /* 默认给可以添加清除的控件添加清除图标 */
            if (item.type === 'INPUT' || item.type === 'SELECT' || item.type === 'TEXTAREA' || item.type === 'DATEPICKER' ||
                item.type === 'MONTHPICKER' || item.type === 'YEARPICKER' || item.type === 'TIMEPICKER' || item.tyoe === 'RANGEPICKER') {
                formInputProperty.allowClear = item.allowClear === false ? false : true
            }

            switch (item.type) {
                case 'INPUT':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value,
                                    rules: item.rules || []
                                })(
                                    <Input {...formInputProperty} />
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'SELECT':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value,
                                    rules: item.rules || []
                                })(
                                    <Select {...formInputProperty}>
                                        {
                                            item.options.map(option => {
                                                return <Option key={option.id} value={option.id}>{option.name}</Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'RADIO':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value,
                                    rules: item.rules || []
                                })(
                                    <RadioGroup {...formInputProperty} >
                                        {
                                            item.options && item.options.map(option => {
                                                return <Radio key={option.id} value={option.id}>{option.name}</Radio>
                                            })
                                        }
                                    </RadioGroup>
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'RADIOBUTTON':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value,
                                    rules: item.rules || []
                                })(
                                    <RadioGroup {...formInputProperty} buttonStyle={item.buttonStyle ? item.buttonStyle : 'outline'}>
                                        {
                                            item.options && item.options.map(option => {
                                                return <Radio.Button key={option.id} value={option.id}>{option.name}</Radio.Button>
                                            })
                                        }
                                    </RadioGroup>
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'CHECKBOX':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value,
                                    rules: item.rules || []
                                })(
                                    <CheckboxGroup {...formInputProperty}>
                                        {
                                            item.options && item.options.map(option => {
                                                return <Checkbox key={option.id} value={option.id}>{option.name}</Checkbox>
                                            })
                                        }
                                    </CheckboxGroup>
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'TEXTAREA':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value,
                                    rules: item.rules || []
                                })(
                                    <TextArea {...formInputProperty} autoSize={item.autosize || { minRows: 1, maxRows: 6 }} />
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'DATEPICKER':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value && moment(item.value),
                                    rules: item.rules || []
                                })(
                                    <DatePicker
                                        style={dateStyle}
                                        {...formInputProperty}
                                        showTime={item.showTime}
                                        format={item.showTime ? item.format ? item.format : 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                        disabledDate={item.disabledDate}
                                    />
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'MONTHPICKER':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value && moment(item.value),
                                    rules: item.rules || []
                                })(
                                    <MonthPicker
                                        style={dateStyle}
                                        {...formInputProperty}
                                        format={item.format ? item.format : 'YYYY-MM'}
                                    />
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'YEARPICKER':
                    const { yearPickIsOpen } = this.state
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value && moment(item.value),
                                    rules: item.rules || []
                                })(
                                    <DatePicker
                                        style={dateStyle}
                                        {...formInputProperty}
                                        format={item.format ? item.format : 'YYYY'}
                                        open = { yearPickIsOpen }
                                        mode='year'
                                        onPanelChange={(value) => {
                                            form.setFieldsValue({[item.name]: value})
                                            this.setState({
                                                yearPickIsOpen: false
                                            })
                                            item.onChange && setTimeout(item.onChange, 0, item.name, item)
                                        }}
                                        onOpenChange={
                                            status => {
                                                if (status) {
                                                    this.setState( {'yearPickIsOpen': true} )
                                                } else {
                                                    this.setState({'yearPickIsOpen': false})
                                                }
                                            }
                                        }
                                    />
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'TIMEPICKER':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value && moment(item.value),
                                    rules: item.rules || []
                                })(
                                    <TimePicker
                                        format={item.format ? item.format : 'HH:mm:ss'}
                                        placeholder={item.placeholder}
                                        disabled={item.disabled}
                                    />
                                )
                            }
                            {item.children && item.children(item, index, arr)}
                        </Form.Item>
                    )
                case 'RANGEPICKER':
                    let startTime = form.getFieldValue(item.name[0])
                    let endTime = form.getFieldValue(item.name[1])
                    return (
                        <React.Fragment key={item.name}>
                            <Form.Item {...formItemProperty}>
                                {
                                    getFieldDecorator(item.name[0], {
                                        rules: item.rules || []
                                    })(
                                        <React.Fragment></React.Fragment>
                                    )
                                }
                                
                                <RangePicker
                                    style={dateStyle}
                                    showTime={item.showTime}
                                    format={item.showTime ? item.format ? item.format : 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                    value={ (startTime && endTime) ? [moment(startTime), moment(endTime)] : []}
                                    placeholder={item.placeholder}
                                    disabled={item.disabled}
                                    onChange={(date) => this.handleRangePicker(date, item)}
                                    disabledDate={item.disabledDate}
                                />
                            </Form.Item>
                            <Form.Item style={{display: 'none'}}>
                                {
                                    getFieldDecorator(item.name[1], {
                                        rules: item.rules || []
                                    })(
                                        <React.Fragment></React.Fragment>
                                    )
                                }
                            </Form.Item>
                        </React.Fragment>
                    )
                case 'TEXT':
                    const value = form.getFieldValue(item.name) || item.value
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: value,
                                })(
                                    <React.Fragment></React.Fragment>
                                )
                            }
                            <span className="ant-form-text">{value}</span>
                        </Form.Item>
                    )
                default:
                    return <Form.Item {...formItemProperty}>
                        {item.children || null}
                    </Form.Item>
            }
        })
    }


    render() {
        const { className } = this.props
        return (
            <div className={className ? `${className} ${style['form']}` : `${style['form']}`} >
                {this.initialForm()}
            </div>
        )
    }
}

export default BaseForm