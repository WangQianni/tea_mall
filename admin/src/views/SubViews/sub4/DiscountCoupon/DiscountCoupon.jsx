import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table, Popover, Modal } from 'antd';

const { Option } = Select;
const { confirm } = Modal;

const orderTypeArr = ['全部', '待支付', '待确认', '已确认', '已完成', '退款申请', '退款失败', '退款成功'];

// 优惠券
class DiscountCoupon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            storeType: '0', // 作用类型 0 全部 1 产品类型 2 预约类型
            orderType: '0', // 产品类型 0 全部 1 产品类型XX 2 产品类型XXX
            ditchType: '0', // 启用状态 0 全部 1 折扣 2 满减
            data: [
                { a: 1, s: 1, d: 1, f: 1, g: 1, h: 1, j: 1, k: 1, l: 1, q: 1, w: 1, e: 1, r: 1, t: 1, y: 1, u: 1, i: 1, o: 1, p: 2 }
            ], // 列表数据
            modal: false, // 优惠券添加模态框 true 显示 false 隐藏
            effectType: '0', // 作用类型 0 产品购买 1 预约支付
            productType: '0', // 产品类型 0 全部 1 产品类型名称XX 2 产品类型名称XXX
            useLimit: '', // 使用额度
            discount: '', // 折扣
            derate: '', // 减额
            timeLimit: '', // 时限
        }

        this.columns = [ // 定义列表数据
            {
                title: '优惠券ID',
                dataIndex: 'a',
                align: 'center',
                key: 1,
            },
            {
                title: '优惠券类型',
                dataIndex: 's',
                align: 'center',
                key: 2
            },
            {
                title: '产品涵盖',
                dataIndex: 'd',
                align: 'center',
                key: 3
            },
            {
                title: '使用额度',
                dataIndex: 'f',
                align: 'center',
                key: 4
            },
            {
                title: '折扣',
                dataIndex: 'g',
                align: 'center',
                key: 5
            },
            {
                title: '减额',
                dataIndex: 'h',
                align: 'center',
                key: 6
            },
            {
                title: '时限',
                dataIndex: 'j',
                align: 'center',
                key: 7
            },
            {
                title: '创建时间',
                dataIndex: 'k',
                align: 'center',
                key: 8
            },
            {
                title: '启用状态',
                dataIndex: 'k',
                align: 'center',
                key: 9
            },
            {
                title: '更新时间',
                dataIndex: 'l',
                align: 'center',
                key: 10
            },
            {
                title: '操作',
                dataIndex: 'p',
                align: 'center',
                key: 20,
                render: text => text === 1 ? <Button type="link" onClick={() => this.changeStatus(false)}>禁用</Button> : <Button type="link" onClick={() => this.changeStatus(true)}>启用</Button>
            }
        ]
    }

    // 更改选择器
    changeSelect = (v, field) => this.setState({ [field]: v });

    // 更改页码
    changePage = v => this.setState({ page: v });

    /**
     * 更改启用状态
     * @param {*} status true 为启用 false 禁用
     */
    changeStatus = status => {
        if (status) {
            confirm({
                title: '是否确认启用?',
                maskClosable: true,
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            confirm({
                title: '是否确认禁用?',
                maskClosable: true,
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }

    /**
     * 更改优惠券添加模态框
     * @param {*} status true 显示 false 隐藏
     * @memberof DiscountCoupon
     */
    changeModal = status => {
        if (!status) return this.setState({ modal: status });
        this.setState({ modal: status, effectType: '0', productType: '0', useLimit: '', discount: '', derate: '', timeLimit: '' });
    }

    // 更改选择器
    changeModalSelect = (v, field) => this.setState({ [field]: v });

    /**
     * 更改输入框值
     * @param {*} e 事件源
     * @param {*} field 字段名
     * @memberof DiscountCoupon
     */
    changeInput = (e, field) => this.setState({ [field]: e.target.value });

    // 确认添加
    handle = () => {
        this.changeModal(false)
    }

    render() {
        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <span className="tip mr15">作用类型:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.storeType} onChange={v => this.changeSelect(v, 'storeType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">产品类型</Option>
                            <Option value="2">预约类型</Option>
                        </Select>
                        <span className="ml15 tip mr15">产品类型:</span>
                        <Select defaultValue="lucy" style={{ width: 160 }} value={this.state.orderType} onChange={v => this.changeSelect(v, 'orderType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">产品类型名称XX</Option>
                            <Option value="2">预约类型名称XXX</Option>
                        </Select>
                        <span className="ml15 tip mr15">启用状态:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.ditchType} onChange={v => this.changeSelect(v, 'ditchType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">折扣</Option>
                            <Option value="2">满减</Option>
                        </Select>
                        <Button type="primary" style={{ marginLeft: 40 }} onClick={() => this.changeModal(true)}>优惠券添加</Button>
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

                {/* 优惠券添加 */}
                <Modal
                    title="优惠券添加"
                    visible={this.state.modal}
                    footer={null}
                    onCancel={() => this.changeModal(false)}
                    width={400}
                >
                    <div style={{ width: 400, marginBottom: 10 }}>
                        <span style={{ width: 60, marginRight: 20, display: 'inline-block' }}>作用类型</span>
                        <Select value={this.state.effectType} style={{ width: 120 }} onChange={v => this.changeModalSelect(v, 'effectType')}>
                            <Option value="0">产品购买</Option>
                            <Option value="1">预约支付</Option>
                        </Select>
                    </div>
                    <div style={{ width: 400, marginBottom: 10 }}>
                        <span style={{ width: 60, marginRight: 20, display: 'inline-block' }}>产品类型</span>
                        <Select value={this.state.productType} style={{ width: 160 }} onChange={v => this.changeModalSelect(v, 'productType')}>
                            <Option value="0">全部</Option>
                            <Option value="1">产品类型名称XX</Option>
                            <Option value="2">预约类型名称XXX</Option>
                        </Select>
                    </div>
                    <div style={{ width: 400, marginBottom: 10 }}>
                        <span style={{ width: 60, marginRight: 20, display: 'inline-block' }}>使用额度</span>
                        <Input style={{ width: 250 }} placeholder="可填写0,满减额度" type="text" value={this.state.useLimit} onChange={e => this.changeInput(e, 'useLimit')} />
                    </div>
                    <div style={{ width: 400, marginBottom: 10 }}>
                        <span style={{ width: 60, marginRight: 20, display: 'inline-block' }}>折扣</span>
                        <Input style={{ width: 250 }} placeholder="可填写0,填写 0- 1 的小数,精度0.01" type="text" value={this.state.discount} onChange={e => this.changeInput(e, 'discount')} />
                    </div>
                    <div style={{ width: 400, marginBottom: 10 }}>
                        <span style={{ width: 60, marginRight: 20, display: 'inline-block' }}>减额</span>
                        <Input style={{ width: 250 }} placeholder="可填写0,扣取额度" type="text" value={this.state.derate} onChange={e => this.changeInput(e, 'derate')} />
                    </div>
                    <div style={{ width: 400, marginBottom: 20 }}>
                        <span style={{ width: 60, marginRight: 20, display: 'inline-block' }}>时限</span>
                        <Input style={{ width: 250 }} placeholder="填写整数" type="text" value={this.state.timeLimit} onChange={e => this.changeInput(e, 'timeLimit')} />
                    </div>
                    <div className="tc">
                        <Button type="primary" onClick={this.handle}>确认添加</Button>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default DiscountCoupon;