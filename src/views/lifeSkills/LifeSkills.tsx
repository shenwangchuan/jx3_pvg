import * as React from 'react'
import { Table, Card  } from 'antd'
import LifeSkillsForm from './LifeSkillsForm'
import './LifeSkills.css'

interface IState {
    type: string,
    targetList: Array<any>,
    materialList: Array<any>,
    materialTableTitle: string
}

// 查询表单
interface ISearchForm {
  name?: string,
  level?: string,
  category?: string,
  isMid: boolean
}
export default class LifeSkills extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            type: 'product',
            targetList: [],
            materialList: [],
            materialTableTitle: '材料表'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDoClick = this.handleDoClick.bind(this)
    }
    // 提交表单
    handleSubmit(param: ISearchForm): void {
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
      const state = this.state
      // 产出表
        const sourceTableColumns = [
            { title: '名称', dataIndex: 'name' },
            { title: '精力', dataIndex: 'energy' },
            { title: '数量', dataIndex: 'count' },
            {
                title: '操作', dataIndex: '', render: (text: any) => {
                    return (
                        <div onClick={() => this.handleDoClick(text)}>制作</div>
                    )
                }
            }
        ]
        // 材料表
        const materialsTableColumns = [
            { title: '名称', dataIndex: 'product' },
            { title: '材料', dataIndex: 'material' },
            { title: '数量', dataIndex: 'materialCount' },
            { title: '来源', dataIndex: 'materialType' }
        ]
        // 材料表key
        function materialTableRowKey(record: any): string {
            return record.product + record.material
        }
        const rowSelection: any = {
            onChange: (selectedRowKeys: Array<string>, selectedRows: Array<any>) => {
                this.submitSelections(selectedRows)
            }
        }
        return (
          <div className="LifeSkills">
            <div className="formArea">
              <LifeSkillsForm submitForm={this.handleSubmit}></LifeSkillsForm>
            </div>
            <div className="tableArea">
              <Table rowSelection={rowSelection} columns={sourceTableColumns} dataSource={state.targetList} rowKey="id"></Table>
              {state.materialList.length > 0 && 
              <Card title={state.materialTableTitle}>
                <Table columns={materialsTableColumns} dataSource={state.materialList} rowKey={materialTableRowKey}></Table>
              </Card>
              }
            </div>
          </div>
        )
    }
}