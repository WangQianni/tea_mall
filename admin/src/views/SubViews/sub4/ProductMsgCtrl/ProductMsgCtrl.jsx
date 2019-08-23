import React, { Component, Fragment } from 'react';
import { Input, Button, DatePicker, Select, Table, Modal, message, Pagination, Upload, Icon } from 'antd';
import axios from '@axios'

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// 产品信息管理
class ProductMsgCtrl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '', // 搜索
            times: [], // 时间
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            royaltyType: '0', // 0 全部 1 启用 2 封禁
            data: [
                {}
            ], // 列表数据
            fileList: [],
            productModal: false, // 产品分类模态框 true 显示 false 隐藏
            title: '', // 副标题
            productName: '', // 产品名称
            productPlane: '', // 产地
            productCompany: '', // 生产公司
            productExplain: '', // 产品说明
            isAddProduct: 1, // 是否为添加产品 1 添加 2 编辑
            previewVisiblePr: false, // 产品icon
            previewImagePr: '',
            paramsNum: [], // 添加参数次数
            childFlag: true, // 子页面切换
            particularsModal: false, // 规格添加编辑模态框 true 显示 false 隐藏
        }

        this.columns = [ // 定义列表数据
            {
                title: '产品ID',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '产品类型',
                dataIndex: 'age',
                align: 'center'
            },
            {
                title: '产品操作状态',
                dataIndex: 'address',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: '1',
                align: 'center'
            },
            {
                title: '更新时间',
                dataIndex: '2',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: '3',
                align: 'center',
                render: (t, r, i) => (
                    <>
                        <Button type="link" size="small" onClick={() => this.changeProductModal(true, 2, r)}>产品编辑</Button>
                        <Button type="link" size="small" onClick={() => this.changeStatusModal(true, r)}>禁用</Button>
                        <Button type="link" size="small" onClick={this.particularsModal}>规格详情</Button>
                    </>
                )
            }
        ]

        this.childColumns = [ // 定义子页面列表数据
            {
                title: '规格名称',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '规格市场价格',
                dataIndex: 'age',
                align: 'center'
            },
            {
                title: '规格基础价格',
                dataIndex: 'address',
                align: 'center'
            },
            {
                title: '规格基础成本',
                dataIndex: '1',
                align: 'center'
            },
            {
                title: '基础增值百分比',
                dataIndex: '2',
                align: 'center'
            },
            {
                title: '预约状态',
                dataIndex: '3',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: '4',
                align: 'center'
            },
            {
                title: '更新时间',
                dataIndex: '5',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: '6',
                align: 'center',
                render: (t, r, i) => <Button type="link" size="small" onClick={() => this.addParticulars(true, 2, r)}>规格编辑</Button>
            }
        ]
    }

    // 子页面切换
    particularsModal = () => this.setState({ childFlag: false })

    // 返回上一页
    goBack = childFlag => this.setState({ childFlag })

    // 规格编辑/添加
    addParticulars = (status, type, id) => {
        if (!status) return this.setState({
            particularsModal: status,
            isAddProduct: type
        })

        this.setState({
            particularsModal: status,
            isAddProduct: type
        });
    }

    // 更改搜索框
    changeQeury = e => this.setState({ query: e.target.value.trim() });

    // 产品编辑
    changeProductModal = (status, type, id) => {

        if (!status) return this.setState({
            productModal: status,
            isAddProduct: type,
            paramsNum: [],
            title: '',
            productName: '',
            productPlane: '',
            productCompany: '',
            productExplain: ''
        })

        this.setState({
            productModal: status,
            isAddProduct: type,
            paramsNum: [],
            title: '',
            productName: '',
            productPlane: '',
            productCompany: '',
            productExplain: ''
        });
    }


    // 启用禁用
    changeStatusModal = (e, type) => {
        console.log(e, type);

    }


    // 点击搜索
    searchQuery = v => console.log(v, this.state.query);

    // 更改时间
    changeTime = date => this.setState({ times: date });

    // 重置
    reset = () => this.setState({ query: '', times: [], page: 1, royaltyType: '0' })

    // 更改选择器
    changeSelect = v => this.setState({ royaltyType: v });

    // 更改页码
    changePage = v => this.setState({ page: v })

    // 更改产品分类输入框值
    changeProductInput = (e, field) => this.setState({ [field]: e.target.value });

    // 模态框确认
    handleProductModal = () => this.setState({ productModal: false, particularsModal: false })

    // 添加参数
    addParams = () => {
        let { paramsNum } = this.state;
        if (paramsNum.length >= 9) return;

        paramsNum.push({})

        this.setState({ paramsNum })
    }
    // 删除参数
    delParams = i => {
        let { paramsNum } = this.state;
        paramsNum.splice(0, i)
        this.setState({ paramsNum })
    }
    // 图片蒙版
    handleCancel = () => this.setState({ previewVisiblePr: false });

    handlePreview = async file => { // 照片预览
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImagePr: file.url || file.preview,
            previewVisiblePr: true,
        });
    };

    handleChange = ({ fileList }) => { // 图片上传
        if (fileList.length)
            fileList.forEach((v, i) => {
                if (v.status == 'done') {
                    if (v.name.split('.')[1] !== 'png' || v.size > 1024) return message.error(`格式有问题！${v.name.split('.')[1] !== 'png' ? '不是png格式' : v.size > 1024 ? '尺寸大于1M' : ''}`);
                    axios.post('/common/file/upload', {
                        fileBase64Content: v.thumbUrl.split(',')[1],
                        fileName: v.name
                    })
                        .then(({ data }) => {
                            if (data.code !== "200") return message.error(data.message);
                            if (data.responseBody.code !== '1') return message.error(data.responseBody.message);
                            this.setState({ sqPUrl: data.responseBody.data })
                            message.success('上传成功')
                        })
                }
            })

        this.setState({ fileList });
    }

    getBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        let { fileList, previewVisiblePr, previewImagePr, paramsNum, childFlag } = this.state;

        return (
            <div className="view">
                {
                    childFlag ? 
                    <Fragment>
                            {/* 顶部搜索框 */}
                            <div className="searchLayer">
                                <div className="mb15">
                                    <Search style={{ width: 250 }} placeholder="请输入产品ID" value={this.state.query} onChange={this.changeQeury} onSearch={e => this.searchQuery(e, 'father')} enterButton />
                                    <Button type="primary" className="ml15" onClick={() => this.reset('father')}>重置</Button>
                                    <Button type="primary" className="ml15" onClick={() => this.changeProductModal(true, 1)}>产品添加</Button>
                                </div>
                                <div className="mb15">
                                    <span className="tip mr15 ">状态:</span>
                                    <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.royaltyType} onChange={this.changeSelect}>
                                        <Option value="0">全部</Option>
                                        <Option value="1">启用</Option>
                                        <Option value="2">关闭</Option>
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

                            {/* 产品信息添加/编辑 */}
                            <Modal
                                title={this.state.isAddProduct === 1 ? "产品信息添加" : "产品信息编辑"}
                                visible={this.state.productModal}
                                onOk={this.handleProductModal}
                                onCancel={() => this.changeProductModal(false)}
                            >

                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80 }}>产品名称</span>
                                    <Input style={{ width: 280 }} type="text" value={this.state.productName} onChange={e => this.changeProductInput(e, 'productName')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80, verticalAlign: 'top' }}>副标题</span>
                                    <Input rows={3} style={{ width: 360 }} value={this.state.title} onChange={e => this.changeProductInput(e, 'title')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80, verticalAlign: 'top' }}>产品说明</span>
                                    <TextArea rows={3} style={{ width: 360 }} value={this.state.productExplain} onChange={e => this.changeProductInput(e, 'productExplain')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80 }}>产地</span>
                                    <Input style={{ width: 280 }} type="text" value={this.state.productPlane} onChange={e => this.changeProductInput(e, 'productPlane')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80 }}>生产公司</span>
                                    <Input style={{ width: 280 }} type="text" value={this.state.productCompany} onChange={e => this.changeProductInput(e, 'productCompany')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 210 }}>其他参数: {paramsNum.length}/9(可以一个不填)</span>
                                    <span onClick={this.addParams} style={{ color: 'skyblue', cursor: 'pointer' }}>添加参数</span>
                                </div>
                                {
                                    paramsNum.map((v, i) =>
                                        <Fragment key={Math.random()}>
                                            <div >
                                                <span>参数名称 </span>
                                                <Input style={{ width: 100, margin: '0 10px 0 5px' }} type="text" />
                                                <span >参数内容 </span>
                                                <Input style={{ width: 100, margin: '0 10px 0 5px' }} type="text" />
                                                <Icon style={{ cursor: 'pointer' }} onClick={() => this.delParams(i)} type="minus-circle" />
                                            </div>
                                            <hr />
                                        </Fragment>
                                    )
                                }
                                <div style={fileList.length == 3 ? { marginBottom: 100 } : null} >
                                    <p className="fw600 mb15">添加图片 (格式png，大小不超过1M，尺寸xxxx*xxxx) </p>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        <div>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    </Upload>
                                    <Modal visible={previewVisiblePr} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImagePr} />
                                    </Modal>
                                </div>
                            </Modal>
                    </Fragment> : 
                    <Fragment>
                            {/* 返回上一级 */}
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <Button type="primary" className="ml15" onClick={() => this.goBack(true)}> 返回上一级 </Button>
                                <div style={{ marginLeft: '20px', fontSize: '16px' }}>产品名称: 欢迎 </div>
                            </div>
                            {/* 顶部搜索框 */}
                            <div className="searchLayer">
                                <div className="mb15">
                                    <Search style={{ width: 250 }} placeholder="请输入规格名称" value={this.state.query} onChange={this.changeQeury} onSearch={this.searchQuery} enterButton />
                                    <Button type="primary" className="ml15" onClick={this.reset}>重置</Button>
                                    <Button type="primary" className="ml15" onClick={() => this.addParticulars(true, 1)}>规格添加</Button>
                                </div>
                                <div className="mb15">
                                    <span className="tip mr15 ">预约状态:</span>
                                    <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.royaltyType} onChange={this.changeSelect}>
                                        <Option value="0">全部</Option>
                                        <Option value="1">可预约</Option>
                                        <Option value="2">不可预约</Option>
                                    </Select>
                                </div>
                            </div>

                            {/* 列表 */}
                            <div style={{ textAlign: 'center' }}>
                                <Table
                                    bordered
                                    dataSource={this.state.data}
                                    columns={this.childColumns}
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

                            {/* 规格添加/编辑 */}
                            <Modal
                                title={this.state.isAddProduct === 1 ? "规格添加" : "规格编辑"}
                                visible={this.state.particularsModal}
                                onOk={this.handleProductModal}
                                onCancel={() => this.addParticulars(false)}
                            >

                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80 }}>规格名称</span>
                                    <Input style={{ width: 280 }} type="text" value={this.state.productName} onChange={e => this.changeProductInput(e, 'productName')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80, verticalAlign: 'top' }}>市场单价</span>
                                    <Input rows={3} style={{ width: 360 }} value={this.state.title} onChange={e => this.changeProductInput(e, 'title')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80 }}>基础单价</span>
                                    <Input style={{ width: 280 }} type="text" value={this.state.productPlane} onChange={e => this.changeProductInput(e, 'productPlane')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80 }}>成本单价</span>
                                    <Input style={{ width: 280 }} type="text" value={this.state.productCompany} onChange={e => this.changeProductInput(e, 'productCompany')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 80 }}>增值百分比</span>
                                    <Input style={{ width: 280 }} type="text" value={this.state.addPercent} onChange={e => this.changeProductInput(e, 'addPercent')} />
                                </div>
                                <div className="mb15">
                                    <span className="fw600" style={{ display: 'inline-block', width: 210 }}>其他参数: {paramsNum.length}/9(可以一个不填)</span>
                                    <span onClick={this.addParams} style={{ color: 'skyblue', cursor: 'pointer' }}>添加参数</span>
                                </div>
                                {
                                    paramsNum.map((v, i) =>
                                        <Fragment key={Math.random()}>
                                            <div >
                                                <span>参数名称 </span>
                                                <Input style={{ width: 100, margin: '0 10px 0 5px' }} type="text" />
                                                <span >参数内容 </span>
                                                <Input style={{ width: 100, margin: '0 10px 0 5px' }} type="text" />
                                                <Icon style={{ cursor: 'pointer' }} onClick={() => this.delParams(i)} type="minus-circle" />
                                            </div>
                                            <hr />
                                        </Fragment>
                                    )
                                }
                                <div style={fileList.length == 3 ? { marginBottom: 100 } : null} >
                                    <p className="fw600 mb15">添加图片 (格式png，大小不超过1M，尺寸xxxx*xxxx) </p>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        <div>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    </Upload>
                                    <Modal visible={previewVisiblePr} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImagePr} />
                                    </Modal>
                                </div>
                            </Modal>
                    </Fragment>
                }
                

            </div>
        )
    }
}

export default ProductMsgCtrl