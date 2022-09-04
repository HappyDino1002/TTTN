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
                            <p className="text-dec" style={{color:'rgb(160, 208, 248)'}}>Đăng Ký</p>
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
                                            label="Tên đăng nhập"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nhập tên đăng nhập!',
                                                },
                                                {
                                                    min: 6,
                                                    message: 'Tên đăng nhập ngắn quá, nhiều hơn 6 ký tự!',
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
                                                                        reject(new Error('Tên đăng nhập này tồn tại rồi nè!'))
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
                                                    message: 'Này không phải email đâu!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Nhập email!',
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
                                                                        reject(new Error('Email này đã tồn tại!'))
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
                                            label="Mật khẩu"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Nhập mật khẩu!',
                                                },
                                                {
                                                    min: 8,
                                                    message: 'Quá ngắn, nhiều hơn 8 ký tự!',
                                                },
                                                {
                                                    max: 16,
                                                    message: 'Quá dài, không quá 16 ký tự!',
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
                                            label="Lặp lại mật khẩu"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Xác nhận lại mật khẩu!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject(new Error('Mật khẩu không giống nhau kìa!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item
                                            {...tailFormItemLayout}
                                        >
                                            <Button style={{ background: 'rgb(0,112,66)' , fontWeight: 'bold' }}
                                            type="primary" htmlType="submit">
                                                Đăng ký
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