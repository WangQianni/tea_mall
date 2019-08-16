import React, { Component } from 'react';
import { Input, Button, DatePicker, Select, Table } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

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
                        <Button type="link" size="small" onClick={() => this.changeStatusModal(true, r)}>启用</Button>
                    </>
                )
            }
        ]
    }

    // 更改搜索框
    changeQeury = e => this.setState({ query: e.target.value.trim() });

    // 产品编辑
    changeProductModal = e => {

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

    // 添加店铺
    addStore = () => {
        console.log('add')
    }

    // 更改选择器
    changeSelect = v => this.setState({ royaltyType: v });

    // 更改页码
    changePage = v => this.setState({ page: v })

    render() {
        return (
            <div className="view">

                {/* 顶部搜索框 */}
                <div className="searchLayer">
                    <div className="mb15">
                        <Search style={{ width: 250 }} placeholder="请输入用户ID" value={this.state.query} onChange={this.changeQeury} onSearch={this.searchQuery} enterButton />
                        <Button type="primary" className="ml15" onClick={this.reset}>重置</Button>
                        <Button type="primary" className="ml15" onClick={this.addStore}>添加店铺</Button>
                    </div>
                    <div className="mb15">
                        <span className="tip mr15 ">状态:</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} value={this.state.royaltyType} onChange={this.changeSelect}>
                            <Option value="0">全部</Option>
                            <Option value="1">启用</Option>
                            <Option value="2">禁用</Option>
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

            </div>
        )
    }
}

export default ProductMsgCtrl