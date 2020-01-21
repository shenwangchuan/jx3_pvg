import * as React from 'react'
import { Row, Col, Form, Select, Input, Button, Table } from 'antd'
import BoolSelect from './../../components/boolSelect/BoolSelect'
import './Homepage.css'
const { Option } = Select

// 数据字典对象接口
interface DicObj {
    id: string,
    code: string,
    name: string,
    type: string
}
// 获取数据字典数据源
function getDataFromDic (type: string) :Array<DicObj> {
    const dictionary:Array<DicObj> = require('./../../assets/json/dictionary.json')
    return dictionary.filter(value => {
        return value.type === type
    })
}
// 获取下拉列表项
function getOptions (type: string) {
    const data: Array<DicObj> = getDataFromDic(type)
    return data.map(value => {
        return (
            <Option value={value.id}>{value.name}</Option>
        )
    })
}

interface IState {

}
interface IPropSearchForm {
    form: any
}
// 查询表单
const SearchForm = (props: any) => {
    // 表单控件布局
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 19 },
        },
    };
    const form = {
        name: '',
        level: ''
    }
    return (
        <Form {...formItemLayout}>
            <Form.Item label="名称：">
                <Input value={form.name} placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item label="品质">
                <Select value={form.level}>
                    {getOptions('LEVEL')}
                </Select>
            </Form.Item>
            <Form.Item label="类别">
                <Select value={form.level}>
                    {getOptions('SKILL')}
                </Select>
            </Form.Item>
            <Form.Item label="是否中间物">
                <BoolSelect value={0}></BoolSelect>
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary">查询</Button>
            </Form.Item>
        </Form>
    )
}
const SearchFormWrapper = Form.create({name: 'search_form'})(SearchForm)
// 表格
const DataTable = (props: any) => {
    const columns: Array<any> = [
        { key: 'name', title: '名称' },
        { key: 'level', title: '等级' },
        { key: 'from', title: '来源' }
    ]
    const dataSource: Array<any> = []
    return (
        <Table dataSource={dataSource} columns={columns}></Table>
    )
}
// 页面组件
export default class Homepage extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {

        }

    }
    componentDidMount() {
    }
    render() {
        return (
            <Row className="Homepage">
                <Col span={5} className="formArea">
                    <SearchFormWrapper></SearchFormWrapper>
                </Col>
                <Col span={19}>
                    <DataTable/>
                </Col>
            </Row>
        )
    }
}