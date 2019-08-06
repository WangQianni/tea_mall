import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table, Popover, Modal, Icon } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

// 微广场信息管理
class MessageAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '', // 搜索
            times: [], // 时间
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            accountType: '0', // 0 全部 1 启用 2 封禁
            data: [
                {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                    f: 6,
                    g: 7,
                    h: 8,
                    j: 9
                }
            ], // 列表数据
        }

        this.columns = [ // 定义列表数据
            {
                title: '记录ID',
                dataIndex: 'a',
                align: 'center'
            },
            {
                title: '广场名称',
                dataIndex: 'b',
                align: 'center'
            },
            {
                title: '用户ID',
                dataIndex: 'c',
                align: 'center'
            },
            {
                title: '绑定订单号',
                dataIndex: 'd',
                align: 'center'
            },
            {
                title: '发布图片',
                dataIndex: 'e',
                align: 'center',
                render: text => (
                    <Popover placement="bottom" content={(
                        <div style={{ width: 256 }}>
                            <img style={{ display: 'block', width: '100%' }} src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723986986,1927550216&fm=26&gp=0.jpg" alt="" />
                        </div>
                    )} trigger="hover">
                        <Button type="link"> 查看</Button>
                    </Popover>
                )
            },
            {
                title: '发布内容',
                dataIndex: 'f',
                align: 'center',
                render: text => (
                    <Popover placement="bottom" content={(
                        <div style={{ width: 300 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
                        </div>
                    )} trigger="hover">
                        <Button type="link"> 查看</Button>
                    </Popover>
                )   
            },
            {
                title: '创建时间',
                dataIndex: 'g',
                align: 'center'
            },
            {
                title: '领取优惠券ID',
                dataIndex: 'h',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'j',
                align: 'center',
                render: text => <Button type="link" onClick={() => {
                    confirm({
                        title: '是否确认隐藏?',
                        maskClosable: true,
                        icon: <Icon type="warning" />,
                        onOk() {
                            console.log('OK');
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                    })
                }}>隐藏</Button>
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
                        <span className="ml15 tip mr15 ">广场:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.accountType} onChange={this.changeSelect}>
                            <Option value="0">全部</Option>
                            <Option value="1">启用</Option>
                            <Option value="2">封禁</Option>
                        </Select>
                        <span className="ml15 tip mr15 mb15">时间:</span>
                        <RangePicker style={{ width: 250 }} value={this.state.times} onChange={this.changeTime} />
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

export default MessageAdmin