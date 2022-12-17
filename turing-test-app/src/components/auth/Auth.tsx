import React, { ChangeEvent, ChangeEventHandler, ReactEventHandler, useState } from "react";
import './Auth.css'
import Header from "../header/Header";
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { LoginCredentials } from "../../interfaces/loginCredentials";
import api from "../../Api/api";
import { useCookies } from 'react-cookie';

export default function Auth(props: any) {

    const size: SizeType = 'large';

    const [cookies, setCookie] = useCookies(['authToken', 'refreshToken']);
    const [authData, setAuthData] = useState<LoginCredentials>({
        username: '',
        password: ''
    });

    const updateUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthData({ username: e.target.value, password: authData.password });
    }

    const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthData({ username: authData.username, password: e.target.value });
    }

    const handleLogin = () => {

        api.post('auth/login', authData)
            .then((res) => {
                setCookie('authToken', res.data.access_token, { path: '/' })
                setCookie('refreshToken', res.data.refresh_token, { path: '/' })
                props.setisLoggedin();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="Auth-container" >
            <Header isLoggedin={false} />
            <div className="internal-Auth-Container">
                <div className="Auth-dialog">
                    <div style={{ marginBottom: '30px' }}>
                        <p style={{ fontSize: '14px', fontWeight: 600 }}><span style={{ color: 'red' }}>*</span> User Name</p>

                        <Input size="large" placeholder="Email" prefix={<UserOutlined />} onChange={updateUserName} />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <p style={{ fontSize: '14px', fontWeight: 600 }}><span style={{ color: 'red' }}>*</span> Password</p>

                        <Input size="large" type="password" placeholder="Password" prefix={<LockOutlined />} onChange={updatePassword} />
                    </div>

                    <Button type="primary" size={size} style={{ backgroundColor: '#4f46f8' }} onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}