import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';
import HTTP from '../services/axiosConfig'
import { Select } from 'antd';
import axios from 'axios';
import CuaHang from '../pages/Manage/CuaHang/CuaHang';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [CuaHang, setCuaHang] = React.useState([]);
    const [change, setChange] = React.useState([]);

    function handleChange(value) {
        //console.log(`selected ${value}`);
        setChange(value);
        console.log(change);
    }

    const cuahang = [];
    CuaHang.map((value) => {
        cuahang.push(<Option key={value.MaCH}>{value.TenCH}</Option>);
        return value;
        
    })

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/CuaHang-list').then((res) => {
            if (isMounted) {
                setCuaHang(res.data)
            }
        })
        return () => { isMounted = false }
    }, [])

    return (
        <Modal
            visible={visible}
            title="Tạo nguyên vật liệu mới"
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
                    name="MaNVL"
                    label="Mã Nguyên Vật Liệu"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt mã nguyên vật liệu!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/KhoNVL-list')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.MaNVL === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('Mã nguyên vật liệu đã tồn tại!'))
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
                    name="TenNVL"
                    label="Tên Nguyên Vật Liệu"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt tên cho nguyên vật liệu',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="DvtNVL"
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
                    name="SoluongNVL"
                    label="Số lượng"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="cuahang"
                    label="Cửa Hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt tên cho cửa hàng!',
                        },
                    ]}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {cuahang}
                    </Select>
                </Form.Item>
                
            </Form>
        </Modal>
    );
};

const FormModalInKhoNVL = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);


    const onCreate = async (values) => {
        const ch = values.cuahang.map((value) => Number(value))
        let formData = new FormData();
        formData.append('MaNVL', values.MaNVL);
        formData.append('TenNVL', values.TenNVL);
        formData.append('DvtNVL', values.DvtNVL);
        formData.append('SoluongNVL', values.SoluongNVL);
        formData.append('MaKV', values.cuahang);
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
        await axios({
            url: 'http://127.0.0.1:8000/manage/KhoNVL-create',
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
                + Nguyên Vật Liệu Mới
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

export default FormModalInKhoNVL;