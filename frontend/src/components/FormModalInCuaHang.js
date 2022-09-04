import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';
import HTTP from '../services/axiosConfig'
import { Select } from 'antd';
import axios from 'axios';
import KhuVuc from '../pages/Manage/KhuVuc/KhuVuc';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [KhuVuc, setKhuVuc] = React.useState([]);
    const [change, setChange] = React.useState([]);

    function handleChange(value) {
        //console.log(`selected ${value}`);
        setChange(value);
        console.log(change);
    }

    const khuvuc = [];
    KhuVuc.map((value) => {
        khuvuc.push(<Option key={value.MaKV}>{value.TenKV}</Option>);
        return value;
        
    })

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/khuvuc-list').then((res) => {
            if (isMounted) {
                setKhuVuc(res.data)
            }
        })
        return () => { isMounted = false }
    }, [])

    return (
        <Modal
            visible={visible}
            title="Tạo cửa hàng mới"
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
                    name="MaCH"
                    label="Mã Cửa Hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt mã cửa hàng!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/CuaHang-list')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.MaCH === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('Mã cửa hàng đã tồn tại!'))
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
                    name="TenCH"
                    label="Tên Cửa Hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt tên cho cửa hàng',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="DiaChiCH"
                    label="Địa Chỉ Cửa Hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt địa chỉ cho cửa hàng',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="khuvuc"
                    label="Khu Vực"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt tên cho khu vực!',
                        },
                    ]}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {khuvuc}
                    </Select>
                </Form.Item>
                
            </Form>
        </Modal>
    );
};

const FormModalInCuaHang = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);


    const onCreate = async (values) => {
        const kv = values.khuvuc.map((value) => Number(value))
        let formData = new FormData();
        formData.append('MaCH', values.MaCH);
        formData.append('TenCH', values.TenCH);
        formData.append('DiaChiCH', values.DiaChiCH);
        formData.append('MaKV', values.khuvuc);
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
        await axios({
            url: 'http://127.0.0.1:8000/manage/CuaHang-create',
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
                + Cửa Hàng Mới
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

export default FormModalInCuaHang;