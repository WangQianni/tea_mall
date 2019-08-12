import React, { Component } from 'react';
import { message } from 'antd'
import axios from '@axios'
import Cookie from 'js-cookie';
import './Login.scss'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            pass: ''
        }
    }

    changeVal = (e, type) => {
        this.setState({ [type]: e.target.value });
    }

    onSubmit = (ev) => {

        ev.preventDefault();
        ev.stopPropagation();

        let { text, pass } = this.state;
        
        if (text.trim().length === 0 || pass.trim().length === 0)
            return message.error('账号或密码不能为空');

        axios.post('/common/login', {
            userName: text,
            passWord: pass
        })
            .then(({ data }) => {
                if (data.code !== '200') return message.error(data.message);

                Cookie.set('state', data.responseBody.data);

                message.success('登录成功');

                this.props.history.push('/sub1/100');

            })

    }

    render() {

        let { text, pass } = this.state
        let { changeVal, onSubmit } = this

        return (
            <div className="SignIn_main">

                <div className="SignIn_form_box">
                    <h4 className="SignIn_title">后台管理系统</h4>
                    <form
                        className="SignIn_form"
                        onSubmit={onSubmit}
                    >
                        <div className="SignIn_form_text">
                            <input
                                type="text"
                                className="Rectangle-2"
                                placeholder="请输入用户名"
                                value={text}
                                onChange={e => changeVal(e, 'text')}
                            />
                        </div>
                        <div className="SignIn_form_text" style={{ marginBottom: 18 }}>
                            <input
                                type="password"
                                className="Rectangle-2"
                                placeholder="请输入密码"
                                value={pass}
                                onChange={e => changeVal(e, 'pass')}
                            />
                        </div>
                        <button type="submit" className="SignIn_form_button">
                            请求
                        </button>
                    </form>
                </div>

            </div>
        )
    }
}

export default Login