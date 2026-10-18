import React from 'react';
import { Layout } from 'antd';
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';
import SidebarContent from './SidebarContent';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed, mobileMenu, setMobileMenu }) => {
    return (
        <>
            {/* Desktop sidebar */}
            <Sider
                width={248}
                collapsedWidth={76}
                collapsed={collapsed}
                trigger={null}
                className="!hidden !bg-white !shadow-[4px_0_28px_rgba(25,52,100,0.035)] lg:!block"
            >
                <div className="sticky top-0 h-screen">
                    <SidebarContent collapsed={collapsed} setMobileMenu={setMobileMenu} />

                    <button
                        onClick={() => setCollapsed(v => !v)}
                        className="absolute -right-3 top-8 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow"
                    >
                        {collapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
                    </button>
                </div>
            </Sider>

            {/* Mobile sidebar */}
            {mobileMenu && (
                <div
                    className="fixed inset-0 z-50 bg-slate-900/30 lg:hidden"
                    onClick={() => setMobileMenu(false)}
                >
                    <div className="h-full w-[250px] bg-white" onClick={e => e.stopPropagation()}>
                        <SidebarContent collapsed={collapsed} setMobileMenu={setMobileMenu} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
