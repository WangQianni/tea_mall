import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table, message } from 'antd';
import axios from '@axios';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

class UserMes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '', // 搜索
            times: [], // 时间
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            accountType: '0', // 0 全部 1 启用 2 封禁
            data: [], // 列表数据
        }

        this.columns = [ // 定义列表数据
            {
                title: '用户ID',
                dataIndex: 'a',
                align: 'center'
            },
            {
                title: '绑定手机',
                dataIndex: 's',
                align: 'center'
            },
            {
                title: '微信昵称',
                dataIndex: 'd',
                align: 'center'
            },
            {
                title: '账号启用状态',
                dataIndex: 'f',
                align: 'center'
            },
            {
                title: '注册时间',
                dataIndex: 'g',
                align: 'center'
            },
            {
                title: '所属上级ID',
                dataIndex: 'h',
                align: 'center'
            },
            {
                title: '所属销售ID',
                dataIndex: 'j',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'k',
                align: 'center',
                render: text => <Button type="link">封禁</Button>
            }
        ]
    }

    init = () => {
        
    }

    // 更改搜索框
    changeQeury = e => this.setState({ query: e.target.value.trim() });

    // 点击搜索
    searchQuery = id => {
        axios.post('/app/user/info', { id })
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);

                this.setState({ data: data.responseBody.data.list })
            })
    };

    // 更改时间
    changeTime = date => this.setState({ times: date });

    // 重置
    reset = () => this.setState({ query: '', times: [], page: 1, accountType: '0' })

    // 导出
    exportXlxs = () => {
        console.log('导出')
    }

    // 更改选择器
    changeSelect = v => this.setState({ accountType: v });

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
                        <span className="ml15 tip mr15 mb15">注册时间:</span>
                        <RangePicker style={{ width: 250 }} value={this.state.times} onChange={this.changeTime} />
                        <Button type="primary" className="ml15" onClick={this.exportXlxs}>导出</Button>
                    </div>
                    <div className="mb15">
                        <span className="tip mr15 ">启用状态:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.accountType} onChange={this.changeSelect}>
                            <Option value="0">全部</Option>
                            <Option value="1">启用</Option>
                            <Option value="2">封禁</Option>
                        </Select>
                    </div>
                    <div>
                        <span className="tip mr15">注册用户总数: <i style={{ color: 'red' }}>xxx</i></span>
                        <span className="tip mr15">今日注册用户总数: <i style={{ color: 'red' }}>xxx</i></span>
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

export default UserMes