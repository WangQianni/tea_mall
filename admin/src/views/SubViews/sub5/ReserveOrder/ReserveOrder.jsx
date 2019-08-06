import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table, Popover, Modal } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

const orderTypeArr = ['全部', '待支付', '待确认', '已确认', '已完成', '退款申请', '退款失败', '退款成功'];

// 预定订单管理
class ReserveOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '', // 搜索
            times: [], // 时间
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            storeType: '0', // 店铺类型 0 全部 
            orderType: '0', // 订单类型 orderTypeArr
            ditchType: '0', // 类型 0 全部 1 定向 2 邀请
            claimType: '1', // 订单时间类型 1 订单创建时间 2 订单预约时间
            data: [
                { a: 1, s: 1, d: 1, f: 1, g: 1, h: 1, j: 1, k: 1, l: 1, q: 1, w: 1, e: 1, r: 1, t: 1, y: 1, u: 1, i: 1, o: 1, p: 2 }
            ], // 列表数据
        }

        this.columns = [ // 定义列表数据
            {
                title: '订单ID',
                dataIndex: 'a',
                align: 'center',
                key: 1,
            },
            {
                title: '发起渠道',
                dataIndex: 's',
                align: 'center',
                key: 2,
                render: text => text === 1 ? '定向' : '用户'
            },
            {
                title: '用户ID',
                dataIndex: 'd',
                align: 'center',
                key: 3
            },
            {
                title: '购买产品',
                dataIndex: 'f',
                align: 'center',
                render: text => (
                    <Popover content={(
                        <div className="tc">
                            <p>产品名称 xxxxxxxxx</p>
                            <p>产品类型 xxxxxxx</p>
                            <p>产品规格 xxxxxxxxxxxx</p>
                            <p>细分规格 xxxxxxxxxx</p>
                        </div>
                    )} trigger="hover" placement="bottom">
                        <Button type="link">查看</Button>
                    </Popover>
                ),
                key: 4
            },
            {
                title: '订单备注',
                dataIndex: 'g',
                align: 'center',
                render: text => text ? (
                    <Popover content={(
                        <div style={{ width: 300 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
                        </div>
                    )} trigger="hover" placement="bottom">
                        <Button type="link">查看</Button>
                    </Popover>
                ) : null,
                key: 5
            },
            {
                title: '承接店铺',
                dataIndex: 'h',
                align: 'center',
                key: 6
            },
            {
                title: '预约单价',
                dataIndex: 'j',
                align: 'center',
                key: 7
            },
            {
                title: '预约人数',
                dataIndex: 'k',
                align: 'center',
                key: 8
            },
            {
                title: '合计价格',
                dataIndex: 'k',
                align: 'center',
                key: 9
            },
            {
                title: '优惠',
                dataIndex: 'l',
                align: 'center',
                key: 10
            },
            {
                title: '实际支付价格',
                dataIndex: 'q',
                align: 'center',
                key: 11
            },
            {
                title: '实际支付价格',
                dataIndex: 'w',
                align: 'center',
                key: 12
            },
            {
                title: '支付渠道',
                dataIndex: 'e',
                align: 'center',
                key: 13,
                render: text => text === 1 ? '预充值' : '现金'
            },
            {
                title: '预约时段',
                dataIndex: 'r',
                align: 'center',
                key: 14
            },
            {
                title: '实际时段',
                dataIndex: 't',
                align: 'center',
                key: 21
            },
            {
                title: '预约销售ID',
                dataIndex: 'y',
                align: 'center',
                key: 15
            },
            {
                title: '从属销售ID',
                dataIndex: 'z',
                align: 'center',
                key: 16
            },
            {
                title: '订单状态',
                dataIndex: 'u',
                align: 'center',
                render: text => orderTypeArr[Number(text)],
                key: 17
            },
            {
                title: '创建时间',
                dataIndex: 'i',
                align: 'center',
                key: 18,
            },
            {
                title: '更新时间',
                dataIndex: 'o',
                align: 'center',
                key: 19,
            },
            {
                title: '操作',
                dataIndex: 'p',
                align: 'center',
                key: 20,
                render: text => {
                    let affirm = <Button type="link" onClick={() => this.handleAffirm(text)}>订单确认</Button>;
                    let refund = <Button type="link" onClick={() => this.handleRefund(text)}>退款</Button>;
                    let btnArr = [
                        '',
                        '',
                        (
                            <div>{affirm}{refund}</div>
                        ),
                        refund, '', '', '', ''
                    ]
                    return btnArr[Number(text)]
                }
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
    reset = () => this.setState({ query: '', times: [], page: 1, storeType: '0', orderType: '0', ditchType: '0', claimType: '1' });

    // 导出
    exportXlxs = () => {
        console.log('导出')
    }

    // 更改选择器
    changeSelect = (v, field) => this.setState({ [field]: v });

    // 更改页码
    changePage = v => this.setState({ page: v });

    // 订单确认
    handleAffirm = id => {
        confirm({
            title: '是否确认该预约订单?',
            cancelText: '拒绝',
            okText: '确认',
            maskClosable: true,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 退款
    handleRefund = id => {
        confirm({
            title: '是否确认退款?',
            cancelText: '拒绝退款',
            okText: '确认退款',
            maskClosable: true,
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
                        <Select defaultValue="lucy" style={{ width: 140, marginLeft: 15, marginRight: 15 }} value={this.state.claimType} onChange={v => this.changeSelect(v, 'claimType')}>
                            <Option value="1">订单创建时间</Option>
                            <Option value="2">订单预约时间</Option>
                        </Select>
                        <RangePicker style={{ width: 250 }} value={this.state.times} onChange={this.changeTime} />
                        <Button type="primary" className="ml15" onClick={this.exportXlxs}>导出</Button>
                    </div>
                    <div className="mb15">
                        <span className="tip mr15">店铺:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.storeType} onChange={v => this.changeSelect(v, 'storeType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">店铺名称xxx</Option>
                            <Option value="2">店铺名称xxxx</Option>
                        </Select>
                        <span className="ml15 tip mr15">订单状态:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.orderType} onChange={v => this.changeSelect(v, 'orderType')}>
                            {
                                orderTypeArr.map((item, index) => (<Option value={`${index}`} key={index}>{item}</Option>))
                            }
                        </Select>
                        <span className="ml15 tip mr15">类型:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.ditchType} onChange={v => this.changeSelect(v, 'ditchType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">定向</Option>
                            <Option value="2">用户邀请</Option>
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
                        size="small"
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

export default ReserveOrder;