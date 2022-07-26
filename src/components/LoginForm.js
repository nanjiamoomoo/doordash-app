import {Button, Form, Input, message} from 'antd';
import React from 'react';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../utils";
import {useState} from "react";

//login form to collect user input and execute a login request
const LoginForm = (props) => {
    const [loading, setLoading] = useState(false);
    const onFinish = (data) => {
        setLoading(true);
        login(data)
            .then(() => {
                message.success('Login Successful')
                props.onSuccess();
            })
            .catch((err)=> {
                message.error(err.message);
            })
            .finally( () => {
                    setLoading(false);
            });
    };

    return (
        <Form
            name="login_form"
            style={{
                width: 300,
                margin: "auto",
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input prefix = {<UserOutlined />} placeholder="Username"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password prefix = {<LockOutlined />} placeholder="Password"/>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;