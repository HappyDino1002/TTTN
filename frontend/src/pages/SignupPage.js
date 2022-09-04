import React from 'react';
import { Form, Input, Button, Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import '../css/Signup.css';
import axios from 'axios';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 9,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 7,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = ({ onAuth, history, loading }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onAuth(
            values.username,
            values.email,
            values.password,
            values.confirm
        )
        history.push('/admin')

    };

    return (

        <div className="ground">
            <div className="wrap-signup">
                <Row>
                    <Col span={24} offset={0}>
                        <div className="content-signup">
                            <p className="text-dec">Sign up</p>
                            {
                                loading ?
                                    <div className="spin">
                                        <Spin />
                                    </div>
                                    :

                                    <Form
                                        {...formItemLayout}
                                        form={form}
                                        name="register"
                                        onFinish={onFinish}
                                        scrollToFirstError
                                        size="large"
                                    >

                                        <Form.Item
                                            name="username"
                                            label="Username"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Username!',
                                                },
                                                {
                                                    min: 6,
                                                    message: 'This username is too short. It must contain at least 6 characters!',
                                                },
                                                {
                                                    validator: (_, value) =>
                                                        //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                                        new Promise(function (resolve, reject) {
                                                            axios.get('http://127.0.0.1:8000/manage/users')
                                                                .then(function (json) {

                                                                    var hasMatch = false;

                                                                    for (var index = 0; index < json.data.length; ++index) {

                                                                        var res = json.data[index];

                                                                        if (res.username === value) {
                                                                            hasMatch = true;
                                                                            break;
                                                                        }
                                                                    }

                                                                    if (hasMatch) {
                                                                        reject(new Error('A user with that username already exists!'))
                                                                    }

                                                                    resolve();
                                                                });
                                                        }),
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            label="E-mail"
                                            hasFeedback
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                                {
                                                    validator: (_, value) =>
                                                        //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                                        new Promise(function (resolve, reject) {
                                                            axios.get('http://127.0.0.1:8000/manage/users')
                                                                .then(function (json) {

                                                                    var hasMatch = false;

                                                                    for (var index = 0; index < json.data.length; ++index) {

                                                                        var res = json.data[index];

                                                                        if (res.email === value) {
                                                                            hasMatch = true;
                                                                            break;
                                                                        }
                                                                    }

                                                                    if (hasMatch) {
                                                                        reject(new Error('A user with that email already exists!'))
                                                                    }

                                                                    resolve();
                                                                });
                                                        }),
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            label="Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                {
                                                    min: 8,
                                                    message: 'This password is too short. It must contain at least 8 characters!',
                                                },
                                                {
                                                    max: 16,
                                                    message: 'This password is too short. It must contain at most 16 characters!',
                                                },
                                                {
                                                    pattern: /^(?=.*[0-9])(?=.*[a-z]).{8,}$/,
                                                    message: 'This password is too common!'
                                                }
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirm"
                                            label="Confirm Password"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item
                                            {...tailFormItemLayout}
                                        >
                                            <Button type="primary" htmlType="submit">
                                                Register
                                            </Button>
                                        </Form.Item>

                                    </Form>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);