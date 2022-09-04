
import React, { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';
import HTTP from '../services/axiosConfig'
import { Select } from 'antd';
import axios from 'axios';
import KhoSP from '../pages/Manage/KhoSP/KhoSP';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [KhoSP, setKhoSP] = React.useState([]);
    const [change, setChange] = React.useState([]);

    function handleChange(value) {
        //console.log(`selected ${value}`);
        setChange(value);
        console.log(change);
    }

    const khosp = [];
    KhoSP.map((value) => {
        khosp.push(<Option key={value.MaCH}>{value.TenCH}</Option>);
        return value;
        
    })

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/KhoSP-list').then((res) => {
            if (isMounted) {
                setKhoSP(res.data)
            }
        })
        return () => { isMounted = false }
    }, [])

    return (
        <Modal
            visible={visible}
            title="Tạo sản phẩm mới"
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
                    name="MaSP"
                    label="Mã Sản Phẩm"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt mã sản phẩm!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/SanPham-list')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.MaSP === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('Mã sản phẩm đã tồn tại!'))
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
                    name="TenSP"
                    label="Tên Sản Phẩm"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt tên cho sản phẩm',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="DvtSP"
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
                    name="GiaSP"
                    label="Giá"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="khosp"
                    label="Kho Sản Phẩm"
                    rules={[
                        {
                            required: true,
                            message: 'Đặt tên cho kho sản phẩm!',
                        },
                    ]}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {khosp}
                    </Select>
                </Form.Item>
                
            </Form>
        </Modal>
    );
};

const FormModalInSanPham = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);


    const onCreate = async (values) => {
        const ch = values.khosp.map((value) => Number(value))
        let formData = new FormData();
        formData.append('MaSP', values.MaSP);
        formData.append('TenSP', values.TenSP);
        formData.append('DvtSP', values.DvtSP);
        formData.append('GiaSP', values.GiaSP);
        formData.append('MaKSP', values.khosp);
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
        await axios({
            url: 'http://127.0.0.1:8000/manage/SanPham-create',
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
                + Sản Phẩm Mới
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

export default FormModalInSanPham;