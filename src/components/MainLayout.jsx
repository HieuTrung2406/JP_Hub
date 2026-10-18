import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';

import SidebarContent from './Sidebar';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const { Content } = Layout;

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <Layout className="!min-h-screen !bg-[#f7f9fe]">
            {/* Desktop sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <Content className="min-w-0">
                <div className="mx-auto max-w-[1500px] px-4 pb-12 pt-5 sm:px-7 lg:px-10">
                    {/* Top bar */}
                    <TopBar setMobileMenu={setMobileMenu} />

                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
}
