import React from 'react';
import { LuBookOpen, LuCheck, LuRotateCcw } from 'react-icons/lu';

const Stats = ({ vocabulary, knownCount, unknownWords }) => {
    const stats = [
        {
            label: 'Tổng từ vựng',
            value: vocabulary.length,
            icon: LuBookOpen,
            bg: 'bg-blue-50',
            color: 'text-blue-600',
        },
        {
            label: 'Đã thuộc',
            value: knownCount,
            icon: LuCheck,
            bg: 'bg-emerald-50',
            color: 'text-emerald-600',
        },
        {
            label: 'Cần ôn lại',
            value: unknownWords.length,
            icon: LuRotateCcw,
            bg: 'bg-rose-50',
            color: 'text-rose-500',
        },
    ];

    return (
        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.map(stat => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(20,40,80,.025)]"
                    >
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                        >
                            <Icon size={21} />
                        </div>

                        <div>
                            <div className="text-xl font-extrabold text-[#172b50]">
                                {stat.value}
                            </div>
                            <div className="text-xs text-slate-400">{stat.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Stats;
