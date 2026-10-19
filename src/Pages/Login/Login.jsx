import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import vi from '../../locales/vi';
import { loginUser } from '../../services/authService';
import loginBg from '../../assets/login.png';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async values => {
        try {
            setLoading(true);
            await loginUser(values.email, values.password);
            message.success(vi.login.loginSuccess);
            navigate('/home', { replace: true });
        } catch (error) {
            message.error(error.message || vi.login.loginFailed);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white lg:h-screen lg:overflow-hidden">
            <div className="flex min-h-screen lg:h-full">
                {/* LEFT: JAPANESE ILLUSTRATION */}
                <section className="relative hidden w-1/2 overflow-hidden bg-blue-50 lg:block">
                    <img
                        src={loginBg}
                        alt="Nihongo-hub Japanese learning"
                        className="h-full w-full object-fill"
                    />
                </section>

                {/* RIGHT: LOGIN FORM */}
                <section className="flex w-full flex-col bg-white px-6 py-8 sm:px-12 lg:w-1/2 lg:px-16 xl:px-24">
                    {/* MOBILE BRAND */}
                    <div className="mt-6 text-center lg:hidden">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Nihongo
                            <span className="text-blue-500">-hub</span>
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">{vi.common.tagline}</p>
                    </div>

                    {/* FORM CONTAINER */}
                    <div className="mx-auto flex w-full max-w-[500px] flex-1 flex-col justify-center py-12">
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold tracking-tight text-[#10254B]">
                                {vi.login.title}
                            </h2>
                            <p className="mt-4 max-w-sm text-base leading-7 text-slate-500">
                                {vi.login.subtitle}
                            </p>
                        </div>

                        <Form
                            layout="vertical"
                            size="large"
                            onFinish={handleLogin}
                            initialValues={{ remember: true }}
                            requiredMark={false}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: vi.login.emailRequired,
                                    },
                                    {
                                        type: 'email',
                                        message: vi.login.emailInvalid,
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined className="mr-2 text-slate-400" />}
                                    placeholder={vi.common.email}
                                    autoComplete="email"
                                    className="!h-14"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: vi.login.passwordRequired,
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="mr-2 text-slate-400" />}
                                    placeholder={vi.common.password}
                                    autoComplete="current-password"
                                    className="!h-14"
                                />
                            </Form.Item>

                            <div className="mb-7 flex items-center justify-between gap-3">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>{vi.common.rememberMe}</Checkbox>
                                </Form.Item>

                                <NavLink to="/" className="text-sm font-medium text-blue-600">
                                    {vi.common.forgotPassword}
                                </NavLink>
                            </div>

                            <Form.Item className="!mb-0">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    className="!h-14 !text-base !font-semibold"
                                >
                                    {vi.common.login}
                                    <ArrowRightOutlined />
                                </Button>
                            </Form.Item>
                        </Form>

                        {/* DIVIDER */}
                        <div className="my-9 h-px w-full bg-slate-200" />

                        {/* REGISTER BOTTOM */}
                        <div className="mt-14 text-center text-sm text-slate-500">
                            {vi.common.registerPrompt}{' '}
                            <NavLink to="/register" className="font-semibold text-blue-600">
                                {vi.common.registerNow}
                            </NavLink>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
