import { Upload, Button, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default function ImportImage({ onSelectImage }) {

    const handleChange = info => {
        onSelectImage(info.file.originFileObj);
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={1}
                onChange={handleChange}
                beforeUpload={beforeUpload}
            >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
        </Space>
    )
}