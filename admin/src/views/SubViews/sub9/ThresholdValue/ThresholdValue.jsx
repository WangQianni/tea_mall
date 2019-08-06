import React, { Component } from 'react';
import { Table, Modal, Input, message } from 'antd';

// 平台阈值管理
class ThresholdValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModel: false, // 模态框
            data: [], // 数据
            info: {}, // 参数对象
        };

        this.columns = [
            {
                title: '参数名称',
                align: 'center',
                dataIndex: 'paramName',
                key: 'paramName'
            },
            {
                title: '当前设置值',
                align: 'center',
                dataIndex: 'paramValue',
                key: 'paramValue',
                render: (text, rowData) => rowData.remark !== '1是启用0是禁用' ? text : rowData.paramValue === 1 ? '启用' : rowData.paramValue === 0 ? '禁用' : ''
            },
            {
                title: '备注',
                align: 'center',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '详情',
                align: 'center',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作',
                align: 'center',
                dataIndex: '2',
                key: '2',
                render: (text, rowData, index) => (
                    <span className="color" onClick={e => this.showModal(JSON.parse(JSON.stringify(rowData)))}>编辑</span>
                )
            }
        ];
    }

    componentWillMount() {
        this.init();
    }

    init = () => {
        // axios.post('/platform/threshold/page', { pageId: 1, size: 20 })
        //     .then(({ data }) => {
        //         if (data.status !== "200") return message.error(data.msg);
        //         this.setState({ data: data.result, total: data.totalCount });
        //     })
    }

    onChange = e => { // 更改输入框
        let { info } = this.state;
        info.paramValue = e.target.value;
        this.setState({ info });
    }

    showModal = info => { // 显示模态框
        this.setState({
            isModel: true,
            info
        });
    }

    handleOk = () => { // 模态框确认
        // let { info } = this.state;
        // console.log(info)
        // if (isNaN(Number(info.paramValue))) return message.error('请输入数字');
        
        // if (
        //     (info.remark === '请填写整数' && /^[1-9]+[0-9]{0,}$/.test(info.paramValue))
        //     ||
        //     ( ((info.remark === '请填写0-1的小数，精度：0.0001' && !isNaN(Number(info.paramValue)) && info.paramValue.substr(info.paramValue.indexOf('.')).length < 6)) && info.paramValue <= 1 && info.paramValue >= 0 )
        //     || 
        //     ( info.remark === '1是启用0是禁用' && (info.paramValue === '0' || info.paramValue === '1') )
        // ) {
        //     axios.post('/platform/threshold/upd', { ...info })
        //         .then(({ data }) => {
        //             if (data.status !== "200") return message.error(data.msg);
        //             message.success('编辑成功');
        //             this.setState({
        //                 isModel: false,
        //                 info: {}
        //             }, () => this.init());
        //         })
        // } else {
        //     message.error('请按照规则输入');
        // }
    }

    handleCancel = () => { // 模态框取消
        this.setState({
            isModel: false,
            info: {}
        });
    }

    render() {
        return (
            <div>

                <Table
                    rowKey={(r, i) => i}
                    columns={this.columns}
                    dataSource={this.state.data}
                    bordered
                    size="middle"
                    style={{ textAlign: 'center' }}
                    pagination={false}
                />

                <Modal
                    title="额度编辑"
                    visible={this.state.isModel}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="250px"
                >

                    <Input value={this.state.info.paramValue} onChange={this.onChange} />

                </Modal>

            </div>
        )
    }
}

export default ThresholdValue;