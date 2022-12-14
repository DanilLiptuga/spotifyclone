import React, {FC} from 'react';
import {Button, Upload, message} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import type { UploadProps } from 'antd';
const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const UploadButton : FC = () : JSX.Element => {
    return (
        <div>
            <Upload {...props}>
                <Button><UploadOutlined/> Upload song</Button>
            </Upload>
        </div>
    );
};

export default UploadButton;