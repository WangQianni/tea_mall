import React, { Component, Fragment } from 'react';
import { Button, Select, Table, Popover, Modal, Radio, Input, message, Pagination, Upload, Icon } from 'antd';
import axios from '@axios';

const { Option } = Select;
const { TextArea } = Input;

// 产品分类管理
class ProductClassify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页条数
            total: 1, // 总数
            data: [], // 列表数据
            selectData: [
                {
                    key: 0,
                    value: '全部'
                },
                {
                    key: 1,
                    value: '启用'
                },
                {
                    key: 2,
                    value: '关闭'
                },
            ],
            id: '', // id
            selectNum: 0, // 下拉框数值
            statusModal: false, // 状态编辑模态框 true 显示 false 隐藏
            editType: 1, // 编辑状态 类型启用 1 启用 2 禁用
            miniPlaza: 1, // 编辑状态 微广场启用 1 启用 2 禁用
            productModal: false, // 产品分类模态框 true 显示 false 隐藏
            isAddProduct: 1, // 是否为添加产品 1 添加 2 编辑
            addType: 1, // 产品分类 类型启用 1 启用 2 禁用
            addMiniPlaza: 1, // 产品分类 微广场启用 1 启用 2 禁用
            typeName: '', // 类型名称
            miniPlazaName: '', // 微广场名称
            squareExplain: '',// 微广场说明
            icon: '', // 产品类型icon
            squareIcon: '', // 微广场Icon
            squarePhoto: '', //  微广场图片
            previewVisiblePr: false, // 产品icon
            previewImagePr: '',
            fileList: [],
            proUrl: '', // 产品icon标识
            sqIconUrl: '', // 微广场icon标识
            sqPUrl: '', // 微广场广告图标识
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
                dataIndex: 'proIcon',
                align: 'center',
                render: (t, r, i) => (
                    <Popover placement="bottom" trigger="click" content={(
                        <div style={{ width: 256 }}>
                            <img style={{ display: 'block', width: '100%' }} src={this.state.proIcon} alt="" />
                        </div>
                    )}>
                        <Button type="link" onClick={() => this.lookIcon(r, 'pro')}> 查看</Button>
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
                dataIndex: 'squareIcon',
                align: 'center',
                render: (t, r, i) => (
                    <Popover placement="bottom" trigger="click" content={(
                        <div style={{ width: 256 }}>
                            <img style={{ display: 'block', width: '100%' }} src={this.state.squareIcon} alt="" />
                        </div>
                    )}>
                        <Button type="link" onClick={() => this.lookIcon(r, 'square')}> 查看</Button>
                    </Popover>
                )
            },
            {
                title: '微广场广告图',
                dataIndex: 'squarePhoto',
                align: 'center',
                render: (t, r, i) => (
                    <Popover placement="bottom" trigger="click" content={(
                        <div style={{ width: 256 }}>
                            <img style={{ display: 'block', width: '100%' }} src={this.state.squarePhoto} alt="" />
                        </div>
                    )}>
                        <Button type="link" onClick={() => this.lookIcon(r, 'ad')}> 查看</Button>
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
                render: (t, r, i) => (
                    <>
                        <Button type="link" size="small" onClick={() => this.changeProductModal(true, 2, r)}>类型编辑</Button>
                        <Button type="link" size="small" onClick={() => this.changeStatusModal(true, r)}>状态编辑</Button>
                    </>
                )
            }
        ]
    }

    componentDidMount() {
        this.init()
    }

    init = () => { // 初始化
        let { currentPage, pageSize, addMiniPlaza, addType } = this.state;
        axios.post('/admin/productType/list', {
            enable: '',
            pageNum: currentPage,
            pageSize
        })
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);

                data.responseBody.data.list.map(v => {
                    v.squareEnable = v.squareEnable === 1 ? '启用' : v.squareEnable === 2 ? '禁用' : '';
                    v.productTypeEnable = v.productTypeEnable === 1 ? '启用' : v.productTypeEnable === 2 ? '禁用' : '';
                    return v;
                })

                this.setState({ data: data.responseBody.data.list, total: data.responseBody.data.total, addMiniPlaza, addType })
            })
    }

    // 查看图片
    lookIcon = (r, type) => {
        let data = {};

        if (type === 'square') {
            data = {
                category: 2,
                resourceId: r.squareId,
                type: 201
            }
        }

        if (type === 'pro') {
            data = {
                category: 1,
                resourceId: r.id,
            }
        }

        if (type === 'ad') {
            data = {
                category: 2,
                resourceId: r.squareId,
                type: 202
            }
        }

        axios.post('/common/attachment/list', data)
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);

                this.setState({
                    proIcon: data.responseBody.data[0].url,
                    squareIcon: data.responseBody.data[0].url,
                    squarePhoto: data.responseBody.data[0].url,
                })
            })

    }

    // 更改选择器
    changeSelect = v => this.setState({ selectNum: v, currentPage: 1 }, () => { this.axiosSelect()})

    axiosSelect = e => { // 更改选择器交互
        let { currentPage, pageSize, selectNum } = this.state;

        let dataList = {
            enable: !selectNum ? '' : Number(selectNum),
            pageNum: currentPage,
            pageSize
        }

        axios.post('/admin/productType/list', dataList)
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);

                data.responseBody.data.list.map(v => {
                    v.squareEnable = v.squareEnable === 1 ? '启用' : v.squareEnable === 2 ? '禁用' : '';
                    v.productTypeEnable = v.productTypeEnable === 1 ? '启用' : v.productTypeEnable === 2 ? '禁用' : '';
                    return v;
                })

                this.setState({
                    data: data.responseBody.data.list,
                    total: data.responseBody.data.total,
                })
            })
    }

    // 更改页码 
    changePage = v => {
        this.setState({ currentPage: v }, () => {
            this.init()
        })
    }

    // 显示 true/隐藏 false 状态编辑模态框
    changeStatusModal = (status, id) => {
        if (!status) return this.setState({ statusModal: status });
        this.setState({ statusModal: status, id: id.id, editType: id.productTypeEnable === '禁用' ? 2 : 1, miniPlaza: id.squareEnable === '禁用' ? 2 : 1, });
    }

    // 状态编辑确认按钮
    handleStatusModal = () => {
        let { id, editType, miniPlaza, selectNum } = this.state;

        axios.post('/admin/productType/updEnable', {
            id,
            productTypeEnable: editType,
            squareEnable: miniPlaza
        })
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);
                message.success('修改成功');
                if (!selectNum) this.init()
                else this.axiosSelect()
            })

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
        console.log(id);
        if (!status) return this.setState({ productModal: status, isAddProduct: type });
        this.setState({ productModal: status, isAddProduct: type, id });
        if (type == 2) {

            this.setState({ 
                productModal: status, 
                isAddProduct: type, id, 
                editType: id.squareEnable == '禁用' ? 2 : 1, 
                miniPlaza: id.productTypeEnable == '禁用' ? 2 : 1,
                typeName: id.typeName,
                miniPlazaName: id.squareName
            })
        }
    }

    /**
     * isAddProduct 为 1 添加 2 编辑
     */
    handleProductModal = () => { // 确认按钮
        let { isAddProduct, typeName, miniPlazaName, data, squareExplain, fileList, addType, addMiniPlaza, proUrl, sqIconUrl, sqPUrl, id, selectNum, miniPlaza, editType } = this.state;
        console.log(miniPlaza, editType);
        if (!miniPlazaName.trim()) return message.error('微广场名称不能为空');
        if (!typeName.trim()) return message.error('产品名称不能为空');
        if (!squareExplain.trim()) return message.error('微广场说明不能为空');
        if (fileList.length !== 3) return message.error('产品Icon、微广场Icon或微广场广告图必传');
        for (let i = 0; i < data.length; i++) {
            if (data[i].squareName === miniPlazaName) return message.error('微广场名称不能重复！');
            if (data[i].typeName === typeName) return message.error('产品名称不能重复！');
        }


        const addList = { // 新增
            attachmentInfoList: [
                {
                    name: fileList[0].name,
                    type: 101,
                    url: proUrl,
                },
                {
                    name: fileList[1].name,
                    type: 201,
                    url: sqIconUrl,
                },
                {
                    name: fileList[2].name,
                    type: 202,
                    url: sqPUrl,
                }
            ],
            typeName,
            squareName: miniPlazaName,
            squareEnable: addMiniPlaza,
            productTypeEnable: addType,
            description: squareExplain
        }

        const updateList = { // 修改
            attachmentInfoList: [
                {
                    name: fileList[0].name,
                    type: 101,
                    url: proUrl,
                },
                {
                    name: fileList[1].name,
                    type: 201,
                    url: sqIconUrl,
                },
                {
                    name: fileList[2].name,
                    type: 202,
                    url: sqPUrl,
                }
            ],
            typeName,
            squareName: miniPlazaName,
            squareEnable: miniPlaza,
            productTypeEnable: editType,
            description: squareExplain,
            id: isAddProduct === 2 ? id['id'] : ''
        }

        axios.post('/admin/productType/saveOrEdit', isAddProduct === 1 ? addList : updateList)
            .then(({ data }) => {
                console.log(data);
                if (data.code !== "200") return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);
                message.success(isAddProduct === 1 ? '添加成功' : '修改成功');
                if (!selectNum) this.init()
                else this.axiosSelect()
            })

        this.changeProductModal(false, 1);
        this.setState({ typeName: '', miniPlazaName: '', squareExplain: '', fileList: [] })
    }

    // 更改产品分类输入框值
    changeProductInput = (e, field) => this.setState({ [field]: e.target.value });

    // 图片蒙版
    handleCancel = () => this.setState({ previewVisiblePr: false });

    handlePreview = async file => { // 照片预览
        console.log(file);

        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImagePr: file.url || file.preview,
            previewVisiblePr: true,
        });
    };

    handleChange = ({ fileList }) => { // 图片上传
        if (fileList.length === 1 && fileList[0].status == "done") {
            var proData = {
                fileBase64Content: fileList[0].thumbUrl.split(',')[1],
                fileName: fileList[0].name
            }
        }
        if (fileList.length === 2 && fileList[1].status == "done") {
            var squareIconData = {
                fileBase64Content: fileList[1].thumbUrl.split(',')[1],
                fileName: fileList[1].name
            }
        }
        if (fileList.length === 3 && fileList[2].status == "done") {
            var squarePhotoData = {
                fileBase64Content: fileList[2].thumbUrl.split(',')[1],
                fileName: fileList[2].name
            }
        }
        if (fileList.length == 1 && fileList[0].status == "done") axios.post('/common/file/upload', proData)
            .then(({ data }) => {
                if (data.code !== "200") return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);
                this.setState({ proUrl: data.responseBody.data })
                message.success('上传成功')

            })

        if (fileList.length == 2 && fileList[1].status == "done") axios.post('/common/file/upload', squareIconData)
            .then(({ data }) => {
                if (data.code !== "200") return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);
                this.setState({ sqIconUrl: data.responseBody.data })
                message.success('上传成功')
            })

        if (fileList.length == 3 && fileList[2].status == "done") axios.post('/common/file/upload', squarePhotoData)
            .then(({ data }) => {
                if (data.code !== "200") return message.error(data.message);
                if (data.responseBody.code !== '1') return message.error(data.responseBody.message);
                this.setState({ sqPUrl: data.responseBody.data })
                message.success('上传成功')
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
        let { data, total, currentPage, pageSize, previewVisiblePr, previewImagePr, fileList, selectData } = this.state;

        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <span className="tip mr15">状态:</span>
                        <Select defaultValue={selectData[0].value} style={{ width: 120 }} onChange={this.changeSelect}>
                            {
                                selectData.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)
                            }
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
                            current: currentPage,
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
                        <TextArea rows={3} style={{ width: 360 }} value={this.state.squareExplain} onChange={e => this.changeProductInput(e, 'squareExplain')} />
                    </div>
                    {
                        this.state.isAddProduct === 1 ? <Fragment>
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
                        </Fragment> : null
                    }
                    <div style={fileList.length == 3 ? { marginBottom: 100 } : null} >
                        <p className="fw600 mb15">产品icon、微广场icon、微广场广告图添加 (格式png，大小不超过1M，尺寸xxxx*xxxx) </p>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 3 ? null : (
                                <div>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">{!fileList.length ? '产品icon Upload' : fileList.length == 1 ? '微广场icon Upload' : fileList.length == 2 ? '微广场广告图 Upload' : ''}</div>
                                </div>
                            )}
                        </Upload>
                        <Modal visible={previewVisiblePr} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImagePr} />
                        </Modal>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default ProductClassify