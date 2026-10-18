import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

function PageLogin() {
    const [loading, setLoading] = useState(false);

    const onFinish = async values => {
        setLoading(true);
        const { username, password } = values;

        try {
            // Giả lập xử lý đăng nhập
            if (username === 'admin' && password === '123456') {
                message.success('Đăng nhập thành công!');
            } else {
                message.error('Sai tên đăng nhập hoặc mật khẩu!');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '50px auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
            }}
        >
            <Title level={3} style={{ textAlign: 'center' }}>
                Đăng Nhập
            </Title>
            <Form name="login" layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PageLogin;
