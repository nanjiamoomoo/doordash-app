import {Button, Form, Input, message, Modal} from 'antd';
import React from 'react';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signup } from "../utils";
import {useState} from "react";

//used Modal to create a floating signup form over current page
const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //data is a JSON object
    const onFinish = (data) => {
        setLoading(true);
        signup(data)
            .then(() => {
                message.success('Signup Successful')
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
        <Button shape="round" type="primary" onClick={showModal}>
            Register
        </Button>
        <Modal
            title="Register"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                name="signup_form"
                style={{
                    width: 300,
                    margin: "auto",
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!'}]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!'}]}
                >
                    <Input prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your firstName!'}]}
                >
                    <Input placeholder="firstname"/>
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your lastName!'}]}
                >
                    <Input placeholder="lastname"/>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default SignupForm;