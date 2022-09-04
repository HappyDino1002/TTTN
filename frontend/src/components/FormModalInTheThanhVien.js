
import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import HTTP from '../services/axiosConfig'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Tạo Thẻ Thành Viên Mới"
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
                    name="MaThe"
                    label="Mã Thẻ"
                    rules={[
                        {
                            required: true,
                            message: 'Xin hãy nhập mã thẻ cho thẻ thành viên nào!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/TheThanhVien-list')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.MaThe === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('Mã Thẻ đó đã tồn tạiiiii!'))
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
                    name="HangThe"
                    label="Hạng Thẻ"
                    rules={[
                        {
                            required: true,
                            message: 'Chỉ có hạng Xanh và Vàng!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="DiemThuong"
                    label="Điểm Thưởng"
                    rules={[
                        {
                            required: true,
                            message: 'Mặc định là 0 nếu không có thông tin cần điền',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const FormModalInTheThanhVien = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);
    const onCreate = async (values) => {
        await HTTP.post('manage/TheThanhVien-create', {
            MaThe: values.MaThe,
            HangThe: values.HangThe,
            DiemThuong: values.DiemThuong,
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
                + Thẻ Thành Viên Mới
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

export default FormModalInTheThanhVien;