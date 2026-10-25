import React from 'react';
import {
    LuGraduationCap,
    LuNotebookTabs,
    LuLibrary,
    LuFlower2,
    LuLayers,
    LuSparkles,
    LuUserRound,
    LuLock,
} from 'react-icons/lu';
import { Avatar } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import vi from '../locales/vi';

const NAV_ITEMS = [
    {
        key: 'flashcard',
        label: vi.sidebar.nav.flashcard,
        icon: LuLayers,
        path: '/home',
    },
    {
        key: 'sensei',
        label: vi.sidebar.nav.sensei,
        icon: LuSparkles,
        path: '/sensei',
    },
    {
        key: 'vocabulary',
        label: vi.sidebar.nav.vocabulary,
        icon: LuLibrary,
        path: null,
    },
    {
        key: 'grammar',
        label: vi.sidebar.nav.grammar,
        icon: LuNotebookTabs,
        path: null,
    },
    {
        key: 'exam',
        label: vi.sidebar.nav.exam,
        icon: LuGraduationCap,
        path: null,
    },
];

const SidebarContent = ({ collapsed, setMobileMenu }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Điều hướng đến trang được chọn
    const handleNavigate = item => {
        if (!item.path) return;

        setMobileMenu(false);
        navigate(item.path);
    };

    // Kiểm tra menu active theo URL
    const isActive = item => {
        if (!item.path) return false;

        return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
    };

    return (
        <div className="flex h-full flex-col">
            {/* LOGO */}
            <div className="flex items-center gap-3 px-5 py-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                    <LuFlower2 size={26} />
                </div>

                {!collapsed && (
                    <div className="min-w-0">
                        <div className="truncate text-lg font-extrabold tracking-tight text-[#172b50]">
                            {vi.sidebar.appName}
                        </div>

                        <div className="text-[11px] text-slate-400">{vi.sidebar.tagline}</div>
                    </div>
                )}
            </div>

            {/* NAVIGATION */}
            <div className="px-3">
                {!collapsed && (
                    <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">
                        {vi.sidebar.sectionTitle}
                    </div>
                )}

                <div className="space-y-1">
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon;
                        const active = isActive(item);
                        const disabled = !item.path;

                        return (
                            <button
                                key={item.key}
                                type="button"
                                disabled={disabled}
                                onClick={() => handleNavigate(item)}
                                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition-all ${
                                    disabled
                                        ? 'cursor-not-allowed text-slate-400 opacity-80'
                                        : active
                                        ? 'cursor-pointer bg-[#eaf1ff] font-semibold text-[#2466e8]'
                                        : 'cursor-pointer text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                            >
                                <Icon size={19} className="shrink-0" />

                                {!collapsed && (
                                    <>
                                        <span className="text-sm">{item.label}</span>

                                        {disabled && (
                                            <LuLock size={13} className="ml-auto text-slate-300" />
                                        )}
                                    </>
                                )}

                                {active && !collapsed && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="mt-auto p-4">
                {!collapsed && (
                    <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#edf3ff] to-[#fceef6] p-4">
                        <LuSparkles className="mb-2 text-[#3976f6]" size={22} />

                        <div className="text-sm font-bold text-[#172b50]">
                            {vi.sidebar.dailyWordTitle}
                        </div>

                        <p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">
                            {vi.sidebar.dailyWordDescription}
                        </p>
                    </div>
                )}

                {/* USER PROFILE */}
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <Avatar
                        size={36}
                        icon={<LuUserRound size={19} />}
                        className="!flex !items-center !justify-center !bg-[#e7edff] !text-[#3769d7]"
                    />

                    {!collapsed && (
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-700">
                                {vi.sidebar.userAccount}
                            </div>

                            <div className="text-xs text-slate-400">{vi.sidebar.userStatus}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidebarContent;
