import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import HTTP from '../services/axiosConfig'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Tạo Chương trình khuyến mãi mới"
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
                    name="MaCT"
                    label="Mã chương trình"
                    rules={[
                        {
                            required: true,
                            message: 'Xin hãy nhập mã chương trình!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/CTKM-list')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.MaCT === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('Mã chương trình đó đã tồn tạiiiii!'))
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
                    name="TenCT"
                    label="Tên chương trình"
                    rules={[
                        {
                            required: true,
                            message: '!!!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="NgayBatDau"
                    label="Ngày Bắt Đầu"
                    rules={[
                        {
                            required: true,
                            message: 'Mặc định là 0 nếu không có thông tin cần điền',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="NgayKetThuc"
                    label="Ngày Kết Thúc"
                    rules={[
                        {
                            required: true,
                            message: 'Mặc định là 0 nếu không có thông tin cần điền',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="HinhThucKM"
                    label="Hình Thức Khuyến Mãi"
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
                    name="DKADung"
                    label="Điều Kiện Áp Dụng"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const FormModalInCTKM = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);
    const onCreate = async (values) => {
        await HTTP.post('manage/CTKM-create', {
            MaCT: values.MaCT,
            TenCT: values.TenCT,
            NgayBatDau: values.NgayBatDau,
            NgayKetThuc: values.NgayKetThuc,
            HinhThucKM: values.HinhThucKM,
            DKADung: values.DKADung,
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
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
                + Chương Trình Mới
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

export default FormModalInCTKM;