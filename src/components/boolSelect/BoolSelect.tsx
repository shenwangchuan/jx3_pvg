import * as React from 'react'
import {Select} from 'antd'
const {Option} = Select

interface IState {
    value?: number
}
interface IProps {
    value?: number,
    onChange?: (val: number)=> void
}
// 布尔值下拉选择器
export default class BoolSelect extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            value: props.value
        }
        this.handlerSelectChange = this.handlerSelectChange.bind(this)
    }
    handlerSelectChange (val:number) {
        this.setState({
            value: val
        })
        if (this.props.onChange) {
            this.props.onChange(val)
        }
    }
    render() {
        const {value} = this.state
        return (
            <Select value={value} onChange={this.handlerSelectChange}>
                <Option value={1}>是</Option>
                <Option value={0}>否</Option>
            </Select>
        )
    }
}