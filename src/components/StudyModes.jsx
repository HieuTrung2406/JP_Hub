import React from 'react';

const StudyModes = ({ modes, activeMode, handleSelectMode }) => {
    return (
        <div className="shrink-0 rounded-2xl border border-[#e6edf8] bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-[16px] font-bold text-[#152b4f]">
                Chế độ học
                <span className="ml-2 text-[12px] font-normal text-slate-400">(Gợi ý nhanh)</span>
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
