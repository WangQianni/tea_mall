import React, { Component } from 'react';
import { Button, Select, Table, Popover, Modal, Radio, Input, message, Pagination } from 'antd';
import axios from '@axios';

const { Option } = Select;
const { TextArea } = Input;

// 产品分类管理
class ProductClassify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNum : 1, // 当前页码
            pageSize : 10, // 每页条数
            total: 1, // 总数
            accountType: '0', // 状态 0 全部 1 启用 2 关闭
            data: [
                
            ], // 列表数据
            id: '', // id
            statusModal: false, // 状态编辑模态框 true 显示 false 隐藏
            editType: 1, // 编辑状态 类型启用 1 启用 2 禁用
            miniPlaza: 1, // 编辑状态 微广场启用 1 启用 2 禁用
            productModal: true, // 产品分类模态框 true 显示 false 隐藏
            isAddProduct: 1, // 是否为添加产品 1 添加 2 编辑
            addType: 1, // 产品分类 类型启用 1 启用 2 禁用
            addMiniPlaza: 1, // 产品分类 微广场启用 1 启用 2 禁用
            typeName: '', // 类型名称
            miniPlazaName: '', // 微广场名称
        }

        this.columns = [ // 定义列表数据
            {
                title: '产品类型ID',
                dataIndex: 'id',
                align: 'center'
            },
            {
                title: '产品类型名称',
                dataIndex: 'typeName',
                align: 'center'
            },
            {
                title: '产品类型icon',
                dataIndex: 'c',
                align: 'center',
                render: text => (
                    <Popover placement="bottom" trigger="click" content={(
                        <div style={{ width: 256 }}>
                            <img style={{ display: 'block', width: '100%' }} src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723986986,1927550216&fm=26&gp=0.jpg" alt="" />
                        </div>
                    )}>
                        <Button type="link"> 查看</Button>
                    </Popover>
                )
            },
            {
                title: '微广场名称',
                dataIndex: 'squareName',
                align: 'center'
            },
            {
                title: '微广场icon',
                dataIndex: 'e',
                align: 'center',
                render: text => (
                    <Popover placement="bottom" trigger="click" content={(
                        <div style={{ width: 256 }}>
                            <img style={{ display: 'block', width: '100%' }} src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723986986,1927550216&fm=26&gp=0.jpg" alt="" />
                        </div>
                    )}>
                        <Button type="link"> 查看</Button>
                    </Popover>
                )
            },
            {
                title: '微广场广告图',
                dataIndex: 'f',
                align: 'center',
                render: text => (
                    <Popover placement="bottom" trigger="click" content={(
                        <div style={{ width: 256 }}>
                            <img style={{ display: 'block', width: '100%' }} src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723986986,1927550216&fm=26&gp=0.jpg" alt="" />
                        </div>
                    )}>
                        <Button type="link"> 查看</Button>
                    </Popover>
                )
            },
            {
                title: '产品类型状态',
                dataIndex: 'productTypeEnable',
                align: 'center'
            },
            {
                title: '广场状态',
                dataIndex: 'squareEnable',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'createdTime',
                align: 'center',
            },
            {
                title: '更新时间',
                dataIndex: 'updatedTime',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'l',
                align: 'center',
                render: text => (
                    <>
                        <Button type="link" size="small" onClick={() => this.changeProductModal(true, 2, text)}>类型编辑</Button>
                        <Button type="link" size="small" onClick={() => this.changeStatusModal(true, text)}>状态编辑</Button>
                    </>
                )
            }
        ]
    }

    componentDidMount(){
        this.init()
    }

    init = () => {
        let { pageNum, pageSize } = this.state;
        axios.post('/admin/productType/list', {
            enable:'',
            pageNum,
            pageSize,
            sort: 1
        })
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);
                
                this.setState({ data: data.responseBody.data.list, total: data.total})
            })
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
    changeSelect = v => {
        let { pageNum, pageSize } = this.state;
        
        let data = {
            enable: !-v ? '' : Number(v),
            pageNum,
            pageSize,
            sort: 1
        }

        axios.post('/admin/productType/list', data)
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);

                this.setState({ 
                    data: data.responseBody.data.list, 
                    total: data.total,
                    accountType: v
                })
            })
    };

    // 更改页码
    changePage = v => this.setState({ page: v })

    // 显示 true/隐藏 false 状态编辑模态框
    changeStatusModal = (status, id) => {
        if (!status) this.setState({ statusModal: status });
        this.setState({ statusModal: status, id });
    }

    // 状态编辑确认按钮
    handleStatusModal = () => {
        this.changeStatusModal(false);
    }

    // 更改 单选框 
    changeRadio = (e, field) => this.setState({ [field]: e.target.value });

    /**
     * 更改 添加/编辑 产品分类模态框显示/隐藏
     * @param {*} status true 显示 false 隐藏
     * @param {*} type 1 添加 2 编辑
     * @param {*} id 记录id
     * @memberof ProductClassify
     */
    changeProductModal = (status, type, id) => {
        if (!status) return this.setState({ productModal: status, isAddProduct: type });
        this.setState({ productModal: status, isAddProduct: type, id });
    }

    /**
     * isAddProduct 为 1 添加 2 编辑
     */
    handleProductModal = () => {
        this.changeProductModal(false, 1);
    }

    // 更改产品分类输入框值
    changeProductInput = (e, field) => this.setState({ [field]: e.target.value });

    render() {
        let { data, total, pageNum, pageSize } = this.state;
        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <span className="tip mr15">状态:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.accountType} onChange={this.changeSelect}>
                            <Option value="0">全部</Option>
                            <Option value="1">启用</Option>
                            <Option value="2">关闭</Option>
                        </Select>
                        <Button type="primary" style={{ marginLeft: 25 }} onClick={() => this.changeProductModal(true, 1)}>产品分类添加</Button>
                    </div>
                </div>

                {/* 列表 */}
                <div style={{ textAlign: 'center' }}>
                    <Table
                        bordered
                        dataSource={data}
                        columns={this.columns}
                        pagination={{
                            total,
                            pageSize,
                            onChange: this.changePage,
                            current: pageNum,
                            hideOnSinglePage: true,
                            showQuickJumper: true,
                            showTotal: () => `共 ${total} 条数据`
                        }}
                        rowKey={(record, index) => index}
                    />
                </div>

                {/* 状态编辑 */}
                <Modal
                    title="状态编辑"
                    visible={this.state.statusModal}
                    onOk={this.handleStatusModal}
                    onCancel={() => this.changeStatusModal(false)}
                    width={270}
                >
                    <div className="mb15">
                        <span style={{ display: 'inline-block', width: 80 }}>类型启用</span>
                        <Radio.Group onChange={e => this.changeRadio(e, 'editType')} value={this.state.editType} buttonStyle="solid">
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>禁用</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        <span style={{ display: 'inline-block', width: 80 }}>微广场启用</span>
                        <Radio.Group onChange={e => this.changeRadio(e, 'miniPlaza')} value={this.state.miniPlaza} buttonStyle="solid">
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>禁用</Radio>
                        </Radio.Group>
                    </div>
                </Modal>

                {/* 产品类型添加/编辑 */}
                <Modal
                    title={this.state.isAddProduct === 1 ? "产品类型添加" : "产品类型编辑"}
                    visible={this.state.productModal}
                    onOk={this.handleProductModal}
                    onCancel={() => this.changeProductModal(false)}
                >
                    <div className="mb15">
                        <span className="fw600" style={{ display: 'inline-block', width: 80 }}>类型名称</span>
                        <Input style={{ width: 280 }} type="text" value={this.state.typeName} onChange={e => this.changeProductInput(e, 'typeName')} />
                    </div>
                    <div className="mb15">
                        <span className="fw600" style={{ display: 'inline-block', width: 80 }}>微广场名称</span>
                        <Input style={{ width: 280 }} type="text" value={this.state.miniPlazaName} onChange={e => this.changeProductInput(e, 'miniPlazaName')} />
                    </div>
                    <div className="mb15">
                        <span className="fw600" style={{ display: 'inline-block', width: 80, verticalAlign: 'top' }}>微广场说明</span>
                        <TextArea rows={3} style={{ width: 360 }} value={this.state.miniPlazaName} onChange={e => this.changeProductInput(e, 'miniPlazaName')} />
                    </div>
                    <div className="mb15">
                        <span className="fw600" style={{ display: 'inline-block', width: 80 }}>类型启用</span>
                        <Radio.Group onChange={e => this.changeRadio(e, 'addType')} value={this.state.addType} buttonStyle="solid">
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>禁用</Radio>
                        </Radio.Group>
                    </div>
                    <div className="mb15">
                        <span className="fw600" style={{ display: 'inline-block', width: 80 }}>微广场启用</span>
                        <Radio.Group onChange={e => this.changeRadio(e, 'addMiniPlaza')} value={this.state.addMiniPlaza} buttonStyle="solid">
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>禁用</Radio>
                        </Radio.Group>
                    </div>
                    <p className="fw600 mb15">产品类型icon 添加 <span style={{fontWeight: 'normal'}}>(格式png，大小不超过1M，尺寸xxxx*xxxx)</span></p>
                    <p className="fw600 mb15">微广场图片添加 <span style={{fontWeight: 'normal'}}>(格式png，大小不超过1M，尺寸xxxx*xxxx)</span></p>
                </Modal>

            </div>
        )
    }
}

export default ProductClassify