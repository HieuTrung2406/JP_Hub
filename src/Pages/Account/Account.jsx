import React, { useEffect, useState } from 'react';
import { Avatar, Card, Descriptions, Spin, message } from 'antd';
import { LuUserRound } from 'react-icons/lu';

import { getUser } from '../../services/authService';
import vi from '../../locales/vi';

const Account = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        const fetchUser = async () => {
            try {
                const user = await getUser();

                if (active) {
                    setUser(user);
                }
            } catch (error) {
                if (active) {
                    message.error(vi.account.loadUserFailed);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        return () => {
            active = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return <div className="py-12 text-center text-slate-500">{vi.account.userNotFound}</div>;
    }

    const displayName =
        user.user_metadata?.full_name || user.user_metadata?.name || vi.account.defaultName;

    const providers = user.app_metadata?.providers?.join(', ') || vi.account.emptyValue;

    const providerType = user.app_metadata?.provider || vi.account.emptyValue;

    return (
        <>
            <div className="mb-6">
                <h1 className="mb-1 text-2xl font-bold text-[#172b50]">{vi.account.title}</h1>

                <p className="text-sm text-slate-500">{vi.account.description}</p>
            </div>

            <Card className="!rounded-2xl !border-slate-100 !shadow-sm">
                <div className="mb-7 flex items-center gap-4">
                    <Avatar
                        size={64}
                        icon={<LuUserRound />}
                        className="!flex !items-center !justify-center !bg-[#eaf1ff] !text-[#3976f6]"
                    />

                    <div className="min-w-0">
                        <h2 className="mb-1 truncate text-lg font-bold text-[#172b50]">
                            {displayName}
                        </h2>

                        <p className="mb-0 truncate text-sm text-slate-400">
                            {user.email || vi.account.emptyValue}
                        </p>
                    </div>
                </div>

                <Descriptions
                    bordered
                    column={{ xs: 1, sm: 1, md: 2 }}
                    size="middle"
                    labelStyle={{
                        fontWeight: 600,
                        color: '#475569',
                        backgroundColor: '#f8faff',
                    }}
                    contentStyle={{
                        color: '#172b50',
                    }}
                >
                    <Descriptions.Item label={vi.account.displayName}>
                        {displayName}
                    </Descriptions.Item>

                    <Descriptions.Item label={vi.account.email}>
                        {user.email || vi.account.emptyValue}
                    </Descriptions.Item>

                    <Descriptions.Item label={vi.account.phone}>
                        {user.phone || vi.account.emptyValue}
                    </Descriptions.Item>

                    <Descriptions.Item label={vi.account.providers}>{providers}</Descriptions.Item>

                    <Descriptions.Item label={vi.account.providerType}>
                        {providerType}
                    </Descriptions.Item>

                    <Descriptions.Item label={vi.account.createdAt}>
                        {user.created_at
                            ? new Date(user.created_at).toLocaleString('vi-VN')
                            : vi.account.emptyValue}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export default Account;
