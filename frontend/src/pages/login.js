import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useRouter } from "next/router";



import Header from "@/layout/header/Header";
import Footer from "@/layout/footer/Footer";
// import Meta from "antd/es/card/Meta";
import Hero from "@/layout/main/Hero";



import styles from "@/assets/css/Home.module.css";





import Head from "next/head";

import { Card, Col, Row } from "antd";
const { Search } = Input;
import { Spin } from "antd";


import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



const access_token = "";


// table 





export default function login() {
    const [loginDetails, setLogin] = useState({
        username: "",
        password: "",
    });

    const user = {
        username: loginDetails.username,
        password: loginDetails.password,
    };
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}auth/login`,
            {
                username: "lksda8161",
                password: "lksda8161",
            }
            , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then((res) => {
                console.log(res.data); // check the structure of the response object
                const dataNew = JSON.stringify(res.data);
                const loggedInUser = localStorage.getItem("userToken");
                if (loggedInUser) {
                    // const foundUser = JSON.parse(loggedInUser);
                    localStorage.removeItem('userToken');
                    localStorage.setItem("userToken", dataNew);
                    console.log("Successfully logged in");
                    router.push("/"); // navigate to home page
                } else {
                    localStorage.setItem('userToken', dataNew);
                    console.log("Successfully logged in");
                    router.push("/"); // navigate to home page
                }
                console.log(localStorage.getItem("userToken")); // check if the token is saved to the local storage


            })
            .catch((err) => console.error(err));
    };

    return (
        <>

            <Head>
                <title>Public Gists</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.container} style={{ marginTop: "5%" }}>
                {/* <Form
                onSubmit={handleSubmit}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        onChange={(e) =>
                            setLogin({ ...loginDetails, username: e.target.value })
                          }
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        onChange={(e) =>
                            setLogin({ ...loginDetails, password: e.target.value })
                          }
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form> */}

                <div className="container">
                    <div className="col-md-9 card mx-auto d-flex flex-row px-0">
                        <div className="img-left d-md-flex d-none"></div>

                        <div className="card-body d-flex flex-column justify-content-center">
                            <h4 className="title text-center mt-4 pb-3">Login into accont</h4>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className="form-group ">
                                    <input
                                        className={styles.input}
                                        type="text"
                                        //   className="form-control "
                                        placeholder="email"
                                        onChange={(e) =>
                                            setLogin({ ...loginDetails, username: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group py-3 ">
                                    <input
                                        className={styles.input}
                                        type="password"
                                        //   className="form-control"
                                        placeholder="***"
                                        onChange={(e) =>
                                            setLogin({ ...loginDetails, password: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="">
                                    <input
                                        className={styles.buttonLogin}
                                        type="submit"
                                        //   className="btn  btn-outline-primary d-block w-100 "
                                        value="Login"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />



        </>
    );
}
