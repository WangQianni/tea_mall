import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table, Modal, Icon } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;

// 提现申请
class Extract extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '', // 搜索
            times: [], // 时间
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            accountType: '0', // 0 全部 1 申请中 2 成功 3 失败
            adminType: '0', // 0 全部 1 管理 2 非管理
            data: [
                {
                    a: 1,
                    s: 2,
                    d: 3,
                    f: 4,
                    g: 5,
                    h: 6,
                    j: 7,
                    k: 8,
                    l: 9,
                    q: 10
                }
            ], // 列表数据
        }

        this.columns = [ // 定义列表数据
            {
                title: '交易号',
                dataIndex: 'a',
                align: 'center'
            },
            {
                title: '用户ID',
                dataIndex: 's',
                align: 'center'
            },
            {
                title: '管理员标识',
                dataIndex: 'd',
                align: 'center'
            },
            {
                title: '提现额度',
                dataIndex: 'f',
                align: 'center'
            },
            {
                title: '提现前余额',
                dataIndex: 'g',
                align: 'center'
            },
            {
                title: '手续费比例',
                dataIndex: 'h',
                align: 'center'
            },
            {
                title: '手续费',
                dataIndex: 'j',
                align: 'center'
            },
            {
                title: '提现状态',
                dataIndex: 'k',
                align: 'center'
            },
            {
                title: '交易建立时间',
                dataIndex: 'l',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'q',
                align: 'center',
                render: text => <Button type="link" onClick={() => this.handleApply(text)}>确认处理</Button>
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
    reset = () => this.setState({ query: '', times: [], page: 1, accountType: '0' })

    // 导出
    exportXlxs = () => {
        console.log('导出')
    }

    // 更改选择器
    changeSelect = (v, field) => this.setState({ [field]: v });

    // 更改页码
    changePage = v => this.setState({ page: v })

    // 确认处理
    handleApply = () => {
        confirm({
            title: '请确认是否操作?',
            content: (
                <div>
                    <TextArea placeholder="提款失败时必填" rows={3} />
                </div>
            ),
            maskClosable: true,
            okText: '提款成功',
            cancelText: '提款失败',
            icon: <Icon type="warning" />,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

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
                        <span className="tip mr15 ">状态:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.accountType} onChange={v => this.changeSelect(v, 'accountType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">申请中</Option>
                            <Option value="2">成功</Option>
                            <Option value="3">失败</Option>
                        </Select>
                        <span className="ml15 tip mr15 ">管理员标识:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.adminType} onChange={v => this.changeSelect(v, 'adminType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">管理</Option>
                            <Option value="2">非管理</Option>
                        </Select>
                    </div>
                    <div>
                        <span className="tip mr15">订单总数: <i style={{ color: 'red' }}>xxx</i></span>
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

export default Extract