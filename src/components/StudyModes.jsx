import React from 'react';

import vi from '../locales/vi';
import { LuBookOpen, LuFileQuestion, LuMessagesSquare, LuPencil } from 'react-icons/lu';

const modes = [
    {
        key: 'grammar',
        title: vi.studyModes.grammar.title,
        description: vi.studyModes.grammar.description,
        icon: <LuBookOpen size={24} />,
        color: '#3977f6',
        bg: '#eff5ff',
        prompt: vi.studyModes.grammar.prompt,
    },
    {
        key: 'jlpt',
        title: vi.studyModes.jlpt.title,
        description: vi.studyModes.jlpt.description,
        icon: <LuFileQuestion size={24} />,
        color: '#a276f5',
        bg: '#f6f0ff',
        prompt: vi.studyModes.jlpt.prompt,
    },
    {
        key: 'correct',
        title: vi.studyModes.correct.title,
        description: vi.studyModes.correct.description,
        icon: <LuPencil size={24} />,
        color: '#3985f6',
        bg: '#eff6ff',
        prompt: vi.studyModes.correct.prompt,
    },
    {
        key: 'kaiwa',
        title: vi.studyModes.kaiwa.title,
        description: vi.studyModes.kaiwa.description,
        icon: <LuMessagesSquare size={24} />,
        color: '#3f7af5',
        bg: '#eff5ff',
        prompt: vi.studyModes.kaiwa.prompt,
    },
];

const StudyModes = ({ activeMode, handleSelectMode }) => {
    return (
        <div className="shrink-0 rounded-2xl border border-[#e6edf8] bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-[16px] font-bold text-[#152b4f]">
                {vi.studyModes.title}
                <span className="ml-2 text-[12px] font-normal text-slate-400">
                    {vi.studyModes.subtitle}
                </span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {modes.map(mode => (
                    <button
                        key={mode.key}
                        onClick={() => handleSelectMode(mode)}
                        className={`min-h-[145px] rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                            activeMode === mode.key
                                ? 'border-[#3977f6] bg-[#f5f8ff] shadow-sm'
                                : 'border-[#e8edf5] bg-white'
                        }`}
                    >
                        <div
                            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                            style={{
                                color: mode.color,
                                backgroundColor: mode.bg,
                            }}
                        >
                            {mode.icon}
                        </div>

                        <h4 className="text-[13px] font-bold text-[#1a2d4e]">{mode.title}</h4>

                        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-slate-500">
                            {mode.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudyModes;
