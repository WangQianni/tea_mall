import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

class DataMes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '', // 搜索
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            data: [], // 列表数据
        }

        this.columns = [ // 定义列表数据
            {
                title: '用户ID',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: 'VIP等级',
                dataIndex: 'age',
                align: 'center'
            },
            {
                title: '预充值余额',
                dataIndex: 'address',
                align: 'center'
            },
            {
                title: '增值余额',
                dataIndex: '1',
                align: 'center'
            },
            {
                title: '订单提成百分比',
                dataIndex: '2',
                align: 'center'
            },
            {
                title: '每日释放百分比',
                dataIndex: '3',
                align: 'center'
            },
            {
                title: '30天产品订单数量合计',
                dataIndex: '4',
                align: 'center'
            },
            {
                title: '累计消费总额',
                dataIndex: '5',
                align: 'center'
            },
            {
                title: '累计充值总额',
                dataIndex: '6',
                align: 'center'
            },
            {
                title: '提款余额',
                dataIndex: '7',
                align: 'center'
            },
            {
                title: '累计提款总额',
                dataIndex: '8',
                align: 'center'
            },
            {
                title: '累计释放总额',
                dataIndex: '9',
                align: 'center'
            },
            {
                title: '资金量分流',
                dataIndex: '10',
                align: 'center'
            }
        ]
    }

    // 更改搜索框
    changeQeury = e => this.setState({ query: e.target.value.trim() });

    // 点击搜索
    searchQuery = v => console.log(v, this.state.query);

    // 重置
    reset = () => this.setState({ query: '', times: [], page: 1, accountType: '0' })

    // 导出
    exportXlxs = () => {
        console.log('导出')
    }

    // 更改页码
    changePage = v => this.setState({ page: v })

    render() {
        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <Search style={{ width: 250 }} placeholder="请输入用户ID(绑定手机号)" value={this.state.query} onChange={this.changeQeury} onSearch={this.searchQuery} enterButton />
                        <Button type="primary" className="ml15" onClick={this.reset}>重置</Button>
                        <Button type="primary" className="ml15" onClick={this.exportXlxs}>导出</Button>
                    </div>
                    <div>
                        <span className="tip mr15">资金总量: <i style={{ color: 'red' }}>xxx</i></span>
                        <span className="tip mr15">预释放总额: <i style={{ color: 'red' }}>xxx</i></span>
                        <span className="tip mr15">已释放总额: <i style={{ color: 'red' }}>xxx</i></span>
                        <span className="tip mr15">提款总额: <i style={{ color: 'red' }}>xxx</i></span>
                        <span className="tip mr15">可提款余额: <i style={{ color: 'red' }}>xxx</i></span>
                        <span className="tip mr15">可移资金总量: <i style={{ color: 'red' }}>xxx</i></span>
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

export default DataMes