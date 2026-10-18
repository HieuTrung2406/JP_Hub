import React from 'react';
import {
    LuHouse,
    LuBookOpen,
    LuGraduationCap,
    LuNotebookTabs,
    LuLibrary,
    LuInfo,
    LuChevronLeft,
    LuChevronRight,
    LuCheck,
    LuX,
    LuRotateCcw,
    LuShuffle,
    LuVolume2,
    LuLightbulb,
    LuFlower2,
    LuLayers,
    LuListChecks,
    LuArrowUpRight,
    LuPanelLeftClose,
    LuPanelLeftOpen,
    LuKeyboard,
    LuSparkles,
    LuCircleHelp,
    LuTrash2,
    LuMenu,
} from 'react-icons/lu';
import { Avatar, message } from 'antd';

const NAV_ITEMS = [
    { key: 'home', label: 'Tổng quan', icon: LuHouse },
    { key: 'flashcard', label: 'Flashcard', icon: LuLayers },
    { key: 'vocabulary', label: 'Từ vựng', icon: LuLibrary },
    { key: 'grammar', label: 'Ngữ pháp', icon: LuNotebookTabs },
    { key: 'exam', label: 'Luyện đề JLPT', icon: LuGraduationCap },
];

const SidebarContent = ({ collapsed, setMobileMenu }) => {
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 px-5 py-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                    <LuFlower2 size={26} />
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <div className="truncate text-lg font-extrabold tracking-tight text-[#172b50]">
                            Nihongo<span className="text-[#3778f6]">Hub</span>
                        </div>
                        <div className="text-[11px] text-slate-400">日本語を楽しく学ぼう</div>
                    </div>
                )}
            </div>

            <div className="px-3">
                {!collapsed && (
                    <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">
                        Học tập
                    </div>
                )}
                <div className="space-y-1">
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon;
                        const active = item.key === 'flashcard';
                        return (
                            <button
                                key={item.key}
                                onClick={() => {
                                    setMobileMenu(false);
                                    if (!active) message.info('Tính năng sẽ phát triển sau.');
                                }}
                                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition-all ${
                                    active
                                        ? 'bg-[#eaf1ff] font-semibold text-[#2466e8]'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                            >
                                <Icon size={19} className="shrink-0" />
                                {!collapsed && <span className="text-sm">{item.label}</span>}
                                {active && !collapsed && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto p-4">
                {!collapsed && (
                    <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#edf3ff] to-[#fceef6] p-4">
                        <LuSparkles className="mb-2 text-[#3976f6]" size={22} />
                        <div className="text-sm font-bold text-[#172b50]">Một từ mỗi ngày</div>
                        <p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">
                            Học đều đặn sẽ giúp bạn ghi nhớ tốt hơn!
                        </p>
                    </div>
                )}
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <Avatar className="!bg-[#e7edff] !text-[#3769d7]">H</Avatar>
                    {!collapsed && (
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-700">
                                Tài khoản học viên
                            </div>
                            <div className="text-xs text-slate-400">Đang học JLPT</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidebarContent;
