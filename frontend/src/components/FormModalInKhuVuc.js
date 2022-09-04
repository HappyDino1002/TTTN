
import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import HTTP from '../services/axiosConfig'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Tạo Khu Vực Mới"
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
                    name="MaKV"
                    label="Mã Khu Vực"
                    rules={[
                        {
                            required: true,
                            message: 'Xin hãy mã Khu Vực cho khu vực nào!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/khuvuc-list')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.MaKV === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('Mã Khu Vực đó đã tồn tạiiiii!'))
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
                    name="TenKV"
                    label="Tên Khu Vực"
                    rules={[
                        {
                            required: true,
                            message: 'Xin hãy đặt tên cho khu vực nào!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const FormModalInKhuVuc = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);
    const onCreate = async (values) => {
        await HTTP.post('manage/khuvuc-create', {
            MaKV: values.MaKV,
            TenKV: values.TenKV,
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
                + Khu Vực Mới
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

export default FormModalInKhuVuc;