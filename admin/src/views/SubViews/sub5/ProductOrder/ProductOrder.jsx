import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table, Popover, Modal } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

const orderTypeArr = ['全部', '待支付', '待发货', '待收货', '已完成', '退款申请', '退款失败', '退款成功'];

// 产品订单管理
class ProductOrder extends Component {
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
            ditchType: '0', // 发起渠道类型 0 全部 1 定向 2 邀请
            claimType: '0', // 取货类型 0 全部 1 自取 2 快递
            data: [
                { a: 1, s: 1, d: 1, f: 1, g: 1, h: 1, j: 1, k: 1, l: 1, q: 1, w: 1, e: 1, r: 1, t: 1, y: 1, u: 1, i: 1, o: 1, p: 3 }
            ], // 列表数据
            remark: '', // 退款备注
            refundModal: false, // 退款模态框
            id: '', // 退款id
            affirmModal: false, // 订单确认模态框
            affirmStatus: 0, // 订单确认或订单确认 0 订单确认 1 订单详情
            logisticsCompany: '', // 物流公司
            trackingNumber: '', // 物流单号
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
                render: text => text === 1 ? '定向' : '邀请'
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
                title: '包装规格',
                dataIndex: 'h',
                align: 'center',
                key: 6
            },
            {
                title: '购买数量',
                dataIndex: 'j',
                align: 'center',
                key: 7
            },
            {
                title: '取货类型',
                dataIndex: 'k',
                align: 'center',
                render: text => text === 1 ? '自取' : '快递',
                key: 8
            },
            {
                title: '发货|取货门店',
                dataIndex: 'k',
                align: 'center',
                key: 9
            },
            {
                title: '合计价格',
                dataIndex: 'l',
                align: 'center',
                key: 10
            },
            {
                title: '优惠',
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
                title: '成本合计',
                dataIndex: 'e',
                align: 'center',
                key: 13
            },
            {
                title: '增值合计',
                dataIndex: 'r',
                align: 'center',
                key: 14
            },
            {
                title: '支付渠道',
                dataIndex: 't',
                align: 'center',
                render: text => text === 1 ? '预充值' : '现金',
                key: 15
            },
            {
                title: '从属销售ID',
                dataIndex: 'y',
                align: 'center',
                key: 16
            },
            {
                title: '订单状态',
                dataIndex: 'u',
                align: 'center',
                render: text => orderTypeArr[Number(text)]
            },
            {
                title: '创建时间',
                dataIndex: 'i',
                align: 'center'
            },
            {
                title: '更新时间',
                dataIndex: 'o',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'p',
                align: 'center',
                render: text => {
                    let OrderOk = <Button type="link" className="mr15" onClick={() => this.changeAffirmModal(true, text, 0)}>订单确认</Button>;
                    let Refund = <Button type="link" onClick={() => this.changeRefundModal(true, text)}>退款</Button>;
                    let Details = <Button type="link" onClick={() => this.changeAffirmModal(true, text, 1)}>订单详情</Button>;
                    let btnArr = [
                        '',
                        '',
                        (
                            <div className="tc">
                                {OrderOk} {Refund}
                            </div>
                        ),
                        (
                            <div className="tc">
                                {Details} {Refund}
                            </div>
                        ),
                        Details,
                        Refund,
                        '',
                        ''
                    ];
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
    reset = () => this.setState({ query: '', times: [], page: 1, storeType: '0', orderType: '0', ditchType: '0', claimType: '0' });

    // 导出
    exportXlxs = () => {
        console.log('导出')
    }

    // 更改选择器
    changeSelect = (v, field) => this.setState({ [field]: v });

    // 更改页码
    changePage = v => this.setState({ page: v })

    // 更改操作退款模态框
    changeRefundModal = (status, id) => {
        if (!status) return this.setState({ refundModal: status });
        this.setState({ refundModal: status, id });
    }

    // 更改input框
    changeInput = (e, field) => this.setState({ [field]: e.target.value });

    // 订单确认模态框 status true 显示 false 关闭 id type 0 订单确认 1 订单详情
    changeAffirmModal = (status, id, type) => {
        if (!status) return this.setState({ affirmModal: status, logisticsCompany: '', trackingNumber: '', affirmStatus: type });
        this.setState({ affirmModal: status, id, logisticsCompany: '', trackingNumber: '', affirmStatus: type });
    }

    render() {
        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <Search style={{ width: 250 }} placeholder="请输入订单ID或用户ID" value={this.state.query} onChange={this.changeQeury} onSearch={this.searchQuery} enterButton />
                        <Button type="primary" className="ml15" onClick={this.reset}>重置</Button>
                        <span className="ml15 tip mr15 mb15">订单建立时间:</span>
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
                        <span className="ml15 tip mr15">发起渠道:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.ditchType} onChange={v => this.changeSelect(v, 'ditchType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">定向</Option>
                            <Option value="2">邀请</Option>
                        </Select>
                        <span className="ml15 tip mr15">取货类型:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.claimType} onChange={v => this.changeSelect(v, 'claimType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">自取</Option>
                            <Option value="2">快递</Option>
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

                {/* 退款 */}
                <Modal
                    title="是否确认退款?"
                    visible={this.state.refundModal}
                    onCancel={() => this.changeRefundModal(false)}
                    footer={null}
                >
                    <div className="mb15">
                        <TextArea placeholder="拒绝退款时必填" rows={3} value={this.state.remark} onChange={e => this.changeInput(e, 'remark')} />
                    </div>
                    <div className="tc">
                        <Button type="primary" className="mr15">拒绝退款</Button>
                        <Button type="primary">确认退款</Button>
                    </div>
                </Modal>

                {/* 订单确认 */}
                <Modal
                    title={`${!this.state.affirmStatus ? '订单确认' : '订单详情'}`}
                    visible={this.state.affirmModal}
                    onCancel={() => this.changeAffirmModal(false)}
                    footer={null}
                >
                    <div className="mb15 tc">
                        <span>姓名: xxxxxxx</span> <span className
                        ="ml15">电话: xxxxxxx</span><span className
                        ="ml15">收件地址: xxxxxxxxxxxxx</span>
                    </div>
                    <div className="tc mb15">
                        <Input style={{ width: 300 }} placeholder="输入物流公司" value={this.state.logisticsCompany} onChange={e => this.changeInput(e, 'logisticsCompany')} />
                    </div>
                    <div className="tc mb15">
                        <Input style={{ width: 300 }} placeholder="输入物流单号" value={this.state.trackingNumber} onChange={e => this.changeInput(e, 'trackingNumber')} />
                    </div>
                    <div className="tc">
                        <Button type="primary" className="mr15">拒绝</Button>
                        <Button type="primary">确认</Button>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default ProductOrder;