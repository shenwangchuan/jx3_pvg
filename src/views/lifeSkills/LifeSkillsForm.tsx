import * as React from 'react'
import { Form, Select, Input, Switch, Button } from 'antd'
const { Option } = Select

// 数据字典对象接口
interface DicObj {
    id: string,
    code: string,
    name: string,
    type: string
}
// 获取下拉列表项
function getOptions(type: string) {
    const dictionary: Array<DicObj> = require('./../../assets/json/dictionary.json')
    const data = dictionary.filter(value => {
        return value.type === type
    })
    return data.map(value => {
        return (
            <Option key={value.id} value={value.id}>{value.name}</Option>
        )
    })
}

interface IProps {
    form: any,
    submitForm?(param: object): void
}
interface IState {
}
// 查询表单
class SearchForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e: any) {
        e.preventDefault()
        this.props.form.validateFields(() => {
            const params = this.props.form.getFieldsValue()
            if (this.props.submitForm) {
                this.props.submitForm(params)
            }
        })

    }
    render() {
        const { getFieldDecorator } = this.props.form;
    
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item label="名称：">
                    {getFieldDecorator('name', {})(
                        <Input placeholder="请输入"></Input>
                    )}
                </Form.Item>
                {/* <Form.Item label="品质">
                    {getFieldDecorator('level', {})(
                        <Select>
                            {getOptions('LEVEL')}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="类别">
                    {getFieldDecorator('category', {})(
                        <Select>
                            {getOptions('SKILL')}
                        </Select>
                    )}
                </Form.Item> */}
                <Form.Item label="中间物">
                    {getFieldDecorator('isMid', {
                        initialValue: false,
                        valuePropName: 'checked'
                    })(
                        <Switch></Switch>
                    )}
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        )
    }
}
const LifeSkillsForm:any = Form.create({ name: 'search_form' })(SearchForm)
export default LifeSkillsForm