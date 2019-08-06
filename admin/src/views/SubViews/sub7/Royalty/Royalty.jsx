import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 提成记录
class Royalty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '', // 搜索
            times: [], // 时间
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            royaltyType: '0', // 0 全部 1 启用 2 封禁
            data: [], // 列表数据
        }

        this.columns = [ // 定义列表数据
            {
                title: '提成用户ID',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '提成渠道',
                dataIndex: 'age',
                align: 'center'
            },
            {
                title: '订单ID',
                dataIndex: 'address',
                align: 'center'
            },
            {
                title: '订单提成百分比',
                dataIndex: '1',
                align: 'center'
            },
            {
                title: '订单去成本合计',
                dataIndex: '2',
                align: 'center'
            },
            {
                title: '提成合计',
                dataIndex: '3',
                align: 'center'
            },
            {
                title: '提成时间',
                dataIndex: '4',
                align: 'center'
            }
        ]
    }

    // 更改搜索框
    changeQeury = e => this.setState({ query: e.target.value.trim() });

    // 点击搜索
    searchQuery = v => console.log(v, this.state.query);

    // 更改时间
    changeTime = date => this.setState({ times: date });

    // 重置
    reset = () => this.setState({ query: '', times: [], page: 1, royaltyType: '0' })

    // 导出
    exportXlxs = () => {
        console.log('导出')
    }

    // 更改选择器
    changeSelect = v => this.setState({ royaltyType: v });

    // 更改页码
    changePage = v => this.setState({ page: v })

    render() {
        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <Search style={{ width: 250 }} placeholder="请输入用户ID" value={this.state.query} onChange={this.changeQeury} onSearch={this.searchQuery} enterButton />
                        <Button type="primary" className="ml15" onClick={this.reset}>重置</Button>
                        <span className="ml15 tip mr15 mb15">释放时间:</span>
                        <RangePicker style={{ width: 250 }} value={this.state.times} onChange={this.changeTime} />
                        <Button type="primary" className="ml15" onClick={this.exportXlxs}>导出</Button>
                    </div>
                    <div className="mb15">
                        <span className="tip mr15 ">提成渠道:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.royaltyType} onChange={this.changeSelect}>
                            <Option value="0">全部</Option>
                            <Option value="1">充值</Option>
                            <Option value="2">产品购买</Option>
                            <Option value="3">预约分红</Option>
                        </Select>
                    </div>
                </div>

                {/* 列表 */}
                <div style={{ textAlign: 'center' }}>
                    <Table 
                        bordered 
                        dataSource={this.state.data} 
                        columns={this.columns} 
                        pagination={{
                            total: this.state.total,
                            pageSize: this.state.rows,
                            onChange: this.state.changePage,
                            current: this.state.page,
                            hideOnSinglePage: true,
                            showQuickJumper: true,
                            showTotal: () => `共 ${this.state.total} 条数据`
                        }} 
                        rowKey={(record, index) => index} 
                    />
                </div>
                
            </div>
        )
    }
}

export default Royalty