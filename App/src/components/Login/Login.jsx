
import { Button, Input } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from '../../constant';
import cs from "./login.module.css"
import logo from "./static/TT_logo.png"
import { useRouter } from 'next/router';
import { ShowLoader } from '../ShowLoader';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import HeaderComp from '../Header/Header';

const Login = () => {
    const [login_username, setLoginUsername] = useState("")
    const [login_password, setLoginPassword] = useState("")

    const router = useRouter();


    const submitLogin = () => {

        ShowLoader("Signing In")
        if (login_username ==="" || login_password===""){
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Please Enter All Fields!",
                showConfirmButton: true,

            })
        }
        else{
        const user = {
            username: login_username,
            password: login_password
        }

        fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                return response.json()
            })
            .then(async data => {

                if (data["user"]) {
                    Swal.fire({
                        icon: "success",
                        title: "Login Successful",
                        text: "Thank you for registering with us.",
                        showConfirmButton: true,
                        timer: 2000,
                    })

                    router.push({ pathname: "/calls", query: { token: data.access_token } })

                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",
                        text: "Try Again",
                        showConfirmButton: true,

                    })
                }

            })
        }
    }



    return (
        <div className={cs.wrap}>
            <HeaderComp showLogout={false} />

            <div className={cs.login_container}>
                <div>
                    <p className={cs.label_style} >User Name</p>
                    <Input size="large" className={cs.input_style} prefix={<UserOutlined />} onChange={e => setLoginUsername(e.target.value)} placeholder="Enter name" />
                </div>
                <br />
                <div>
                    <p className={cs.label_style} >Password</p>
                    <Input size="large" className={cs.input_style}  prefix={<LockOutlined />} onChange={e => setLoginPassword(e.target.value)} placeholder="Enter Password" />
                </div>
                <br /><br />
                <Button type="primary" size={'large'} onClick={submitLogin} className={cs.btn_style}>Login</Button>

            </div>

        </div>
    );
};

export default Login;
