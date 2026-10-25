import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import vi from '../../locales/vi';
import { registerUser } from '../../services/authService';
import registerBg from '../../assets/register.png';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async values => {
        setLoading(true);
        try {
            const data = await registerUser(values.fullName, values.email, values.password);

            if (data.session) {
                message.success(vi.register.registerSuccess);
            } else {
                message.success(vi.register.emailConfirmation);
            }
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Register failed:', error.message);
            message.error(error.message || vi.register.registerFailed);
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
                        src={registerBg}
                        alt="Nihongo-hub Japanese learning"
                        className="h-full w-full object-fill"
                    />
                </section>

                {/* RIGHT: REGISTER FORM */}
                <section className="flex w-full flex-col bg-white px-6 py-8 sm:px-12 lg:w-1/2 lg:px-16 xl:px-24 lg:overflow-y-auto">
                    {/* LOGIN TOP */}
                    <div className="text-right text-sm text-slate-500">
                        {vi.register.alreadyHaveAccount}{' '}
                        <NavLink to="/" className="font-semibold text-blue-600 hover:text-blue-700">
                            {vi.register.loginNow}
                        </NavLink>
                    </div>

                    {/* MOBILE BRAND */}
                    <div className="mt-10 text-center lg:hidden">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Nihongo
                            <span className="text-blue-500">-hub</span>
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">{vi.common.tagline}</p>
                    </div>

                    {/* FORM CONTAINER */}
                    <div className="mx-auto flex w-full max-w-[500px] flex-1 flex-col justify-center py-10">
                        {/* TITLE */}
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold tracking-tight text-[#10254B]">
                                {vi.register.title}
                            </h2>

                            <p className="mt-4 max-w-sm text-base leading-7 text-slate-500">
                                {vi.register.subtitle}
                            </p>
                        </div>

                        <Form
                            layout="vertical"
                            size="large"
                            onFinish={handleRegister}
                            requiredMark={false}
                        >
                            {/* FULL NAME */}
                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: vi.register.fullNameRequired,
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="mr-2 text-slate-400" />}
                                    placeholder={vi.register.fullName}
                                    autoComplete="name"
                                    className="!h-14"
                                />
                            </Form.Item>

                            {/* EMAIL */}
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: vi.register.emailRequired,
                                    },
                                    {
                                        type: 'email',
                                        message: vi.register.emailInvalid,
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined className="mr-2 text-slate-400" />}
                                    placeholder={vi.register.email}
                                    autoComplete="email"
                                    className="!h-14"
                                />
                            </Form.Item>

                            {/* PASSWORD */}
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: vi.register.passwordRequired,
                                    },
                                    {
                                        min: 8,
                                        message: vi.register.passwordMinLength,
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="mr-2 text-slate-400" />}
                                    placeholder={vi.register.password}
                                    autoComplete="new-password"
                                    className="!h-14"
                                />
                            </Form.Item>

                            {/* CONFIRM PASSWORD */}
                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: vi.register.confirmPasswordRequired,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error(vi.register.passwordMismatch)
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="mr-2 text-slate-400" />}
                                    placeholder={vi.register.confirmPassword}
                                    autoComplete="new-password"
                                    className="!h-14"
                                />
                            </Form.Item>

                            {/* SUBMIT BUTTON */}
                            <Form.Item className="!mb-0">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    className="!h-14 !text-base !font-semibold"
                                >
                                    {vi.register.submit}
                                    <ArrowRightOutlined />
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        </div>
    );
}
