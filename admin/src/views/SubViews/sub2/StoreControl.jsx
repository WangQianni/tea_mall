import React, { Component, Fragment } from 'react';
import { Input, Button, Select, Table, Modal, Icon, message } from 'antd';
import axios from '@axios';
import ReactQMap from 'react-qmap';

const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;

// 店铺管理
class StoreControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModel: false, // 模态框
            query: '', // 搜索
            childQuery: '', // 子页面搜索
            mapSearch: '', // 店铺位置搜索
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页条数
            total: 1, // 总数
            childPage: 1, // 当前页码
            childRows: 10, // 每页条数
            childTotal: 1, // 总数
            province: '0', // 省份下拉标识
            provinceArr: [], // 省份列表
            number: '', // 服务电话
            platformName: '', // 平台名称
            flagModal: '', // 模态框标识
            mapShow: false, // 地图显示
            data: [
                {}
            ], // 列表数据
            childData: [
                {}
            ], // 子数据列表
            linkChildFlag: true, // 子页面切换
        }

        this.columns = [ // 定义列表数据
            {
                title: '店铺ID',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '店铺名称',
                dataIndex: 'age',
                align: 'center'
            },
            {
                title: '所属省份',
                dataIndex: 'address',
                align: 'center'
            },
            {
                title: '详细地址',
                dataIndex: '1',
                align: 'center'
            },
            {
                title: '建立时间',
                dataIndex: '2',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: '3',
                align: 'center',
                render: (t, r, i) => (
                    <>
                        <Button type="link" size="small" onClick={() => this.changeProductModal(false)}>店铺详情</Button>
                        <Button type="link" size="small" onClick={() => this.changeUpdate(true, r, 'update')}>店铺编辑</Button>
                        <Button type="link" size="small" onClick={() => this.changeDelete(true, r)}>店铺解除</Button>
                    </>
                )
            }
        ]

        this.childColumns = [ // 子页面定义列表数据
            {
                title: '产品ID',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '产品名称',
                dataIndex: 'age',
                align: 'center'
            },
            {
                title: '产品分类',
                dataIndex: 'address',
                align: 'center'
            },
            {
                title: '上架状态',
                dataIndex: '1',
                align: 'center'
            },
            {
                title: '状态更新时间',
                dataIndex: '2',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: '3',
                align: 'center',
                render: (t, r, i) => (
                    <>
                        <Button type="link" size="small" onClick={() => this.changeProjectModal(false)}>产品详情</Button>
                        <Button type="link" size="small" onClick={() => this.upOrdown(true, r)}>下架</Button>
                    </>
                )
            }
        ]
    }

    componentWillMount() {
        this.init();
    }

    init = () => {  // 初始化
        axios.post('/common/address/list', {
            id: '0'
        })
            .then(({ data }) => {
                if (data.code !== "200") return message.error(data.error);

                data.responseBody.data.unshift({
                    addrName: '全部',
                    id: '0'
                })

                this.setState({ provinceArr: data.responseBody.data });
            })
    }

    // 切换子页面
    changeProductModal = (linkChildFlag) => this.setState({ linkChildFlag })

    // 产品详情
    changeProjectModal = e => {
        console.log(e);

    }

    // 店铺编辑
    changeUpdate = (e, r, type) => this.setState({ isModel: true, flagModal: type })

    // 店铺解除
    changeDelete = (e, r) => {
        confirm({
            title: '是否确认解除合作?',
            maskClosable: true,
            icon: <Icon type="warning" />,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 上下架
    upOrdown = (e, r) => {
        confirm({
            title: '是否确认下架?',
            maskClosable: true,
            icon: <Icon type="warning" />,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 更改搜索框
    changeQeury = (e, type) => {
        if (type === 'father') this.setState({ query: e.target.value.trim() });
        if (type === 'child') this.setState({ childQuery: e.target.value.trim() });
    }

    // 店铺位置搜索框修改
    changeMapSearch = e => this.setState({ mapSearch: e.target.value.trim() })

    // 点击搜索店铺位置
    mapSearchReq = e => {
        this.setState({ mapShow: true })
    }

    // 点击搜索
    searchQuery = (v, type) => {
        if (type === 'father') console.log(v, this.state.query);
        if (type === 'child') console.log(v, this.state.childQuery);
    }

    // 平台、电话input
    changeValue = (e, type) => {
        if (type === 'platformName') this.setState({ platformName: e.target.value.trim() })
        if (type === 'number') this.setState({ number: e.target.value.trim() })
    }


    // 重置
    reset = (type) => {
        if (type === 'father') this.setState({ query: '', currentPage: 1, province: '0' });
        if (type === 'child') this.setState({ childQuery: '', childPage: 1 });

    }

    // 添加店铺
    addStore = type => this.setState({ isModel: true, flagModal: type })

    // 子页面更改选择器
    changeSelect = e => {
        this.setState({ province: e });
    }

    // 更改页码
    changePage = v => this.setState({ currentPage: v })

    // 更改子页面页码
    childChangePage = v => this.setState({ childPage: v })

    goBack = (linkChildFlag) => this.setState({ linkChildFlag });

    // 确认
    handleOk = e =>
        this.setState({
            isModel: false,
            platformName: '',
            number: '',
            mapShow: false
        });

    // 取消
    handleCancel = e => this.setState({ isModel: false, mapSearch: '', mapShow: false, platformName: '', number: '' });

    // 获取地图参数
    getTxMap = (e, v) => {
        console.log(v.Control);
    }
    render() {
        let { linkChildFlag, provinceArr, province, mapShow } = this.state;
        return (
            <div className="view">
                {
                    linkChildFlag ?
                        <Fragment>
                            {/* 顶部搜索框 */}
                            <div className="searchLayer">
                                <div className="mb15">
                                    <Search style={{ width: 250 }} placeholder="请输入用户ID" value={this.state.query} onChange={e => this.changeQeury(e, 'father')} onSearch={e => this.searchQuery(e, 'father')} enterButton />
                                    <Button type="primary" className="ml15" onClick={() => this.reset('father')}>重置</Button>
                                    <Button type="primary" className="ml15" onClick={() => this.addStore('addStore')}>添加店铺</Button>
                                </div>
                                <div className="mb15">
                                    <span className="tip mr15 ">省份:</span>
                                    <Select style={{ width: 120 }} value={province} onChange={e => this.changeSelect(e)}>
                                        {
                                            provinceArr.map((v, i) => <Option key={v.id} value={v.id}>{v.addrName}</Option>)
                                        }

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
                                        pageSize: this.state.pageSize,
                                        onChange: this.state.changePage,
                                        current: this.state.currentPage,
                                        hideOnSinglePage: true,
                                        showQuickJumper: true,
                                        showTotal: () => `共 ${this.state.total} 条数据`
                                    }}
                                    rowKey={(record, index) => index}
                                />
                            </div>
                        </Fragment> :
                        <Fragment>
                            {/* 返回上一级 */}
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <Button type="primary" className="ml15" onClick={() => this.goBack(true)}> 返回上一级 </Button>
                                <div style={{ marginLeft: '20px', fontSize: '16px' }}>店铺名称: 欢迎 </div>
                            </div>
                            {/* 顶部搜索框 */}
                            <div className="searchLayer">
                                <div className="mb15">
                                    <Search style={{ width: 250 }} placeholder="请输入用户ID" value={this.state.childQuery} onChange={e => this.changeQeury(e, 'child')} onSearch={e => this.searchQuery(e, 'child')} enterButton />
                                    <Button type="primary" className="ml15" onClick={() => this.reset('child')}>重置</Button>
                                </div>
                            </div>

                            {/* 列表 */}
                            <div style={{ textAlign: 'center' }}>
                                <Table
                                    bordered
                                    dataSource={this.state.childData}
                                    columns={this.childColumns}
                                    pagination={{
                                        total: this.state.childTotal,
                                        pageSize: this.state.childRows,
                                        onChange: this.state.childChangePage,
                                        current: this.state.childPage,
                                        hideOnSinglePage: true,
                                        showQuickJumper: true,
                                        showTotal: () => `共 ${this.state.childTotal} 条数据`
                                    }}
                                    rowKey={(record, index) => index}
                                />
                            </div>
                        </Fragment>
                }

                <Modal
                    title={this.state.flagModal === 'update' ? '店铺编辑' : '店铺添加'}
                    visible={this.state.isModel}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="mb15">
                        <span className="ml20 optionTip" style={{ marginLeft: 70 }}>店铺名称:</span>
                        <Input placeholder="输入额度不能为0" style={{ width: '50%', marginLeft: 20 }} value={this.state.platformName} onChange={e => this.changeValue(e, 'platformName')} />
                    </div>
                    <div className="mb15">
                        <span className="ml20 optionTip" style={{ marginLeft: 70 }}>店铺位置:</span>
                        <Search style={{ width: 250, marginLeft: 20 }} placeholder="请输入用户ID" value={this.state.mapSearch} onChange={e => this.changeMapSearch(e)} onSearch={e => this.mapSearchReq(e)} enterButton />
                    </div>
                    <div className="mb15">
                        <span className="ml20 optionTip" style={{ marginLeft: 70 }}>服务电话:</span>
                        <Input placeholder="输入额度不能为0" style={{ width: '50%', marginLeft: 20 }} value={this.state.number} onChange={e => this.changeValue(e, 'number')} />
                    </div>
                    {
                        mapShow ? <ReactQMap
                            center={{ latitude: 30.53786, longitude: 104.07265 }}
                            initialOptions={{ zoomControl: true, mapTypeControl: true }}
                            apiKey="4JOBZ-PS5KP-PACDZ-VWP4G-CLXQE-UOFSQ"
                            style={{ height: 300 }}    // 高度和宽度默认占父元素的100%
                            getMap={(e, v) => this.getTxMap(e, v) }
                        /> : null
                    }
                </Modal>


            </div>
        )
    }
}

export default StoreControl