import * as React from 'react'
import { Row, Col, Table } from 'antd'
import LifeSkillsForm from './LifeSkillsForm'
import './LifeSkills.css'

interface IState {
    type: string,
    targetList: Array<any>,
    materialList: Array<any>
}
export default class LifeSkills extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            type: 'product',
            targetList: [],
            materialList: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDoClick = this.handleDoClick.bind(this)
    }
    // 提交表单
    handleSubmit(param: any): void {
        const targetJsonName: string = param.isMid ? 'mid_material' : 'product'
        const targetJson = require(`./../../assets/json/${targetJsonName}.json`)
        const list: Array<object> = param.name ? targetJson.filter((value: { name: string }) => {
            return value.name === param.name
        }) : targetJson
        this.setState({
            type: targetJsonName,
            targetList: list
        })
    }
    // 点击制作按钮
    handleDoClick(row: any) {
        console.log(row)
        const connectJson = require(`./../../assets/json/${this.state.type}_connect.json`)
        const materials = connectJson.filter((value: { product: string }) => {
            return value.product === row.name
        })
        this.setState({
            materialList: materials
        })
    }
    // 提交选中的表格
    submitSelections(selections: Array<any>) {
        const selectNames: string[] = selections.map(value => {
            return value.name
        })
        const connectJson = require(`./../../assets/json/${this.state.type}_connect.json`)
        const lists = connectJson.filter((value: { product: string }) => {
            return selectNames.includes(value.product)
        })
        let materails = []
    }

    render() {
        const sourceTableColumns = [
            { title: '名称', dataIndex: 'name' },
            { title: '精力', dataIndex: 'energy' },
            { title: '数量', dataIndex: 'count' },
            {
                title: '操作', dataIndex: '', render: (text: any) => {
                    return (
                        <a onClick={() => this.handleDoClick(text)}>制作</a>
                    )
                }
            }
        ]
        const materialsTableColumns = [
            { title: '名称', dataIndex: 'product' },
            { title: '材料', dataIndex: 'material' },
            { title: '数量', dataIndex: 'materialCount' },
            { title: '来源', dataIndex: 'materialType' }
        ]
        function materialTableRowKey(record: any): string {
            return record.product + record.material
        }
        const rowSelection: any = {
            onChange: (selectedRowKeys: Array<string>, selectedRows: Array<any>) => {
                this.submitSelections(selectedRows)
            }
        }
        return (
            <Row className="LifeSkills">
                <Col span={5} className="formArea">
                    <LifeSkillsForm submitForm={this.handleSubmit}></LifeSkillsForm>
                </Col>
                <Col span={19}>
                    <Table rowSelection={rowSelection} columns={sourceTableColumns} dataSource={this.state.targetList} rowKey="id"></Table>
                    {/* <Table columns={materialsTableColumns} dataSource={this.state.materialList} rowKey={materialTableRowKey}></Table> */}
                </Col>
            </Row>
        )
    }
}