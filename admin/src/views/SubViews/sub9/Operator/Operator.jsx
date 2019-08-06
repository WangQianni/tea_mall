import React, { Component, Fragment } from 'react';
import { Button, Table, Modal, Icon, Input, Select } from 'antd';

const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;

// 操作员管理
class Operator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1, // 当前页码
            rows: 10, // 每页条数
            total: 1, // 总数
            data: [
                {
                    a: 1,
                    s: 2,
                    d: 3,
                    f: 4,
                    g: 5,
                    h: 6
                }
            ], // 列表数据
            addInput: '', // 添加搜索输入框
            addSelect: '0', // 添加筛选器
            addVisible: false, // 添加模态框
            userVisible: false, // 从属用户信息模态框
            query: '', // 搜索
            userData: [], // 用户数据
            userPage: 1, // 当前页码
            userRows: 10, // 每页条数
            userTotal: 1, // 总数
        }

        this.input = React.createRef()

        this.addContent = (
            <Fragment>

            </Fragment>
        )

        this.columns = [ // 定义列表数据
            {
                title: '用户ID',
                dataIndex: 'a',
                align: 'center'
            },
            {
                title: '预约完成单量',
                dataIndex: 's',
                align: 'center'
            },
            {
                title: '产品销售单量',
                dataIndex: 'd',
                align: 'center'
            },
            {
                title: '从属用户数量',
                dataIndex: 'f',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'g',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'h',
                align: 'center',
                render: text => (
                    <div style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={() => this.changeUserModal(true, text)}>从属信息</Button>
                        <Button type="link" onClick={() => this.removeRelation(text)}>移除</Button>
                    </div>
                )
            }
        ]

        this.userColumns = [ // 定义用户列表数据
            {
                title: '用户ID',
                dataIndex: 'a',
                align: 'center'
            },
            {
                title: '30天产品订单数量合计',
                dataIndex: 's',
                align: 'center'
            },
            {
                title: '累计消费总额',
                dataIndex: 'd',
                align: 'center'
            },
            {
                title: '累计充值总额',
                dataIndex: 'f',
                align: 'center'
            }
        ]
    }

    // 更改搜索框
    changeQeury = e => this.setState({ query: e.target.value.trim() });

    // 点击搜索
    searchQuery = v => console.log(v, this.state.query);

    // 重置
    reset = () => this.setState({ query: '' });

    // 更改页码
    changePage = v => this.setState({ page: v })

    // 更改字段text
    changeInput = (e, field) => this.setState({ [field]: e.target.value });

    // 更改选择器
    changeSelect = (value, field) => this.setState({ [field]: value });

    // 移除关系
    removeRelation = id => {
        confirm({
            title: '是否确认移除?',
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

    // 更改添加模态框状态
    changeAddModal = status => this.setState({ addVisible: status, addInput: '', addSelect: '0' })

    // 更改从属信息模态框状态
    changeUserModal = (status, id) => {
        if (!status) return this.setState({ userVisible: status });
        this.setState({ userVisible: status })
    }

    // 更改用户分页
    userChangePage = v => this.setState({ userPage: v });

    render() {
        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <Button type="primary" onClick={() => this.changeAddModal(true)}>操作员添加</Button>
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

                {/* 添加模态框 */}
                <Modal
                    title="操作员添加"
                    visible={this.state.addVisible}
                    onCancel={() => this.changeAddModal(false)}
                    footer={null}
                    width={350}
                >
                    <div className="mt15 mb15">
                        <Search value={this.state.addInput} placeholder="输入用户ID/手机号" onChange={e => this.changeInput(e, 'addInput')} onSearch={value => console.log(value)} enterButton />
                    </div>
                    <div className="mb15">
                        <span className="mr15">店铺所属</span>
                        <Select value={this.state.addSelect} style={{ width: 200 }} onChange={v => this.changeSelect(v, 'addSelect')}>
                            <Option value="0">全部</Option>
                            <Option value="1">店铺XXX</Option>
                            <Option value="2">店铺XXXXX</Option>
                        </Select>
                    </div>
                    <div className="tc mt15">
                        <Button type="primary" onClick={() => this.changeAddModal(false)}>确认添加</Button>
                    </div>
                </Modal>

                {/* 从属信息   */}
                <Modal
                    title="从属用户信息"
                    visible={this.state.userVisible}
                    onCancel={() => this.changeUserModal(false)}
                    footer={null}
                >
                    <div className="mb15">
                        <span>随机从属用户</span>
                        <Input style={{ width: 150, marginLeft: 15, marginRight: 15 }} placeholder="随机从属用户" />
                        <Button type="primary">添加</Button>
                    </div>
                    <div className="mb15">
                        <span>增加从属用户</span>
                        <Input style={{ width: 150, marginLeft: 15, marginRight: 15 }} placeholder="先写用户ID" />
                        <Button type="primary">添加</Button>
                    </div>
                    <div className="mb15">
                        <Search style={{ width: 250 }} placeholder="请输入用户ID" value={this.state.query} onChange={this.changeQeury} onSearch={this.searchQuery} enterButton />
                        <Button type="primary" className="ml15" onClick={this.reset}>重置</Button>
                    </div>
                    {/* 列表 */}
                    <div style={{ textAlign: 'center' }}>
                        <Table
                            bordered
                            dataSource={this.state.userData}
                            columns={this.userColumns}
                            pagination={{
                                total: this.state.userTotal,
                                pageSize: this.state.userRows,
                                onChange: this.state.userChangePage,
                                current: this.state.userPage,
                                hideOnSinglePage: true,
                                showQuickJumper: true,
                                showTotal: () => `共 ${this.state.userTotal} 条数据`
                            }}
                            size="small"
                            rowKey={(record, index) => index}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Operator