import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber } from 'antd';
import HTTP from '../services/axiosConfig'
import ImportImage from '../components/ImportImage'

import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel, onCreateFile }) => {
    const [form] = Form.useForm();
    const [file, setFile] = React.useState(null);
    const [bookCategory, setBookCategory] = React.useState([]);
    const [bookLocation, setBookLocation] = React.useState([]);
    const [change, setChange] = React.useState([]);

    function handleChange(value) {
        //console.log(`selected ${value}`);
        setChange(value);
        console.log(change);
    }

    const location = [];
    bookLocation.map((value) => {
        location.push(<Option key={value.id}>{value.name}</Option>);
        return value;
    })

    const category = [];
    bookCategory.map((value) => {
        category.push(<Option key={value.id}>{value.name}</Option>);
        return value;
    })

    const handleFile = (fileValue) => {
        onCreateFile(fileValue);
        setFile(fileValue)
    }

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/book-category').then((res) => {
            if (isMounted) {
                setBookCategory(res.data)
            }
        })
        return () => { isMounted = false }
    }, [])

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/book-location').then((res) => {
            if (isMounted) {
                setBookLocation(res.data)
            }
        })
        return () => { isMounted = false }
    }, [])

    return (
        <Modal
            visible={visible}
            title="Create a new Book"
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
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of book!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="author"
                    label="Author"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the author of book!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the category of book!',
                        },
                    ]}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {category}
                    </Select>
                </Form.Item>
                <Form.Item name="location"
                    label="Location"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the location of book!',
                        },
                    ]}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {location}
                    </Select>
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="image" label="Image" required
                    rules={[
                        {
                            validator: (_, value) =>
                                file ? Promise.resolve() : Promise.reject(new Error('Please input image of book')),
                        },
                    ]}>
                    <ImportImage onSelectImage={handleFile} />
                </Form.Item>
                <Form.Item
                    name='quantity'
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="slug"
                    label="Slug"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the slug of category!',
                        },
                        {
                            validator: (_, value) =>
                                //value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                new Promise(function (resolve, reject) {
                                    HTTP.get('manage/books')
                                        .then(function (json) {

                                            var hasMatch = false;

                                            for (var index = 0; index < json.data.length; ++index) {

                                                var res = json.data[index];

                                                if (res.slug === value) {
                                                    hasMatch = true;
                                                    break;
                                                }
                                            }

                                            if (hasMatch) {
                                                reject(new Error('A book with that slug already exists!'))
                                            }

                                            resolve();
                                        });
                                }),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const FormModalInAllBook = ({ handleFinish }) => {
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);

    const onCreateFile = (f) => {
        setFile(f)
    }

    const onCreate = async (values) => {
        const cate = values.category.map((value) => Number(value))
        const locate = values.location.map((value) => Number(value))

        let formData = new FormData();

        formData.append('name', values.name);
        formData.append('author', values.author);
        formData.append('description', values.description);
        formData.append('slug', values.slug);
        cate.forEach((item) => formData.append("category", item))
        locate.forEach((item) => formData.append("location", item))
        formData.append('quantity', values.quantity);
        formData.append('image', file);


        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }

        await axios({
            url: 'http://127.0.0.1:8000/manage/books-create',
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
                + New Book
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCreateFile={onCreateFile}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default FormModalInAllBook;