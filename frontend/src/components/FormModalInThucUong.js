
import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';
import HTTP from '../services/axiosConfig'
import { Select } from 'antd';
import axios from 'axios';
import KhoNVL from '../pages/Manage/KhoNVL/KhoNVL';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [KhoNVL, setKhoNVL] = React.useState([]);
    const [change, setChange] = React.useState([]);

    function handleChange(value) {
        //console.log(`selected ${value}`);
        setChange(value);
        console.log(change);
    }

    const khonvl = [];
    KhoNVL.map((value) => {
        khonvl.push(<Option key={value.MaNVL}>{value.TenNVL}</Option>);
        return value;
        
    })

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/KhoNVL-list').then((res) => {
            if (isMounted) {
                setKhoNVL(res.data)
            }
        })
        return () => { isMounted = false }
    }, [])

    return (
        <Modal
            visible={visible}
            title="Tạo thức uống mới"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="MaTU"
                    label="Mã Thức Uống"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt mã thức uống!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/ThucUong-list')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.MaTU === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('Mã kho sản phẩm đã tồn tại!'))
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
                    name="TenTU"
                    label="Tên thức uống"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt tên cho thức uống',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="DvtTU"
                    label="Đơn vị tính"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="GiaTU"
                    label="Gia"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="khonvl"
                    label="Kho Nguyên Vật Liệu"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập kho nguyên vật liệu!',
                        },
                    ]}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {khonvl}
                    </Select>
                </Form.Item>
                
            </Form>
        </Modal>
    );
};

const FormModalInThucUong = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);


    const onCreate = async (values) => {
        const ch = values.khonvl.map((value) => Number(value))
        let formData = new FormData();
        formData.append('MaTU', values.MaTU);
        formData.append('TenTU', values.TenTU);
        formData.append('DvtTU', values.DvtTU);
        formData.append('GiaTU', values.GiaTU);
        formData.append('MaNVL', values.khonvl);
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
        await axios({
            url: 'http://127.0.0.1:8000/manage/ThucUong-create',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;'
            },
            data: formData,
        })
        handleFinish()
        setVisible(false);
    };



    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                style={{ borderRadius: 5 }}
            >
                + Thức Uống Mới
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default FormModalInThucUong;